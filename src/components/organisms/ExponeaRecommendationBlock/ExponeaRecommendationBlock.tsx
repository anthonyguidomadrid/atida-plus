import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useRef,
  useCallback,
  useEffect,
  useState,
  useMemo
} from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'

import {
  DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
  RECOMMENDATIONS_TYPES
} from '~config/constants/recommendations'
import { ExponeaRecommendation } from '~domains/contentful'
import {
  fetchAllRecommendationsTrigger,
  fetchRecommendationsTrigger
} from '~domains/exponea'
import { selectRecommendedProducts } from '~domains/exponea/selectors/fetch-recommendations'
import { ProductGrid } from '~components/organisms/ProductGrid'
import { FetchRecommendationResponse } from '~domains/exponea/types'
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
import { getCustomerTrigger } from '~domains/account'
import {
  selectCustomerDetails,
  selectCustomerReference,
  selectIsLoading
} from '~domains/account/selectors/customer'
import { triggerReportProductListViewed } from '~domains/analytics'
import { useDetectOutsideClick } from '~helpers'
import { selectContent, selectPageSlug } from '~domains/page'
import {
  Product,
  selectIsProductDetailsPage,
  selectProductData
} from '~domains/product'
import { RootState } from '~domains/redux'
import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { Link } from '~components/atoms/Link'
import { ReactComponent as NavAdd } from '~assets/svg/navigation-16px/NavAdd.svg'
import { CategoryDetails } from '~components/templates/CategoryOverviewLayout'
import { RemoveBasketItem } from '~domains/basket/types'
import { validateMaxQuantity } from '~helpers/validateMaxQuantity'
import { ProductSlider } from '~components/organisms/ProductSlider/ProductSlider'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import useInView from 'react-cool-inview'
import { selectRecommendationFromCollection } from '~domains/exponea/selectors/fetch-all-recommendations'
import { BasketNotification } from '../BasketNotification'
import { timeout } from '~helpers/timeout'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { FreqBoughtTogether } from '../FreqBoughtTogether'

import dynamic from 'next/dynamic'
import { BasketModalProps } from '../BasketModal/BasketModal'
import { MinifiedProductTile } from '~components/molecules/MinifiedProductTile'
import { useHandleAddToFavourites } from '~helpers/useHandleAddToFavourites'
import { useHandleRemoveFromFavourites } from '~helpers/useHandleRemoveFromFavourites'

const BasketModal = dynamic<BasketModalProps>(() =>
  import('~components/organisms/BasketModal').then(c => c.BasketModal)
)

export type ExponeaRecommendationBlockProps = ExponeaRecommendation & {
  category?: Pick<CategoryDetails, 'id' | 'url' | 'title'>
  productId?: string
  loading?: 'lazy' | 'eager'
}

export const ExponeaRecommendationBlock: FunctionComponent<
  ComponentPropsWithoutRef<'section'> & ExponeaRecommendationBlockProps
