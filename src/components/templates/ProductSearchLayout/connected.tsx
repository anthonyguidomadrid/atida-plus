import {
  connectInfiniteHits,
  connectStats,
  connectStateResults
} from 'react-instantsearch-dom'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import type {
  InfiniteHitsProvided,
  StateResultsProvided
} from 'react-instantsearch-core'
import classNames from 'classnames'

import { SearchCount } from '~components/atoms/SearchCount'
import {
  normalizeAlgoliaProduct,
  AlgoliaProduct,
  Product,
  ProductFilter,
  ChannelPrice
} from '~domains/product'
import {
  triggerReportProductListFiltered,
  triggerReportProductListViewed
} from '~domains/analytics'
import {
  addToBasketTrigger,
  changeItemQuantityTrigger,
  removeFromBasketTrigger,
  selectItems,
  triggerBasketModal,
  selectWasSuccess,
  selectBasketModalProduct,
  handleProductQuantityAction,
  selectItemWasError,
  selectQuantityAction,
  selectQuantityError,
  selectItemIsLoading,
  selectNumberOfItems,
  selectItemWasSuccess
} from '~domains/basket'
import { selectContent } from '~domains/page'
import { SearchWithNoResults } from '~components/molecules/SearchWithNoResults'
import {
  cookieStorageMechanism,
  defaultStorageMechanism,
  splitArrayInChunks,
  useDetectOutsideClick
} from '~helpers'
import { ProductTileLoading } from '~components/molecules/ProductTile/ProductTileLoading'
import { ProductCardLoading } from '~components/molecules/ProductCard/ProductCardLoading'
import { ProductGrid } from '~components/organisms/ProductGrid'
import { selectProductView } from '~domains/product/selectors/view-toggle'

import { listOfProductsAndContentBlocks } from './productsAndContentBlocks'
import { ProductViews } from '~domains/product/slices/view-toggle'
import { InfinitePagination } from '~components/molecules/InfinitePagination'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash/debounce'
import { RootState } from '~domains/redux'
import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { searchStateToQuery } from '~helpers/queryToSearchState'
import { SearchState } from '~types/Search'
import {
  DEFAULT_PAGE,
  DEFAULT_PRODUCTS_PER_PAGE
} from '~config/constants/products-per-page'
import { RemoveBasketItem, SessionChannelType } from '~domains/basket/types'
import { validateMaxQuantity } from '~helpers/validateMaxQuantity'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { Button } from '~components/atoms/Button'
import { ReactComponent as ChevronUpWide } from '~assets/svg/navigation-16px/ChevronUpWide.svg'
import { BasketNotification } from '~components/organisms/BasketNotification'
import { timeout } from '~helpers/timeout'
import { BasketModalProps } from '~components/organisms/BasketModal'
import { ProductListProps } from '~components/organisms/ProductList'
import { SEGMENT_PRODUCT_ARRAY_CHUNK_LENGTH } from '~config/constants/events'
import { useHandleAddToFavourites } from '~helpers/useHandleAddToFavourites'
import { useHandleRemoveFromFavourites } from '~helpers/useHandleRemoveFromFavourites'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'

const BasketModal = dynamic<BasketModalProps>(() =>
  import('~components/organisms/BasketModal').then(c => c.BasketModal)
)
const ProductList = dynamic<ProductListProps>(() =>
  import('~components/organisms/ProductList').then(c => c.ProductList)
)

type ProductListConnectedProps = InfiniteHitsProvided & {
  nbHits: number
  isSearchStalled: boolean
  page: number
  locale?: string
  isDesktop?: boolean
  listId?: string
  searchState?: SearchState
  setProducts?: Dispatch<SetStateAction<AlgoliaProduct[]>>
  setNbHits?: Dispatch<SetStateAction<number>>
  renderFilters?: (nbHits: number) => ReactNode
}

type ProductListWithStateConnectedProps = StateResultsProvided<AlgoliaProduct> & {
  locale?: string
  isDesktop?: boolean
  listId?: string
  setProducts?: Dispatch<SetStateAction<AlgoliaProduct[]>>
  setNbHits?: Dispatch<SetStateAction<number>>
  renderFilters?: (nbHits: number) => ReactNode
}

