import type { GetServerSideProps, NextPage } from 'next'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MetaData } from '~components/meta/MetaData'
import { Trans, useTranslation } from 'react-i18next'
import { ReactComponent as Merkzettel } from '../assets/svg/navigation-24px/Merkzettel.svg'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { createReduxStore, RootState } from '~domains/redux'
import {
  addToBasketTrigger,
  changeItemQuantityTrigger,
  handleProductQuantityAction,
  removeFromBasketTrigger,
  selectBasketModalProduct,
  selectItems,
  selectItemWasError,
  selectItemWasSuccess,
  selectNumberOfItems,
  selectQuantityAction,
  selectQuantityError,
  triggerBasketModal
} from '~domains/basket'
import { FavouritesPageLayout } from '~components/templates/FavouritesPageLayout'
import { triggerReportPageViewed } from '~domains/analytics'
import {
  getFavouritesProductsTrigger,
  getFavouritesTrigger,
  removeFavouritesSave,
  selectFavouriteProducts,
  selectFavouritesItems,
  selectForceRefresh,
  selectFavouritesWasError,
  selectFavouritesProductsWasError,
  selectGetFavouritesItemsLoaded,
  selectGetFavouritesProductsLoaded,
  resetProducts
} from '~domains/favourites'
import {
  FavouritesItemsIds,
  FavouritesWithProducts
} from '~domains/favourites/types'
import {
  Product,
  ProductsAndContentBlocksListItem
} from '~domains/product/types'
import { ProductList } from '~components/organisms/ProductList'
import { BasketModal } from '~components/organisms/BasketModal/BasketModal'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { useDetectOutsideClick } from '~helpers'
import debounce from 'lodash/debounce'
import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { RemoveBasketItem } from '~domains/basket/types'
import { validateMaxQuantity } from '~helpers/validateMaxQuantity'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { getGuestFavouritesItems } from '~helpers/guest-favourites'
import { ReactComponent as NoFavouritesAdded } from '~assets/svg/no-favourites-added.svg'
import { Button } from '~components/atoms/Button'
import { Link } from '~components/atoms/Link'
import { useRouter } from 'next/router'
import { BasketNotification } from '~components/organisms/BasketNotification'
import { timeout } from '~helpers/timeout'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { GridListToggle } from '~components/atoms/GridListToggle'
import { selectProductView } from '~domains/product/selectors/view-toggle'
import { ProductViews } from '~domains/product/slices/view-toggle'
import { ProductGrid } from '~components/organisms/ProductGrid'
import classNames from 'classnames'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const Favourites: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { push } = useRouter()

  const isGuestFavouritesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES
  )

  const isFavouritesGridEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GRID_VIEW
  )

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const forceRefreshItems = useSelector(selectForceRefresh)
  const storedFavouritesItems = useSelector(selectFavouritesItems)
  // Dependancy is needed otherwise guest products won't be removed
  // If forceRefreshItems is included in the dependency array it causes infinite loop on the page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const guestFavouritesItems = useMemo(() => getGuestFavouritesItems(), [
    forceRefreshItems
  ])
  const favouritesProducts: FavouritesWithProducts = useSelector(
    selectFavouriteProducts
  )
  const getFavouritesItemsLoaded = useSelector(selectGetFavouritesItemsLoaded)
  const getFavouritesProductsLoaded = useSelector(
    selectGetFavouritesProductsLoaded
  )
  const basketItems = useSelector(selectItems)
  const [products, setProducts] = useState<
    ProductsAndContentBlocksListItem[] | null
  >(null)
  const [
    favouritesItems,
    setFavouritesItems
  ] = useState<FavouritesItemsIds | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const basketModalProduct = useSelector(selectBasketModalProduct)
  const modalRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useDetectOutsideClick(modalRef, false)

  const basketModalBasketItem = basketItems.find(
    item => item.sku === basketModalProduct?.sku
  )
  const productInBasket: Product | null = {
    ...basketModalProduct,
    basketQuantity: basketModalBasketItem?.quantity ?? 0
  } as Product
  const [currentQuantityValue, setCurrentQuantityValue] = useState(0)
  const inputRef = useRef<Record<string, HTMLInputElement>>({})
  const [availableQuantity, setAvailableQuantity] = useState('')
  const basketQuantityError = useSelector(selectQuantityError)
  const [quantityChangedFrom, setQuantityChangedFrom] = useState('')
  const basketNotificationRef = useRef<HTMLDivElement>(null)
  const basketItemsCount = useSelector(selectNumberOfItems)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const itemInBasket = basketItems.filter(
    item => basketModalProduct?.sku === item.sku
  )

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
  const wasError = useSelector(selectFavouritesWasError)
  const productsWasError = useSelector(selectFavouritesProductsWasError)

  const productView = useSelector(selectProductView)
  const isGridView = productView === ProductViews.GRID

  const [isTriggered, setIsTriggered] = useState(false)
  const isRemoved = useSelector(selectQuantityAction)
  const wasItemError = useSelector<
    RootState,
    ReturnType<typeof selectItemWasError>
  >(state =>
    selectItemWasError(state, { sku: basketModalProduct?.sku ?? undefined })
  )
  const isBasketNotificationEnabled = useFeatureFlag(
    FeatureFlag.BASKET_NOTIFICATION
  )

  useEffect(() => {
    if (!currentQuantityValue && !isRemoved) {
      setCurrentQuantityValue(productInBasket?.basketQuantity ?? 0)
    }
  }, [currentQuantityValue, productInBasket?.basketQuantity, isRemoved])

  const handleRemoveFromFavourites = useCallback(
    async (sku: string) => {
      sku && dispatch(removeFavouritesSave({ sku }))
    },
    [dispatch]
  )

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
        item => item.sku === basketModalProduct?.sku && !item?.isPromo
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
        inputRef.current[basketModalProduct?.sku]
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
    basketItems,
    isTriggered,
    basketModalProduct?.sku,
    basketModalProduct,
    quantityChangedFrom
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

  const addToBasket = (product: Product, added_from?: string) => {
    if (product) {
      setCurrentQuantityValue(0)
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

  const handleRemoveProduct = (
    product?: RemoveBasketItem,
    removed_from?: string
  ) => {
    const productInBasket = basketItems.find(item => item.sku === product?.sku)
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

  const increaseQuantity = useCallback(
    (product: Product) => () => {
      setIsTriggered(true)
      if (product) dispatch(triggerBasketModal(product))
      setCurrentQuantityValue(v => v + 1)
      setIsModalOpen(true)
      setQuantityChangedFrom(PATH_DESCRIPTION.CART_MODAL)
    },
    [dispatch, setIsModalOpen]
  )

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

  const hasProducts = useMemo(() => {
    return products && products?.length > 0
  }, [products])

  const areProductsLoaded = useMemo(
    () =>
      (getFavouritesItemsLoaded &&
        (favouritesItems && favouritesItems?.length > 0
          ? getFavouritesProductsLoaded
          : true)) ||
      typeof products !== null,
    [
      getFavouritesItemsLoaded,
      favouritesItems,
      getFavouritesProductsLoaded,
      products
    ]
  )

  useEffect(() => {
    /* Guest favourites coming from cookie */
    if (isGuestFavouritesEnabled && !isLoggedIn) {
      setFavouritesItems(guestFavouritesItems)
    }
  }, [isLoggedIn, isGuestFavouritesEnabled, guestFavouritesItems])

  useEffect(() => {
    /* Re-trigger Guest favourites after changing something */
    if (!isLoggedIn) {
      setFavouritesItems(guestFavouritesItems)
    }
    // If guestFavouritesItems is included in the dependency array it causes infinite loop on the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, forceRefreshItems])

  useEffect(() => {
    /* Registered customer favourites coming from Spryker */
    if (isLoggedIn && storedFavouritesItems) {
      setFavouritesItems(storedFavouritesItems ?? [])
    }
  }, [isLoggedIn, getFavouritesItemsLoaded, storedFavouritesItems])

  useEffect(() => {
    return () => {
      dispatch(resetProducts())
    }
  }, [dispatch])

  useEffect(() => {
    if (getFavouritesProductsLoaded) {
      const favProducts: ProductsAndContentBlocksListItem[] = []
      favouritesProducts?.length &&
        favouritesProducts.map((product: Partial<Product>) => {
          const productInBasket = basketItems.filter(
            item => product.sku === item.sku && !item?.isPromo
          )
          const favProduct = {
            ...product,
            basketQuantity:
              productInBasket.length > 0 ? productInBasket[0]?.quantity : 0
          }
          product.enabled && favProducts.push(favProduct)
        })

      setProducts(favProducts)
      setIsLoading(false)
    }

    if (
      isLoggedIn &&
      !wasError &&
      !productsWasError &&
      favouritesItems &&
      favouritesItems.length === 0
    ) {
      setProducts([])
      setIsLoading(false)
      return
    }

    if (
      productsWasError ||
      (!isLoggedIn && favouritesItems && favouritesItems.length === 0)
    ) {
      setProducts([])
      setIsLoading(false)
    }
  }, [
    favouritesProducts,
    basketItems,
    getFavouritesProductsLoaded,
    favouritesItems,
    wasError,
    productsWasError,
    isLoggedIn
  ])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Favourites', pageType: 'favourites' })
    )
  }, [dispatch])

  useEffect(() => {
    if (isLoggedIn && favouritesItems === null) {
      dispatch(getFavouritesTrigger())
    }
  }, [dispatch, isLoggedIn, favouritesItems])

  useEffect(() => {
    // Products not fetched yet
    if (
      favouritesItems?.length &&
      !hasProducts &&
      !favouritesProducts?.length &&
      ((getFavouritesItemsLoaded && isLoggedIn) || !isLoggedIn)
    ) {
      dispatch(getFavouritesProductsTrigger({ skus: favouritesItems }))
    }

    // When removing items
    if (
      hasProducts &&
      favouritesItems &&
      favouritesProducts &&
      favouritesItems.length !== favouritesProducts.length &&
      (getFavouritesItemsLoaded || guestFavouritesItems)
    ) {
      dispatch(getFavouritesProductsTrigger({ skus: favouritesItems }))
    }
  }, [
    dispatch,
    favouritesItems,
    favouritesProducts,
    hasProducts,
    getFavouritesItemsLoaded,
    isLoggedIn,
    guestFavouritesItems
  ])

  return (
    <>
      <MetaData title={t('seo.titles.favourites')} indexation="noindex" />
      {!areProductsLoaded || isLoading ? (
        <section
          className={classNames(
            'flex flex-col items-center my-16 sm:my-13 md:my-10 text-center md:col-end-9',
            {
              'md:col-start-1': isFavouritesGridEnabled || isGridView,
              'md:col-start-5': !isFavouritesGridEnabled || !isGridView
            }
          )}
        >
          <LoadingSpinner className="w-5" />
        </section>
      ) : (
        <>
          {hasProducts ? (
            <section
              className="md:row-start-1 md:col-start-2 md:col-end-12"
              data-testid="favouritesProductList"
            >
              {isGuestFavouritesEnabled && !isLoggedIn && (
                <div className="bg-ui-carribean-green-lightest p-2 flex flex-row gap-2 mx-2 sm:mx-0">
                  <div className="relative">
                    <div className="absolute -right-0.25 top-0 bg-primary-caribbean-green w-3 h-3 rounded-full flex place-items-center	place-content-center">
                      <Checkmark className="text-primary-white icon-20" />
                    </div>
                    <div className="w-8 h-8 bg-primary-white p-1 rounded-full flex place-items-center	place-content-center">
                      <Merkzettel className="icon-24" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 pt-0.25">
                    <strong className="text-lg">
                      {t('favourites.guest-favourites-notification.title')}
                    </strong>
                    <Trans
                      i18nKey={'favourites.guest-favourites-notification.body'}
                      components={{
                        a: (
                          <Link
                            target="_self"
                            className="text-primary-caribbean-green-dark"
                          />
                        )
                      }}
                    ></Trans>
                  </div>
                </div>
              )}
              <div className="mb-2 mt-3 md:mb-3 md:mt-3 flex justify-between px-2 sm:px-0">
                <p className="text-ui-grey-dark">
                  {t('favourites.total-number-of-favourites', {
                    count: products?.length || 0
                  })}
                </p>
                {isFavouritesGridEnabled && (
                  <GridListToggle data-testid="gridListToggle" />
                )}
              </div>
              {isGridView && isFavouritesGridEnabled ? (
                <ProductGrid
                  isFavouritesPage
                  addedFrom={PATH_DESCRIPTION.FAVOURITES}
                  listId="favourites"
                  openBasketModal={product => openBasketModal(product)}
                  addToBasket={product =>
                    addToBasket(product, PATH_DESCRIPTION.FAVOURITES)
                  }
                  removeFromBasket={product =>
                    handleRemoveProduct(product, PATH_DESCRIPTION.FAVOURITES)
                  }
                  removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
                  testId="productSearchList"
                  productCardList={products ?? []}
                />
              ) : (
                <ProductList
                  addedFrom={PATH_DESCRIPTION.FAVOURITES}
                  listId={`favourites`}
                  products={products ?? []}
                  isFavouritesPage
                  openBasketModal={product => openBasketModal(product)}
                  addToBasket={product =>
                    addToBasket(product, PATH_DESCRIPTION.FAVOURITES)
                  }
                  removeFromBasket={product =>
                    handleRemoveProduct(product, PATH_DESCRIPTION.FAVOURITES)
                  }
                  changeQuantity={(sku, quantity, id) => {
                    dispatch(changeItemQuantityTrigger({ sku, quantity, id }))
                  }}
                  removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
                />
              )}
            </section>
          ) : (
            <section
              className={classNames(
                'mt-6 flex flex-col items-center mb-8 sm:mb-4 md:mb-2 text-center md:col-end-9',
                {
                  'md:col-start-1': isFavouritesGridEnabled || isGridView,
                  'md:col-start-5': !isFavouritesGridEnabled || !isGridView
                }
              )}
            >
              <NoFavouritesAdded className="mb-3 icon-160" />
              <h2 className="mb-1.5">
                {t('favourites.empty-favourites.title')}
              </h2>
              <p className="sm:w-48 max-w-44.25 mb-4">
                {t('favourites.empty-favourites.body')}
              </p>
              <Button
                data-testid="basketProductTileRemoveButton"
                aria-label={t('basket.modal-continue-shopping')}
                variant="secondary"
                className="border-none px-3"
                onClick={() => push('/')}
              >
                {t('basket.modal-continue-shopping')}
              </Button>
            </section>
          )}
        </>
      )}

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
            hasPromotionalItem={itemInBasket?.[0]?.hasPromotionalItem}
            isPromotionalItemOutOfStock={
              itemInBasket?.[0]?.hasPromotionalItemOutofStock
            }
          />
        )}

      {!isBasketNotificationEnabled && (
        <BasketModal
          product={productInBasket}
          productQuantity={currentQuantityValue}
          productSku={productInBasket?.sku}
          isBasketModalOpen={isModalOpen}
          modalRef={modalRef}
          basketModalClose={() => setIsModalOpen(false)}
          increaseQuantity={increaseQuantity(productInBasket)}
          decreaseQuantity={decreaseQuantity(
            basketModalBasketItem?.product?.maxQuantity
          )}
          addToBasket={product =>
            addToBasket(product, PATH_DESCRIPTION.CART_MODAL)
          }
          removeFromBasket={() =>
            handleRemoveProduct(
              basketModalBasketItem,
              PATH_DESCRIPTION.CART_MODAL
            )
          }
          wasItemError={wasItemError}
          isRemoved={isRemoved}
          changeQuantity={e => {
            const value = +e.target.value
            setIsTriggered(true)
            setCurrentQuantityValue(value)
          }}
          inputRef={(input: HTMLInputElement) => {
            if (productInBasket.sku)
              inputRef.current[productInBasket.sku] = input
          }}
          inputValue={
            productInBasket.sku && inputRef.current[productInBasket.sku]?.value
          }
          availability={productInBasket.availability}
          doExceeds={validateMaxQuantity(
            currentQuantityValue,
            basketModalBasketItem?.product.maxQuantity
          )}
          availableQty={+availableQuantity}
          hasPromotionalItem={basketModalBasketItem?.hasPromotionalItem}
          isPromotionalItemOutofStock={
            basketModalBasketItem?.hasPromotionalItemOutofStock
          }
          maxQuantity={
            basketModalBasketItem?.product.maxQuantity ??
            MAXIMUM_PRODUCT_QUANTITY
          }
        />
      )}
    </>
  )
}

Favourites.Layout = (page: JSX.Element) => (
  <FavouritesPageLayout>{page}</FavouritesPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  // TODO: most of this can likely be extracted as common to all pages
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES,
    FeatureFlag.BASKET_NOTIFICATION,
    FeatureFlag.ACCOUNT_FAVOURITES_GRID_VIEW
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default Favourites