> = ({
  contentType,
  title,
  altTitle,
  recommendationId,
  recommendationType,
  category,
  productId,
  isProductSlider = false,
  itemsQuantity = DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
  loading = 'lazy',
  className,
  ...props
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isPdp = useSelector(selectIsProductDetailsPage)
  const content = useSelector(selectContent)
  const basketNotificationRef = useRef<HTMLDivElement>(null)
  const basketItemsCount = useSelector(selectNumberOfItems)

  const isBasketNotificationEnabled = useFeatureFlag(
    FeatureFlag.BASKET_NOTIFICATION
  )
  const thisProduct = useSelector(selectProductData)
  const customer = useSelector(selectCustomerDetails)
  const customerIsLoading = useSelector(selectIsLoading)
  const customerReference = useSelector(selectCustomerReference)

  const [shouldRender, setShouldRender] = useState<boolean>(false)
  const { observe } = useInView({
    threshold: 1,
    onEnter: ({ unobserve }) => {
      unobserve()
      !shouldRender && setShouldRender(true)
      products &&
        products.length > 1 &&
        dispatch(
          triggerReportProductListViewed({
            products,
            type: isPdp ? 'pdp' : content?.type,
            list_id: 'recommendation_list',
            recommendation_id: updatedRecommendationId
          })
        )
    }
  })

  const recommendations = useSelector(selectRecommendedProducts)

  const fadeOut = async () => {
    await timeout(200)
    setIsNotificationOpen(false)
  }

  const [updatedRecommendationId, setUpdatedRecommendationId] = useState(
    recommendationId
  )

  const recommendation = useMemo(
    () =>
      recommendations?.find((value: FetchRecommendationResponse) => {
        return (
          value.recommendationId ===
            (recommendationId ?? updatedRecommendationId) && value
        )
      }),
    [recommendationId, recommendations, updatedRecommendationId]
  )

  const pageSlug = useSelector(selectPageSlug)
  const basketItems = useSelector(selectItems)
  const selectRecommendation = useSelector<
    RootState,
    ReturnType<typeof selectRecommendationFromCollection>
  >(state =>
    selectRecommendationFromCollection(state, { type: recommendationType })
  )

  const products = useMemo(
    () =>
      recommendation?.items
        .map(product => {
          const productInBasket = basketItems.filter(
            item => product.sku === item.sku && !item.isPromo
          )
          return {
            ...product,
            basketQuantity:
              productInBasket.length > 0 ? productInBasket[0]?.quantity : 0
          }
        })
        .slice(0, itemsQuantity ?? selectRecommendation?.quantity) || [],
    [basketItems, itemsQuantity, selectRecommendation?.quantity, recommendation]
  )
  const recommendationTitle = useMemo(() => {
    return selectRecommendation?.title || title
  }, [selectRecommendation?.title, title])

  const recommendationAltTitle = useMemo(() => {
    return selectRecommendation?.altTitle ?? altTitle
  }, [selectRecommendation?.altTitle, altTitle])

  const basketModalProduct = useSelector(selectBasketModalProduct)
  const modalRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useDetectOutsideClick(modalRef, false)

  const basketModalBasketItem = useMemo(
    () => basketItems.find(item => item.sku === basketModalProduct?.sku),
    [basketItems, basketModalProduct?.sku]
  )

  const productInBasket: Product | null = useMemo(
    () =>
      ({
        ...basketModalProduct,
        basketQuantity: basketModalBasketItem?.quantity ?? 0
      } as Product),
    [basketModalBasketItem?.quantity, basketModalProduct]
  )

  const [currentQuantityValue, setCurrentQuantityValue] = useState(
    productInBasket.basketQuantity ?? 0
  )
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const wasItemSuccess = useSelector<
    RootState,
    ReturnType<typeof selectItemWasSuccess>
  >(state =>
    selectItemWasSuccess(state, { sku: productInBasket.sku ?? undefined })
  )

  useEffect(() => {
    setIsModalOpen(false)
  }, [setIsModalOpen])

  useEffect(() => {
    if (!currentQuantityValue && !isRemoved) {
      setCurrentQuantityValue(productInBasket?.basketQuantity ?? 0)
    }
  }, [currentQuantityValue, productInBasket?.basketQuantity, isRemoved])

  const handleAddToFavourites = useHandleAddToFavourites(router)
  const handleRemoveFromFavourites = useHandleRemoveFromFavourites(router)

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
        basketModalProduct?.sku ? basketModalProduct.sku : productInBasket?.sku,
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
    basketItems,
    isTriggered,
    basketModalProduct?.sku,
    basketModalProduct?.basketQuantity,
    productInBasket.basketQuantity,
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
  // TODO https://olp.atlassian.net/browse/PLUS-2980
  const addToBasket = useCallback(
    async (product: Product, added_from: string) => {
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
        if (!isModalOpen) setIsModalOpen(value => !value)
        if (!isNotificationOpen) setIsNotificationOpen(value => !value)
      }
    },
    [dispatch, isModalOpen, setIsModalOpen, isNotificationOpen]
  )

  const openBasketModal = useCallback(
    (product: Product) => {
      if (product) {
        setCurrentQuantityValue(product.basketQuantity ?? 0)
      }
      setAvailableQuantity('')
      dispatch(triggerBasketModal(product))
      if (!isModalOpen) {
        setIsModalOpen(true)
      }
    },
    [dispatch, isModalOpen, setIsModalOpen]
  )

  const removeFromBasket = useCallback(
    (product?: RemoveBasketItem, removed_from?: string) => {
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
    },
    [basketItems, dispatch, isNotificationOpen]
  )

  const increaseQuantity = useCallback(() => {
    setIsTriggered(true)
    setCurrentQuantityValue(v => v + 1)
    setIsModalOpen(true)
    setQuantityChangedFrom(PATH_DESCRIPTION.CART_MODAL)
  }, [setIsModalOpen])

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

  useEffect(() => {
    !customer?.email &&
      !customerIsLoading &&
      customerReference &&
      dispatch(getCustomerTrigger({ customerReference }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.email, customerReference, customerIsLoading])

  useEffect(() => {
    updatedRecommendationId &&
      dispatch(
        fetchRecommendationsTrigger({
          recommendationId: updatedRecommendationId,
          ...(productId && { productId }),
          categoryId: category?.title,
          itemsQuantity: itemsQuantity ?? selectRecommendation?.quantity
        })
      )
  }, [
    dispatch,
    recommendationId,
    category?.title,
    itemsQuantity,
    selectRecommendation?.quantity,
    updatedRecommendationId,
    productId
  ])

  useEffect(() => {
    if (!selectRecommendation && recommendationType) {
      dispatch(fetchAllRecommendationsTrigger({ type: recommendationType }))
    }
  }, [dispatch, recommendationType, selectRecommendation])

  useEffect(
    () =>
      selectRecommendation &&
      setUpdatedRecommendationId(selectRecommendation.id),
    [selectRecommendation]
  )

  const recommendedProducts = useMemo(() => {
    if (
      recommendationType === RECOMMENDATIONS_TYPES.FREQUENTLY_BOUGHT_TOGETHER
    ) {
      return (
        <FreqBoughtTogether
          key={thisProduct?.id}
          mainProduct={thisProduct}
          recommendedProducts={products.slice(0, 2)}
          recommendationId={updatedRecommendationId}
        />
      )
    }

    if (recommendationType === RECOMMENDATIONS_TYPES.SIMILAR_PRODUCTS) {
      return (
        <MinifiedProductTile
          key={thisProduct?.id}
          product={products[0]}
          showCheckbox={false}
          recommendationId={updatedRecommendationId}
        />
      )
    }

    return isProductSlider || selectRecommendation?.isSlider ? (
      <ProductSlider
        addedFrom={PATH_DESCRIPTION.RECOMMENDATIONS_WIDGET}
        listId={pageSlug === '/' ? 'home' : `landing/${pageSlug}`}
        productCardList={products}
        openBasketModal={product => openBasketModal(product)}
        addToBasket={product =>
          addToBasket(product, PATH_DESCRIPTION.RECOMMENDATIONS_WIDGET)
        }
        addToFavourites={sku => handleAddToFavourites(sku)}
        removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
        isPdp={isPdp}
        recommendationId={updatedRecommendationId}
        testId="recommendationProductsSlider"
      />
    ) : (
      <ProductGrid
        addedFrom={PATH_DESCRIPTION.RECOMMENDATIONS_WIDGET}
        listId={pageSlug === '/' ? 'home' : `landing/${pageSlug}`}
        isHome={true}
        productCardList={products}
        openBasketModal={product => openBasketModal(product)}
        addToBasket={product =>
          addToBasket(product, PATH_DESCRIPTION.RECOMMENDATIONS_WIDGET)
        }
        removeFromBasket={product => removeFromBasket(product)}
        recommendationId={updatedRecommendationId}
        addToFavourites={sku => handleAddToFavourites(sku)}
        removeFromFavourites={sku => handleRemoveFromFavourites(sku)}
        testId="recommendationProducts"
      />
    )
  }, [
    addToBasket,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    isPdp,
    isProductSlider,
    openBasketModal,
    pageSlug,
    products,
    recommendationType,
    removeFromBasket,
    selectRecommendation?.isSlider,
    thisProduct,
    updatedRecommendationId
  ])

  if (!recommendation || recommendation.items.length <= 0) return null

  return (
    <section
      className={classNames(className, 'w-full', {
        'h-50.5 sm:h-51.5 lg:h-53':
          isProductSlider || selectRecommendation?.isSlider,
        'h-64 sm:h-65 lg:h-66':
          recommendationType ===
          RECOMMENDATIONS_TYPES.FREQUENTLY_BOUGHT_TOGETHER,
        'h-30': recommendationType === RECOMMENDATIONS_TYPES.SIMILAR_PRODUCTS
      })}
      data-testid="recommendationBlock"
      {...props}
    >
      <div ref={observe}>
        {(shouldRender || loading === 'eager') && (
          <>
            {(recommendationTitle || recommendationAltTitle) &&
              recommendation &&
              products &&
              products.length > 1 && (
                <span
                  data-testid="recommendationTitle"
                  className="flex ml-0 mb-2 sm:mb-3 lg:mb-4 font-semibold text-lg lg:text-2xl"
                >
                  {recommendation.isPersonalized
                    ? recommendationTitle
                    : recommendationAltTitle}
                </span>
              )}
            {products && products.length > 1 && recommendedProducts}
            {category?.id && category?.url && (
              <div className="col-span-12 flex justify-center mt-4">
                <NextLink href={category?.url ?? ''} passHref prefetch={false}>
                  <Link
                    className={classNames('button button--secondary')}
                    icon={<NavAdd className="icon-16 button__icon--before" />}
                  >
                    {t('products.view-all')}
                  </Link>
                </NextLink>
              </div>
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
                  hasPromotionalItem={basketModalBasketItem?.hasPromotionalItem}
                  isPromotionalItemOutOfStock={
                    basketModalBasketItem?.hasPromotionalItemOutofStock
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
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity(
                  basketModalBasketItem?.product?.maxQuantity
                )}
                addToBasket={product =>
                  addToBasket(product, PATH_DESCRIPTION.CART_MODAL)
                }
                removeFromBasket={() => removeFromBasket(basketModalBasketItem)}
                wasItemError={wasItemError}
                isRemoved={isRemoved}
                changeQuantity={e => {
                  const value = +e.target.value
                  setIsTriggered(true)
                  setCurrentQuantityValue(value)
                  setQuantityChangedFrom(
                    PATH_DESCRIPTION.RECOMMENDATIONS_WIDGET
                  )
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
        )}
      </div>
    </section>
  )
}