export const ProductListWithStateConnected = connectStateResults(
  ({
    searchResults,
    isSearchStalled,
    isDesktop = false,
    searchState,
    setProducts,
    setNbHits,
    // @ts-ignore - missing algolia type
    props
  }: ProductListWithStateConnectedProps) => {
    useEffect(() => {
      setNbHits?.(searchResults?.nbHits ?? 0)
    }, [searchResults, setNbHits])
    const storageMechanism = defaultStorageMechanism()
    // @ts-ignore - missing algolia type
    storageMechanism?.set('algoliaQueryId', searchResults?.queryID)

    return (
      <ProductListConnected
        setProducts={setProducts}
        searchState={searchState}
        nbHits={searchResults?.nbHits}
        isSearchStalled={isSearchStalled}
        page={searchResults?.page}
        isDesktop={isDesktop}
        {...props}
      />
    )
  }
)

const ProductListConnected = connectInfiniteHits(
  ({
    locale,
    nbHits,
    isSearchStalled,
    page,
    hits = [],
    hasPrevious,
    hasMore,
    refinePrevious,
    refineNext,
    // @ts-ignore - missing algolia type
    refine,
    // @ts-ignore - missing algolia type
    createURL,
    // @ts-ignore - missing algolia type
    indexContextValue,
    isDesktop = false,
    listId = 'search/search_results',
    searchState,
    setProducts,
    setNbHits,
    renderFilters,
    ...props
  }: ProductListConnectedProps) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [localProducts, setLocalProducts] = useState<Partial<Product>[]>([])
    const basketItems = useSelector(selectItems)
    const content = useSelector(selectContent)
    const isSearchPage = (router?.query?.search?.length ?? 0) > 0
    const { t } = useTranslation()
    const basketModalProduct = useSelector(selectBasketModalProduct)
    const basketModalBasketItem = basketItems.find(
      item => item.sku === basketModalProduct?.sku
    )
    const storage = globalThis?.sessionStorage

    const productInBasket: Product | null = {
      ...basketModalProduct,
      basketQuantity: basketModalBasketItem?.quantity ?? 0
    } as Product

    const itemBasketIsLoading = useSelector<
      RootState,
      ReturnType<typeof selectItemIsLoading>
    >(state => selectItemIsLoading(state, { sku: productInBasket?.sku }))

    const modalRef = useRef<HTMLDivElement>(null)
    const [isModalOpen, setIsModalOpen] = useDetectOutsideClick(
      modalRef,
      false,
      itemBasketIsLoading
    )
    const [currentQuantityValue, setCurrentQuantityValue] = useState(0)
    const inputRef = useRef<Record<string, HTMLInputElement>>({})
    const [isTriggered, setIsTriggered] = useState(false)
    const isRemoved = useSelector(selectQuantityAction)
    const wasItemError = useSelector<
      RootState,
      ReturnType<typeof selectItemWasError>
    >(state =>
      selectItemWasError(state, { sku: basketModalProduct?.sku ?? undefined })
    )
    const basketQuantityError = useSelector(selectQuantityError)
    const [availableQuantity, setAvailableQuantity] = useState('')
    const [quantityChangedFrom, setQuantityChangedFrom] = useState('')
    const basketNotificationRef = useRef<HTMLDivElement>(null)
    const basketItemsCount = useSelector(selectNumberOfItems)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)

    const fadeOut = async () => {
      await timeout(200)
      setIsNotificationOpen(false)
    }

    const wasItemSuccess = useSelector<
      RootState,
      ReturnType<typeof selectItemWasSuccess>
    >(state =>
      selectItemWasSuccess(state, { sku: productInBasket.sku ?? undefined })
    )
    const sessionChannelCookie = cookieStorageMechanism().get(
      getSessionChannelName()
    )
    const sessionChannel = useMemo(() => {
      if (!sessionChannelCookie || sessionChannelCookie === '') return undefined
      return JSON.parse(sessionChannelCookie) as SessionChannelType
    }, [sessionChannelCookie])

    const isUpdatePageNumberInUrlOnProductClickEnabled = useFeatureFlag(
      FeatureFlag.NAVIGATION_UPDATE_PAGE_NUMBER_IN_URL_ON_PRODUCT_CLICK
    )

    const PRODUCTS_PER_PAGE =
      (useFeatureFlag(FeatureFlag.PRODUCT_LIST_PRODUCTS_PER_PAGE) as number) ||
      DEFAULT_PRODUCTS_PER_PAGE

    const isBasketNotificationEnabled = useFeatureFlag(
      FeatureFlag.BASKET_NOTIFICATION
    )

    const isSegmentProductListFilteredEventEnabled = useFeatureFlag(
      FeatureFlag.SEGMENT_PRODUCT_LIST_FILTERED_EVENT
    )

    // TODO: Remove when the price channels on products are ready to be used
    const mockedProductPriceChannels = useFeatureFlag(
      FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_PRODUCT_PRICE_CHANNEL
    ) as { channel_prices: ChannelPrice[] }

    useEffect(() => {
      hits && setProducts?.(hits)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      setIsModalOpen(false)
    }, [setIsModalOpen])

    const getNextPageQuery = () => {
      return searchStateToQuery({
        ...searchState,
        page: (
          (searchState?.page ? Number(searchState.page) : DEFAULT_PAGE) + 1
        ).toString()
      })
    }

    const totalLoadedProducts = (page + 1) * PRODUCTS_PER_PAGE

    const products = hits.map((hit, idx) => {
      const productIndex =
        totalLoadedProducts === hits.length
          ? idx
          : totalLoadedProducts - hits.length < PRODUCTS_PER_PAGE
          ? idx
          : idx + (totalLoadedProducts - hits.length)
      const productPage = Math.floor(productIndex / PRODUCTS_PER_PAGE + 1)

      const product = isUpdatePageNumberInUrlOnProductClickEnabled
        ? {
            ...normalizeAlgoliaProduct(
              locale,
              hit,
              sessionChannel,
              mockedProductPriceChannels?.channel_prices
            ),
            productPage
          }
        : normalizeAlgoliaProduct(
            locale,
            hit,
            sessionChannel,
            mockedProductPriceChannels.channel_prices
          )
      const productInBasket = basketItems.filter(
        item => product.sku === item.sku && !item.isPromo
      )
      product.basketQuantity =
        productInBasket.length > 0 ? productInBasket[0]?.quantity : 0
      return product
    })

    const getNumberOfViewedProducts = (
      totalProducts: number,
      page?: number
    ): number => {
      if (totalProducts < PRODUCTS_PER_PAGE) {
        return totalProducts
      }

      if (page && page * PRODUCTS_PER_PAGE > totalProducts) {
        return totalProducts
      }

      return (page && page * PRODUCTS_PER_PAGE) ?? 1
    }

    const numberOfViewedProducts = getNumberOfViewedProducts(
      nbHits,
      Number(searchState?.page) || DEFAULT_PAGE
    )

    const itemInBasket = basketItems.filter(
      item => basketModalProduct?.sku === item.sku
    )

    useEffect(() => {
      if (!currentQuantityValue && !isRemoved) {
        setCurrentQuantityValue(productInBasket?.basketQuantity ?? 0)
      }
    }, [currentQuantityValue, productInBasket?.basketQuantity, isRemoved])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeItemQuantityRequest = useCallback(
      debounce(
        (value: number, productSku, productId, changed_from: string) => {
          dispatch(
            changeItemQuantityTrigger({
              id: productId,
              sku: productSku,
              quantity: +value ?? 0,
              changed_from
            })
          )
        },
        300,
        { leading: false, trailing: true }
      ),
      []
    )

    useEffect(() => {
      const isProductInBasket = basketItems.some(
        product => productInBasket?.sku === product.sku
      )
      if (
        productInBasket?.sku &&
        isProductInBasket &&
        currentQuantityValue &&
        isTriggered
      ) {
        setIsTriggered(false)
        const productInBasket = basketItems.find(
          item => item.sku === basketModalProduct?.sku && !item.isPromo
        )

        const maxProductQuantity =
          productInBasket?.product?.maxQuantity &&
          productInBasket?.product?.maxQuantity < MAXIMUM_PRODUCT_QUANTITY
            ? productInBasket?.product.maxQuantity
            : MAXIMUM_PRODUCT_QUANTITY
        changeItemQuantityRequest(
          currentQuantityValue > maxProductQuantity
            ? maxProductQuantity
            : currentQuantityValue,
          basketModalProduct?.sku,
          productInBasket?.id,
          quantityChangedFrom
        )
        if (
          inputRef?.current &&
          basketModalProduct &&
          inputRef.current[basketModalProduct?.sku] &&
          inputRef.current[basketModalProduct?.sku].value
        ) {
          inputRef.current[basketModalProduct?.sku].value =
            currentQuantityValue > maxProductQuantity
              ? maxProductQuantity.toString()
              : currentQuantityValue?.toString() ?? ''
        }
      }
    }, [
      currentQuantityValue,
      productInBasket?.sku,
      changeItemQuantityRequest,
      quantityChangedFrom,
      basketItems,
      isTriggered,
      basketModalProduct?.sku,
      basketModalProduct
    ])

    useEffect(() => {
      if (
        basketQuantityError &&
        basketModalProduct &&
        basketModalProduct?.sku &&
        +basketQuantityError?.sku === +basketModalProduct?.sku
      ) {
        setAvailableQuantity(basketQuantityError.available_qty.toString())
        setCurrentQuantityValue(basketQuantityError.available_qty)
        setIsTriggered(true)
      }
    }, [basketQuantityError, basketModalProduct?.sku, basketModalProduct])

    useEffect(() => {
      if (sessionChannel) {
        const productsListString: string =
          storage.getItem('productsListSearched') || '{}'
        const productsListArray =
          productsListString !== '{}' ? JSON.parse(productsListString) : []
        productsListArray.find(
          (product: AlgoliaProduct | Partial<Product> | undefined) => {
            if (product?.sku === sessionChannel?.sku) {
              product = normalizeAlgoliaProduct(
                locale,
                product as AlgoliaProduct,
                sessionChannel,
                mockedProductPriceChannels.channel_prices
              )
            }
          }
        )
      }
    }, [
      locale,
      mockedProductPriceChannels.channel_prices,
      sessionChannel,
      storage
    ])

    const addToBasket = (product: Product, added_from: string) => {
      setCurrentQuantityValue(0)
      if (product) {
        dispatch(
          addToBasketTrigger({
            sku: product?.sku,
            quantity: 1,
            added_from
          })
        )
        dispatch(triggerBasketModal(product))
        dispatch(handleProductQuantityAction(false))
        if (!isModalOpen) setIsModalOpen(true)
        if (!isNotificationOpen) setIsNotificationOpen(value => !value)
      }
    }

    const removeFromBasket = (
      product?: RemoveBasketItem,
      removed_from?: string
    ) => {
      const productInBasket = basketItems.find(
        item => item.sku === product?.sku
      )
      dispatch(
        removeFromBasketTrigger({
          sku: productInBasket?.sku,
          id: productInBasket?.id,
          removed_from
        })
      )
      dispatch(handleProductQuantityAction(true))
      setCurrentQuantityValue(0)
      if (!isNotificationOpen) setIsNotificationOpen(value => !value)
    }

    const openBasketModal = (product: Product) => {
      if (product) {
        setCurrentQuantityValue(product.basketQuantity ?? 0)
      }
      setAvailableQuantity('')
      dispatch(triggerBasketModal(product))
      if (!isModalOpen) {
        setIsModalOpen(true)
      }
    }

    const increaseQuantity = useCallback(() => {
      if (!isTriggered) setIsTriggered(true)
      setCurrentQuantityValue(v => v + 1)
      setIsModalOpen(true)
      setQuantityChangedFrom(PATH_DESCRIPTION.CART_MODAL)
    }, [isTriggered, setIsModalOpen])

    const decreaseQuantity = useCallback(
      (productMaxQuantity?: number) => () => {
        const maxProductQuantity =
          productMaxQuantity && productMaxQuantity < MAXIMUM_PRODUCT_QUANTITY
            ? productMaxQuantity
            : MAXIMUM_PRODUCT_QUANTITY
        if (currentQuantityValue > maxProductQuantity)
          setCurrentQuantityValue(maxProductQuantity)
        setIsTriggered(true)
        setCurrentQuantityValue(v => v - 1)
        setQuantityChangedFrom(PATH_DESCRIPTION.CART_MODAL)
      },
      [currentQuantityValue]
    )

    const productView = useSelector(selectProductView)

    const algoliaABTestID: string = storage?.getItem('algoliaABTestID') || ''

    // preventing from firing ProductListViewed multiple times
    // and before the basket was loaded
    const wasSuccess = useSelector(selectWasSuccess)

    if (localProducts.length < products.length && wasSuccess) {
      const productListToTrack = products.reduce(
        (list: Partial<Product>[], product, index) => {
          if (
            !localProducts.some(
              localProduct => product.sku === localProduct.sku
            )
          ) {
            list.push({ ...product, position: index + 1 })
          }
          return list
        },
        []
      )

      setLocalProducts(products)

      // separating the product array into arrays of 20 so that the productListViewed event
      // conforms with the GA event limit of 8kb

      const chunkedProductsArray = splitArrayInChunks(
        productListToTrack,
        SEGMENT_PRODUCT_ARRAY_CHUNK_LENGTH
      )

      let pageId = ''
      switch (content?.type) {
        case 'pop':
          pageId = `${content?.category?.id}`
          break
        case 'brand':
          pageId = `brand/${content?.brand?.id}`
          break
      }

      chunkedProductsArray.forEach(element => {
        setTimeout(() => {
          dispatch(
            triggerReportProductListViewed({
              products: element,
              category: pageId,
              type: content?.type,
              list_view: productView,
              list_id: isSearchPage ? 'search/search_results' : undefined,
              algoliaABTestId: algoliaABTestID
            })
          )
        }, 0)
      })
    }

    const [filteredProductsToTrack, setFilteredProductsToTrack] = useState<
      Partial<Product>[]
    >([])

    const reportProductListFilteredEvent = useCallback(() => {
      const brandFilters = {
        type: 'brand',
        value: searchState?.brand
      }
      const subBrandFilters = {
        type: 'sub_brand',
        value: searchState?.brand_subbrand
      }
      const formatFilters = {
        type: 'format',
        value: searchState?.format
      }
      const categoryLvl0Filters = {
        type: 'catecory_lvl_0',
        value: searchState?.categoryLvl0
      }
      const categoryLvl1Filters = {
        type: 'catecory_lvl_1',
        value: searchState?.categoryLvl1
      }
      const categoryLvl2Filters = {
        type: 'catecory_lvl_2',
        value: searchState?.categoryLvl2
      }

      const filtersArray = [
        searchState?.brand ? brandFilters : undefined,
        searchState?.brand_subbrand ? subBrandFilters : undefined,
        searchState?.format ? formatFilters : undefined,
        searchState?.categoryLvl0 ? categoryLvl0Filters : undefined,
        searchState?.categoryLvl1 ? categoryLvl1Filters : undefined,
        searchState?.categoryLvl2 ? categoryLvl2Filters : undefined
      ] as Array<ProductFilter>

      const productListToTrack = products.reduce(
        (list: Partial<Product>[], product, index) => {
          if (
            !filteredProductsToTrack.some(
              filteredProductToTrack =>
                product.sku === filteredProductToTrack.sku
            )
          ) {
            list.push({ ...product, position: index + 1 })
          }
          return list
        },
        []
      )

      setFilteredProductsToTrack(products)

      const chunkedProductsArray = splitArrayInChunks(
        productListToTrack,
        SEGMENT_PRODUCT_ARRAY_CHUNK_LENGTH
      )

      chunkedProductsArray.forEach(element => {
        dispatch(
          triggerReportProductListFiltered({
            products: element,
            filters: filtersArray.filter(function (element) {
              return element !== undefined
            })
          })
        )
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, searchState])

    useEffect(() => {
      if (isSegmentProductListFilteredEventEnabled) {
        reportProductListFilteredEvent()
      }
    }, [
      reportProductListFilteredEvent,
      isSegmentProductListFilteredEventEnabled
    ])

    const handleAddToFavourites = useHandleAddToFavourites(router)
    const handleRemoveFromFavourites = useHandleRemoveFromFavourites(router)

    const loadPreviousButton = hasPrevious && (
      <div className="flex justify-center">
        <Button
          className="mb-2 mt-1.75 px-0 py-0 border-none leading-7"
          type="button"
          variant="back"
          data-testid={'load-previous-button'}
          onClick={e => {
            e.preventDefault()
            const storage = globalThis?.sessionStorage
            if (!storage) return
            storage.setItem('scroll-position-product-id-marker', hits[0].sku)

            refinePrevious()
          }}
        >
          <div className="w-full flex justify-center">
            <ChevronUpWide className="icon-16" />
          </div>
          {t('product.load-previous')}
        </Button>
      </div>
    )

    if (nbHits === 0) {
      return (
        <div
          className={classNames(
            'pb-9 col-span-12 flex flex-col',
            'md:col-start-1 lg:col-start-1 md:col-end-13'
          )}
        >
          <SearchWithNoResults />
        </div>
      )
    }

    return nbHits > 0 ? (
      <>
        {renderFilters?.(nbHits)}
        <section
          className={classNames(
            'pb-9 flex flex-col col-span-12',
            'md:col-start-4 lg:col-start-3 md:col-end-13'
          )}
          data-testid="productList"
          {...props}
        >
          {loadPreviousButton}
          {productView === ProductViews.GRID ? (
            <ProductGrid
              addedFrom={PATH_DESCRIPTION.POP}
              listId={listId}
              isPop
              isLcp={isSearchPage}
              productCardList={
                isSearchPage
                  ? products
                  : listOfProductsAndContentBlocks(products, isDesktop, content)
              }
              openBasketModal={product => openBasketModal(product)}
              addToBasket={product =>
                addToBasket(product, PATH_DESCRIPTION.POP)
              }
              removeFromBasket={product =>
                removeFromBasket(product, PATH_DESCRIPTION.POP)
              }
              addToFavourites={sku => handleAddToFavourites(sku)}
              removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
              isModalOpen={isModalOpen}
              testId="productSearchList"
            />
          ) : (
            <ProductList
              addedFrom={PATH_DESCRIPTION.POP}
              listId={listId}
              products={
                isSearchPage
                  ? products
                  : listOfProductsAndContentBlocks(products, isDesktop, content)
              }
              openBasketModal={product => openBasketModal(product)}
              addToBasket={product =>
                addToBasket(product, PATH_DESCRIPTION.POP)
              }
              removeFromBasket={product =>
                removeFromBasket(product, PATH_DESCRIPTION.POP)
              }
              addToFavourites={sku => handleAddToFavourites(sku)}
              removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
              isModalOpen={isModalOpen}
              {...props}
            />
          )}

          <InfinitePagination
            itemsPartialNumber={'product.partial-number-of-products'}
            loadMoreText={t('product.load-more')}
            className="mt-4 container sm:px-0"
            current={numberOfViewedProducts}
            total={nbHits}
            hasMore={hasMore}
            isLoading={isSearchStalled}
            loadMore={refineNext}
            getNextPageQuery={getNextPageQuery}
          />
          {isBasketNotificationEnabled &&
            isNotificationOpen &&
            (wasItemError || wasItemSuccess) && (
              <BasketNotification
                product={basketModalProduct ?? productInBasket}
                isRemoved={isRemoved}
                wasItemError={wasItemError}
                wasItemSuccess={wasItemSuccess}
                isModalOpen={isNotificationOpen}
                onTransitionEnd={() => {
                  basketNotificationRef?.current?.classList.remove(
                    'basketNotificationFadeIn'
                  )
                  basketNotificationRef?.current?.classList.add(
                    'basketNotificationFadeOut'
                  )
                  fadeOut()
                }}
                basketNotificationRef={basketNotificationRef}
                basketItems={basketItemsCount}
                hasPromotionalItem={itemInBasket[0]?.hasPromotionalItem}
                isPromotionalItemOutOfStock={
                  itemInBasket[0]?.hasPromotionalItemOutofStock
                }
              />
            )}
          {!isBasketNotificationEnabled && basketModalProduct && (
            <BasketModal
              product={basketModalProduct}
              productQuantity={currentQuantityValue}
              productSku={basketModalProduct?.sku ?? ''}
              isBasketModalOpen={isModalOpen}
              modalRef={modalRef}
              basketModalClose={() => setIsModalOpen(false)}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity(
                basketModalBasketItem?.product?.maxQuantity
              )}
              addToBasket={product =>
                addToBasket(product, PATH_DESCRIPTION.CART_MODAL)
              }
              removeFromBasket={() =>
                removeFromBasket(
                  basketModalBasketItem,
                  PATH_DESCRIPTION.CART_MODAL
                )
              }
              wasItemError={wasItemError}
              isRemoved={isRemoved}
              changeQuantity={e => {
                const value = +e.target.value
                if (!isTriggered) setIsTriggered(true)
                setCurrentQuantityValue(value)
              }}
              inputRef={(input: HTMLInputElement) => {
                if (productInBasket.sku)
                  inputRef.current[productInBasket.sku] = input
              }}
              inputValue={
                productInBasket.sku &&
                inputRef.current[productInBasket.sku]?.value
              }
              availability={productInBasket.availability}
              doExceeds={validateMaxQuantity(
                currentQuantityValue,
                basketModalBasketItem?.product.maxQuantity
              )}
              availableQty={+availableQuantity}
              hasPromotionalItem={itemInBasket[0]?.hasPromotionalItem}
              isPromotionalItemOutofStock={
                itemInBasket[0]?.hasPromotionalItemOutofStock
              }
              maxQuantity={
                basketModalBasketItem?.product.maxQuantity ??
                MAXIMUM_PRODUCT_QUANTITY
              }
            />
          )}
        </section>
      </>
    ) : productView === ProductViews.GRID ? (
      <section
        className={classNames(
          'border-ui-grey-light col-span-12 col-end-13',
          'pt-14 md:col-start-4 lg:col-start-3'
        )}
      >
        <ul
          data-testid="productGridLoading"
          className={classNames(
            'grid gap-0 border-t border-ui-grey-light',
            'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
          )}
        >
          {[...Array(12)].map((_, idx) => {
            return (
              <li
                className={classNames('p-2 border-b border-ui-grey-light', {
                  'xs-only:border-l': idx % 2 !== 0,
                  'sm-and-md-only:border-l': idx % 3 !== 0,
                  'lg:border-l': idx % 4 !== 0
                })}
                key={idx}
              >
                <ProductCardLoading className="pb-11" />
              </li>
            )
          })}
        </ul>
      </section>
    ) : (
      <section className="pb-9 col-span-12 row-start-5 row-end-6 flex flex-col md:col-start-4 lg:col-start-3 md:col-end-13">
        <ul>
          {[...Array(5)].map((el, idx) => (
            <li key={`product-and-contentblock-${idx}`}>
              <ProductTileLoading key={idx} className={'sm:h-29'} />
            </li>
          ))}
        </ul>
      </section>
    )
  }
)

export const SearchCountConnected = connectStats(
  ({
    nbHits,
    processingTimeMS,
    // @ts-ignore - missing algolia type
    indexContextValue,
    // @ts-ignore - missing algolia type
    areHitsSorted,
    // @ts-ignore - missing algolia type
    nbSortedHits,
    ...props
  }) => <SearchCount count={nbHits} {...props} />
)
