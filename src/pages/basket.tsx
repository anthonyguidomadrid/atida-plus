import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import classNames from 'classnames'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import {
  triggerReportCartViewed,
  triggerReportCheckoutAttempted,
  triggerReportPageViewed
} from '~domains/analytics'
import { createReduxStore, RootState } from '~domains/redux'
import {
  createOrderClearDetails,
  createPaymentMethodClearDetails,
  createPaymentMethodClearMethodCode,
  mbWayPaymentClearDetails,
  resetActiveReachedSteps,
  selectOrderErrorDetails,
  sibsMultibancoPaymentClearDetails,
  createOrderClearError,
  clearBrainTreeDetails,
  setDataClear,
  createMultiplePaymentsResetState,
  adyenPaymentResetState,
  setSelectedPaymentMethod
} from '~domains/checkout'
import { BasketHeader } from '~components/molecules/BasketHeader'
import { BasketEmpty } from '~components/molecules/BasketEmpty'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  getBasketTrigger,
  selectCurrency,
  selectIsLoading,
  selectItems,
  selectTotals,
  selectWasSuccess,
  selectNumberOfItems,
  removeFromBasketTrigger,
  changeItemQuantityTrigger,
  selectBasketCouponData,
  selectBasketDiscounts,
  selectCouponData,
  selectCartCouponData,
  resetCoupon,
  selectIsProductUnavailable,
  getBasketFulfill,
  selectQuantityError,
  selectWasError,
  resetErrorBasket,
  handleProductQuantityAction,
  selectHasPromotionalItemOutOfStock,
  selectItemError,
  selectItemIsLoading,
  selectDiscountedItems,
  selectId,
  clearItemsState,
  selectBasketDiscountsList,
  selectBasketDeliveryDays,
  selectPriceChannel
} from '~domains/basket'
import { selectItemsAnyError } from '~domains/basket/selectors/item-states'
import { BasketSummary } from '~components/molecules/BasketSummary'
import { BasketProductTile } from '~components/molecules/BasketProductTile'
import { Notification } from '~components/atoms/Notification'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Spinner } from '~assets/svg/navigation-24px/Spinner.svg'
import { clearLoginMessages, orderHistoryClearDetails } from '~domains/account'
import { ProductTileLoading } from '~components/molecules/ProductTile/ProductTileLoading'
import { selectMessages } from '~domains/account/selectors/login'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import debounce from 'lodash/debounce'
import {
  BasketItem,
  DiscountedItem,
  SessionChannelType
} from '~domains/basket/types'
import { FeatureFlag } from '~config/constants/feature-flags'
import { BasketButtonPosition } from '~config/constants/basket-button-position'
import { MAXIMUM_PRODUCT_QUANTITY } from '~config/constants/maximum-product-quantity'
import { getLoginMessage } from '~helpers/getLoginMessage'
import { NotificationModalLayout } from '~components/molecules/NotificationModalLayout'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import {
  contentTrigger,
  Product,
  selectProductData,
  setClearData,
  useFormatPrice
} from '~domains/product'
import { BasketAddOn } from '~components/molecules/BasketAddOn'
import { useBreakpoint } from '~domains/breakpoints'
import { breakpoints } from '~domains/breakpoints/config'
import { StickyMobileCTA } from '~components/atoms/StickyMobileCTA'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { FreeShippingNotification } from '~components/atoms/FreeShippingNotification'
import { cookieStorageMechanism, logger } from '~helpers'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import {
  selectCustomerReference,
  selectDefaultShippingAddressIsTaxExempt,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { ReactComponent as Warning } from '~assets/svg/navigation-24px/Warning.svg'
import { useHandleAddToFavourites } from '~helpers/useHandleAddToFavourites'
import { useHandleRemoveFromFavourites } from '~helpers/useHandleRemoveFromFavourites'
import { LoyaltyLoginCTABasket } from '~components/atoms/LoyaltyLoginCTABasket/LoyaltyLoginCTABasket'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'

type freeShippingRank = {
  limit: number
  skus: string[]
}[]

const Basket: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { locale, push } = router
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const wasSuccess = useSelector(selectWasSuccess)
  const wasError = useSelector(selectWasError)
  const items = useSelector(selectItems)
  const currency = useSelector(selectCurrency)
  const totals = useSelector(selectTotals)
  const numberOfItems = useSelector(selectNumberOfItems)
  const couponData = useSelector(selectCouponData)
  const basketCouponData = useSelector(selectBasketCouponData)
  const basketDiscounts = useSelector(selectBasketDiscounts)
  const cartCoupons = useSelector(selectCartCouponData)
  const createOrderError = useSelector(selectOrderErrorDetails)
  const productContent = useSelector(selectProductData)
  const discountedProducts = useSelector(selectDiscountedItems)
  const cartId = useSelector(selectId)
  const customerReference = useSelector(selectCustomerReference)
  const isTaxExempt = useSelector(selectDefaultShippingAddressIsTaxExempt)
  const shippingThreshold = totals?.freeShippingThreshold
  const itemsStateError = useSelector(selectItemsAnyError)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const basketDiscountsList = useSelector(selectBasketDiscountsList)
  const basketDeliveryDays = useSelector(selectBasketDeliveryDays)
  const priceChannel = useSelector(selectPriceChannel)
  const formatPrice = useFormatPrice()
  const hasOnlyPrescriptionItems = useMemo(
    () => items.every(item => item.isPrescription),
    [items]
  )

  const scrollToTopIsEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_SCROLL_TO_TOP_BASKET_PAGE
  )

  // Prevent scrolling to the footer when visiting the basket
  useEffect(() => {
    //TODO: Remove FF once proven on all environments
    scrollToTopIsEnabled && window.scrollTo(0, 0)
  }, [scrollToTopIsEnabled])

  const hasPromotionalItemOutOfStock = useSelector(
    selectHasPromotionalItemOutOfStock
  )
  const orderNotAvailableItems = useMemo(
    () =>
      typeof createOrderError !== 'string'
        ? createOrderError?.not_available_items
        : [],
    [createOrderError]
  )
  const basketQuantityError = useSelector(selectQuantityError)
  const loginMessage = useSelector(selectMessages)
  const loginMessageValue = getLoginMessage(loginMessage?.[0]?.value ?? '')
  const isDesktopFormat = useBreakpoint(breakpoints.md)
  const isNotMobile = useBreakpoint(breakpoints.sm)
  const payButtonRef = useRef<HTMLDivElement>(null)

  const freeShippingRanks: freeShippingRank = useFeatureFlag(
    FeatureFlag.BASKET_FREE_SHIPPING_PRODUCTS
  ) as freeShippingRank

  const isBasketErrorNotificationEnabled = useFeatureFlag(
    FeatureFlag.BASKET_ERROR_NOTIFICATION
  )

  const isNewRelicEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC
  )

  const isPromotionalItemsPriceZeroEnabled = useFeatureFlag(
    FeatureFlag.BASKET_PROMOTIONAL_ITEMS_PRICE_ZERO
  )

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const atidaWelcomeCashDiscount = useFeatureFlag(
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY
  ) as string

  const [addOnProduct, setAddOnProduct] = useState<Product | undefined>(
    undefined
  )

  const [discountedProduct, setDiscountedProduct] = useState<
    DiscountedItem | undefined
  >(undefined)

  const addOnProductError = useSelector<
    RootState,
    ReturnType<typeof selectItemError>
  >(state =>
    selectItemError(state, {
      sku: addOnProduct?.sku ?? undefined
    })
  )

  const addOnProductLoading = useSelector<
    RootState,
    ReturnType<typeof selectItemIsLoading>
  >(state =>
    selectItemIsLoading(state, {
      sku: addOnProduct?.sku ?? undefined
    })
  )

  const [notificationModalOpen, setNotificationModalOpen] = useState(false)
  const [promotionalItem, setPromotionalItem] = useState<{
    sku: string
    id: string
  }>({
    sku: '',
    id: ''
  })

  const welcomeCashDiscount = basketDiscountsList?.find(discount =>
    discount.discountKey?.includes(atidaWelcomeCashDiscount)
  )
  const noWelcomeCashDiscounts = basketDiscountsList
    ?.filter(
      discounts => !discounts.discountKey?.includes(atidaWelcomeCashDiscount)
    )
    .reduce((sum, item) => {
      return sum + item?.amount
    }, 0)

  const [usedCoupon, setUsedCoupon] = useState<string>('')
  const [currentQuantityValue, setCurrentQuantityValue] = useState(0)
  const [currentItemSku, setCurrentItemSku] = useState('')
  const inputRef = useRef<Record<string, HTMLInputElement>>({})
  const couponAccordionRef = useRef<HTMLDetailsElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isTriggered, setIsTriggered] = useState(false)
  const [displayFreeShippingProduct, setDisplayFreeShippingProduct] = useState(
    true
  )
  const [quantityChangedFrom, setQuantityChangedFrom] = useState('')
  const [
    isWelcomeCashNotificationOpen,
    setIsWelcomeCashNotificationOpen
  ] = useState(true)

  const store = useStore<RootState>()
  const basketCouponsAmount =
    basketCouponData &&
    basketCouponData.reduce((a, b) => a + (b.amount ?? 0), 0)
  const unavailableProducts = useMemo(
    () =>
      items.filter(
        ({ product }) => product?.availability === 'NOT_AVAILABLE'
      ) || [],
    [items]
  )
  const unavailablePromotionalItems = useMemo(
    () => unavailableProducts.filter(item => item?.isPromo),
    [unavailableProducts]
  )
  const unavailableSellableItems = useMemo(
    () => unavailableProducts.filter(item => !item?.isPromo),
    [unavailableProducts]
  )
  const isAnyItemOnDemand = useMemo(
    () => items.some(({ product }) => product.isOnDemand),
    [items]
  )
  const discountedProductsNotInBasket = useMemo(
    () =>
      discountedProducts?.filter(
        ({ sku }) => !items.find(item => item.sku === sku)
      ),
    [discountedProducts, items]
  )
  let count = 0
  unavailableProducts.map(({ quantity }) => {
    if (quantity) count = count + quantity
  })
  const [showLoadingState, setShowLoadingState] = useState(false)

  const [currentRank, setCurrentRank] = useState<{
    limit: number
    skus: string[]
  }>({
    limit: 0,
    skus: []
  })
  const sessionChannel = useMemo(() => {
    const sessionChannelCookie = cookieStorageMechanism().get(
      getSessionChannelName()
    )
    if (!sessionChannelCookie || sessionChannelCookie === '') return undefined
    return JSON.parse(sessionChannelCookie) as SessionChannelType
  }, [])

  const [randomRankSku, setRandomRankSku] = useState(0)
  const [loggedProductUnavailable, setLoggedProductUnavailable] = useState(true)

  const [isOrderFirstItemUnavailable, setOrderFirstItemUnavailable] = useState(
    false
  )
  const isGiftOutOfStockNotificationDisplayable =
    (unavailablePromotionalItems?.length > 0 &&
      !hasPromotionalItemOutOfStock) ||
    (hasPromotionalItemOutOfStock && isDesktopFormat)

  const [currentRender, setCurrentRender] = useState(false)
  useEffect(() => {
    if (!currentRender) {
      dispatch(clearItemsState())
      setCurrentRender(true)
    }
  }, [currentRender, dispatch])

  useEffect(() => {
    if (productContent) setAddOnProduct(productContent)
  }, [productContent])

  useEffect(() => {
    if (typeof freeShippingRanks === 'object' && freeShippingRanks.length > 0) {
      const currentRank = freeShippingRanks.find(
        rank =>
          rank?.limit * 100 >
          totals?.subTotal -
            ((basketDiscounts ?? 0) + (basketCouponsAmount ?? 0))
      )
      currentRank && setCurrentRank(currentRank)
    }
  }, [
    basketCouponsAmount,
    basketDiscounts,
    currentRank,
    freeShippingRanks,
    totals?.subTotal
  ])

  useEffect(() => {
    if (currentRank) {
      setRandomRankSku(Math.floor(Math.random() * currentRank?.skus?.length))
    }
  }, [currentRank])

  useEffect(() => {
    if (displayFreeShippingProduct) {
      dispatch(setClearData())
      // We set the discountedProduct to be undefined, so when the displayFreeShippingProduct is falsy, then the next useEffect will be executed
      setDiscountedProduct(undefined)
      const skusInBasket = items.map(item => item.sku)
      const skusInCurrentRank =
        currentRank &&
        currentRank?.skus?.filter(sku => !skusInBasket.includes(sku))
      if (skusInCurrentRank) {
        const randomSku = skusInCurrentRank[randomRankSku]
        randomSku &&
          dispatch(contentTrigger({ sku: randomSku, sessionChannel }))
      }
    }
  }, [
    currentRank,
    dispatch,
    items,
    randomRankSku,
    displayFreeShippingProduct,
    sessionChannel
  ])

  useEffect(() => {
    if (discountedProductsNotInBasket?.length && !discountedProduct) {
      const randomProduct =
        discountedProductsNotInBasket?.[
          Math.floor(Math.random() * discountedProductsNotInBasket?.length)
        ]
      setDiscountedProduct(randomProduct)
      dispatch(contentTrigger({ sku: randomProduct?.sku, sessionChannel }))
    }
  }, [
    discountedProduct,
    discountedProductsNotInBasket,
    sessionChannel,
    dispatch
  ])

  useEffect(() => {
    if (addOnProduct?.availability === 'NOT_AVAILABLE') {
      if (
        discountedProductsNotInBasket?.length &&
        !displayFreeShippingProduct
      ) {
        const index = discountedProductsNotInBasket.findIndex(
          ({ sku }) => sku === addOnProduct?.sku
        )
        index > -1 && discountedProductsNotInBasket.splice(index, 1)
        setDiscountedProduct(undefined)
      }
      setAddOnProduct(undefined)
    }
  }, [addOnProduct, discountedProductsNotInBasket, displayFreeShippingProduct])

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
    if (!currentQuantityValue && currentItemSku) {
      const product = items.find(item => item.sku === currentItemSku)
      setCurrentQuantityValue(product?.quantity ?? 0)
    }
  }, [currentQuantityValue, currentItemSku, items])

  useEffect(() => {
    if (currentItemSku && currentQuantityValue && isTriggered) {
      const basketItem = items.find(
        item => item.sku === currentItemSku && !item.isPromo
      )
      const maxProductQuantity =
        basketItem?.product?.maxQuantity &&
        basketItem?.product?.maxQuantity < MAXIMUM_PRODUCT_QUANTITY
          ? basketItem?.product.maxQuantity
          : MAXIMUM_PRODUCT_QUANTITY
      setIsTriggered(false)
      changeItemQuantityRequest(
        currentQuantityValue > maxProductQuantity
          ? maxProductQuantity
          : currentQuantityValue,
        currentItemSku,
        basketItem?.id,
        quantityChangedFrom
      )
      if (
        inputRef?.current &&
        inputRef.current[currentItemSku] &&
        inputRef.current[currentItemSku].value
      ) {
        inputRef.current[currentItemSku].value =
          currentQuantityValue > maxProductQuantity
            ? maxProductQuantity.toString()
            : currentQuantityValue?.toString() ?? ''
      }
    }
  }, [
    currentQuantityValue,
    currentItemSku,
    changeItemQuantityRequest,
    isTriggered,
    quantityChangedFrom,
    items
  ])

  useEffect(() => {
    if (
      couponData &&
      couponData.length > 0 &&
      loginMessage &&
      loginMessage.length > 0 &&
      (basketCouponData?.length === 0 || !basketCouponData)
    ) {
      setUsedCoupon(couponData?.[0].code ?? '')
    }
    if (!loginMessage || (basketCouponData && basketCouponData?.length > 0)) {
      setUsedCoupon('')
    }
  }, [couponData, loginMessage, basketCouponData])

  const [
    quantityUnavailableItems,
    setQuantityUnavailableItems
  ] = useState<Record<string, number> | null>(null)

  const handleAddToFavourites = useHandleAddToFavourites(router)
  const handleRemoveFromFavourites = useHandleRemoveFromFavourites(router)

  useEffect(() => {
    if (basketQuantityError) {
      setCurrentQuantityValue(basketQuantityError.available_qty)
      if (
        inputRef?.current &&
        inputRef.current[currentItemSku] &&
        inputRef.current[currentItemSku].value
      ) {
        inputRef.current[
          currentItemSku
        ].value = basketQuantityError.available_qty.toString()
      }
      setQuantityUnavailableItems(prevItems => {
        return {
          ...prevItems,
          [basketQuantityError.sku]: basketQuantityError.available_qty
        }
      })
    }
  }, [basketQuantityError, setQuantityUnavailableItems, currentItemSku])

  useEffect(() => {
    if (orderNotAvailableItems) {
      orderNotAvailableItems.forEach(item => {
        const basketItem = items.find(
          basketItem => basketItem.sku === item?.sku
        )
        dispatch(
          changeItemQuantityTrigger({
            id: basketItem?.id,
            sku: item?.sku,
            quantity: item?.available_qty
          })
        )
      })
    }
    if (basketQuantityError) {
      const basketItem = items.find(
        basketItem => basketItem.sku === basketQuantityError?.sku
      )
      dispatch(
        changeItemQuantityTrigger({
          id: basketItem?.id,
          sku: basketQuantityError?.sku,
          quantity: basketQuantityError?.available_qty ?? 0
        })
      )
    }
  }, [
    dispatch,
    basketQuantityError,
    basketQuantityError?.available_qty,
    orderNotAvailableItems,
    items
  ])

  useEffect(() => {
    dispatch(getBasketTrigger({ force: true }))
  }, [dispatch])

  useEffect(() => {
    if (!items.length) {
      dispatch(resetCoupon())
    }
  }, [dispatch, items])

  useEffect(() => {
    wasError && setShowLoadingState(false)
  }, [wasError])

  useEffect(() => {
    if (totals.shippingTotal === 0) {
      setDisplayFreeShippingProduct(false)
    } else {
      setDisplayFreeShippingProduct(true)
    }
  }, [totals.shippingTotal])

  const removeProductFromBasket = useCallback(
    (sku: string, id: string) => {
      dispatch(
        removeFromBasketTrigger({
          sku,
          id,
          removed_from: PATH_DESCRIPTION.BASKET
        })
      )
      dispatch(handleProductQuantityAction(true))
      setCurrentQuantityValue(0)
    },
    [dispatch]
  )

  const handleRemoveFromBasket = useCallback(
    (product: BasketItem) => {
      if (product && product.sku && product.id) {
        if (product.isPromo && product.isFullyDiscounted) {
          setNotificationModalOpen(true)
          setPromotionalItem({ sku: product.sku, id: product.id })
          return
        }
        removeProductFromBasket(product.sku, product.id)
      }
    },
    [removeProductFromBasket]
  )

  const handleNotificationModalClose = useCallback(() => {
    setNotificationModalOpen(false)
  }, [])

  const confirmRemoveProduct = useCallback(() => {
    removeProductFromBasket(promotionalItem.sku, promotionalItem.id)
    setNotificationModalOpen(false)
  }, [promotionalItem.id, promotionalItem.sku, removeProductFromBasket])

  const decreaseProductQuantity = useCallback(async (product: BasketItem) => {
    setCurrentItemSku(product.sku ?? '')
    if (product && product.quantity && product.quantity > 0) {
      setCurrentQuantityValue(product.quantity)
    }
    setIsTriggered(true)
    setCurrentQuantityValue(v => v - 1)
    setQuantityChangedFrom(PATH_DESCRIPTION.BASKET)
  }, [])

  useEffect(() => {
    setQuantityUnavailableItems(null)
    // Reset all checkout steps when we load the basket
    // This is needed for when a user goes back from the checkout page to the website
    // and when they come back to the checkout, it will remember the step they were on,
    // while also starting on the first step without anything selected.
    // With this dispatched event, it will fix this behavior and the user will have their steps reset
    dispatch(resetActiveReachedSteps())
  }, [dispatch])

  useEffect(() => {
    if (isBasketErrorNotificationEnabled && itemsStateError) {
      const basketNotificationError = document.getElementById(
        'basket-error-notification'
      )
      if (basketNotificationError && window) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }, [isBasketErrorNotificationEnabled, isDesktopFormat, itemsStateError])

  useEffect(() => {
    if (
      isNewRelicEnabled &&
      unavailableProducts?.length &&
      wasSuccess &&
      isLoading &&
      loggedProductUnavailable
    ) {
      unavailableProducts.map(item =>
        logger.error(
          {
            message: 'product in basket is not available',
            name: 'basket Product Tile Availability'
          },
          JSON.stringify({
            sku: item?.sku,
            name: item?.product?.name,
            isPromo: item?.isPromo,
            cartId,
            customerRef: customerReference
          })
        )
      )
      setLoggedProductUnavailable(false)
    }
  }, [
    isNewRelicEnabled,
    unavailableProducts,
    wasSuccess,
    isLoading,
    loggedProductUnavailable,
    cartId,
    customerReference
  ])

  const handleOrder = useCallback(
    async (position: BasketButtonPosition) => {
      dispatch(resetErrorBasket())
      setShowLoadingState(true)
      dispatch(getBasketTrigger({ force: true }))
      await dispatch({
        type: 'basket',
        [WAIT_FOR_ACTION]: getBasketFulfill().type
      })
      const isProductUnavailable = selectIsProductUnavailable(store.getState())
      dispatch(triggerReportCheckoutAttempted({ position }))
      if (!isProductUnavailable) {
        push('/checkout')
        dispatch(createOrderClearError())
        dispatch(clearLoginMessages())
        dispatch(createPaymentMethodClearDetails())
        dispatch(mbWayPaymentClearDetails())
        dispatch(sibsMultibancoPaymentClearDetails())
        dispatch(createMultiplePaymentsResetState())
        dispatch(createOrderClearDetails())
        dispatch(createPaymentMethodClearMethodCode())
        dispatch(orderHistoryClearDetails())
        dispatch(clearBrainTreeDetails())
        dispatch(setDataClear())
        dispatch(adyenPaymentResetState())
        dispatch(setSelectedPaymentMethod(''))
      } else {
        setShowLoadingState(false)
      }
    },
    [dispatch, push, store]
  )

  useEffect(() => {
    dispatch(triggerReportPageViewed({ page: 'Basket', pageType: 'shopping' }))
    dispatch(triggerReportCartViewed())
  }, [dispatch])

  const displayGiftOutOfStockNotification = useCallback(
    (className: string) => {
      return (
        <Notification
          closeIcon={false}
          type="warning"
          title={
            !!hasPromotionalItemOutOfStock
              ? t('promotional-item.availability.warning.block-title.coupon')
              : t('promotional-item.availability.warning.block-title')
          }
          content={
            !!hasPromotionalItemOutOfStock
              ? t(
                  'promotional-item.availability.warning.block-description.coupon'
                )
              : t('promotional-item.availability.warning.block-description')
          }
          className={className}
        />
      )
    },
    [hasPromotionalItemOutOfStock, t]
  )

  const handleCouponAccordion = useCallback(
    (
      childRef: HTMLDetailsElement | null,
      parentRef: HTMLButtonElement | null
    ) => {
      if (childRef && parentRef && window) {
        window.scrollTo({
          top: childRef.offsetTop - parentRef.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
        childRef.open = true
      }
    },
    []
  )

  return (
    <>
      <MetaData title={t('seo.titles.basket')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('basket', locale)} />
      <main className="min-h-screen-80 flex flex-col mb-6 sm:mb-8 md:mb-9 lg:mb-12">
        {items.length === 0 && isLoading && (
          <span role="presentation" className="button__loading">
            <Spinner />
          </span>
        )}
        {(wasSuccess || showLoadingState) && (
          <>
            <BasketHeader
              numberOfItems={numberOfItems}
              total={{
                currency: currency,
                value: totals.grandTotal
              }}
              className="grow-0 shrink-0"
              unavailableProducts={unavailableProducts}
              onOrderClick={() => handleOrder(BasketButtonPosition.TOP)}
              isLoading={showLoadingState}
            />

            <NotificationModalLayout
              isOpen={notificationModalOpen}
              variant="center"
              isFixedPosition
              isBasketNotification={true}
              children={
                <div className=" xs:text-center xs:text-base">
                  <p className="mb-0.5">
                    <b>{t('basket.promotional-item.notification.title')}</b>
                  </p>
                  <p className="xs:mb-2">
                    {t('basket.promotional-item.notification.description')}
                  </p>
                </div>
              }
              handleClose={handleNotificationModalClose}
              handleConfirm={confirmRemoveProduct}
              showIcon={false}
              confirmButtonLabel={t(
                'basket.promotional-item.notification.confirm-button-label'
              )}
              closeButtonLabel={t(
                'basket.promotional-item.notification.cancel-button-label'
              )}
            ></NotificationModalLayout>
            {items.length === 0 ? (
              <BasketEmpty className="grow justify-center" />
            ) : (
              <div
                id="basket-error-notification"
                className={classNames(
                  'sm:container sm:container-fixed sm:mx-auto',
                  'md:grid md:grid-col md:grid-cols-sidebar-right md:gap-2 md:mt-5 md:items-start'
                )}
              >
                <div>
                  {loginMessage &&
                    loginMessage.length > 0 &&
                    //We check only loginMessageValue.title and not loginMessageValue.content because if title is '', then content is also ''
                    loginMessageValue.title && (
                      <Notification
                        type="warning"
                        title={t(loginMessageValue.title)}
                        content={t(loginMessageValue.content)}
                        className={classNames('p-2 mb-2 mx-2 sm:mx-0')}
                      />
                    )}
                  {unavailableSellableItems?.length > 0 && (
                    <Notification
                      closeIcon={false}
                      type={'warning'}
                      title={
                        count == 1
                          ? t('basket.out-of-stock.title_singular')
                          : t('basket.out-of-stock.title_plural', { count })
                      }
                      content={
                        count == 1
                          ? t('basket.out-of-stock.message_singular')
                          : t('basket.out-of-stock.message_plural')
                      }
                      className={classNames('p-2 mb-2 mx-2 sm:mx-0')}
                    />
                  )}
                  {isGiftOutOfStockNotificationDisplayable &&
                    displayGiftOutOfStockNotification(
                      'mb-2 xs-only:mx-2 md:mb-3 lg:mb-2 p-2'
                    )}
                  {!isBasketErrorNotificationEnabled &&
                    addOnProductError &&
                    addOnProductError.includes('add-to-basket') && (
                      <Notification
                        closeIcon={false}
                        type={'error'}
                        title="basket.add-to-basket.unexpected-error-title"
                        content={`${addOnProductError}`}
                        className={classNames('p-2 mb-2 mx-2 sm:mx-0')}
                      />
                    )}
                  {isBasketErrorNotificationEnabled && itemsStateError && (
                    <Notification
                      closeIcon={false}
                      type={'error'}
                      title="basket.unexpected-error-title"
                      content={'basket.unexpected-error-content'}
                      className={classNames('p-2 mb-2 mx-2 sm:mx-0')}
                      id="basket-error-notification"
                    />
                  )}
                  {atidaWelcomeCashDiscount &&
                    welcomeCashDiscount &&
                    isWelcomeCashNotificationOpen && (
                      <Notification
                        closeIcon={true}
                        type={'success'}
                        title={t('basket.welcome-atida-cash.discount-title', {
                          welcomeCash: priceCurrencyFormatter(
                            formatPrice(welcomeCashDiscount.amount, currency)
                              .asOne,
                            currency,
                            true
                          )
                        })}
                        className={
                          'p-2 mx-2 mt-2 sm:mt-4 sm:mx-0 md:mb-3 md:mt-0'
                        }
                        id="basket-success-notification"
                        handleClose={() =>
                          setIsWelcomeCashNotificationOpen(false)
                        }
                      />
                    )}
                  {/* This notification will be displayed on large screens only if there is no other availability notifications, displayed about out of stock gift or sellable items*/}
                  {isAnyItemOnDemand &&
                    !isGiftOutOfStockNotificationDisplayable &&
                    !unavailableSellableItems?.length && (
                      <Notification
                        closeIcon={false}
                        type={'delivery-info'}
                        title={t(
                          'basket.on-demand-product.notification-title',
                          {
                            minDeliveryDays:
                              basketDeliveryDays?.minDeliveryDays ?? 5,
                            maxDeliveryDays:
                              basketDeliveryDays?.maxDeliveryDays ?? 7
                          }
                        )}
                        content={t(
                          'basket.on-demand-product.notification-content'
                        )}
                        className={classNames(
                          'pb-2.25 pt-1.5 sm:pt-1 md:pb-2 md:pt-1.75 -mb-1 md:mb-4 mx-2 sm:mx-0 mt-3 md:mt-0'
                        )}
                      />
                    )}
                  <div
                    id="testCouponDiv"
                    className="container container-fixed mt-2 sm:hidden"
                  >
                    <button
                      id="testCoupon"
                      className="text-lg underline py-1"
                      ref={buttonRef}
                      onClick={() =>
                        handleCouponAccordion(
                          couponAccordionRef.current,
                          buttonRef.current
                        )
                      }
                    >
                      {t('basket.coupon.anchor.mobile')}
                    </button>
                  </div>
                  <ul
                    className={classNames(
                      'divide-y divide-ui-grey-lightest',
                      {
                        'border-b border-ui-grey-lightest': !isLoading,
                        'border-t': !isOrderFirstItemUnavailable && !isLoading
                      },
                      'mt-3 mb-4 sm:my-5 md:my-0'
                    )}
                  >
                    {items.length > 0 &&
                      items.map((item, idx) => {
                        const orderUnavailableItem = orderNotAvailableItems?.find(
                          unavailableItem =>
                            unavailableItem.sku.toString() === item.sku
                        )
                        if (
                          idx === 0 &&
                          orderUnavailableItem &&
                          !isOrderFirstItemUnavailable
                        ) {
                          setOrderFirstItemUnavailable(true)
                        }
                        const quantityUnavailableItem =
                          quantityUnavailableItems?.[item?.sku ?? '']
                        return (
                          <>
                            {orderUnavailableItem && !isLoading && (
                              <div>
                                <Notification
                                  type={'warning'}
                                  title="product.availability.warning.block-title"
                                  className={classNames(
                                    'p-2 mb-2 mx-2 sm:mx-0',
                                    {
                                      'mt-2': idx > 0
                                    }
                                  )}
                                >
                                  <p>
                                    (
                                    {t(
                                      'product.availability.warning.block-description-1'
                                    )}{' '}
                                    <span className="font-semibold">
                                      {item?.product.name || ''}{' '}
                                    </span>
                                    {t(
                                      'product.availability.warning.block-description-2'
                                    )}{' '}
                                    <span className="font-semibold">
                                      {orderUnavailableItem?.available_qty}
                                    </span>
                                    .)
                                  </p>
                                </Notification>
                              </div>
                            )}

                            <li
                              key={item.sku}
                              className="py-2 sm:py-3 xs-only:container"
                            >
                              {item.product.availability === 'NOT_AVAILABLE' &&
                                items.length > 1 && (
                                  <div className=" w-full flex flex-col bg-feedback-warning-light px-3 py-2 mb-2 sm:mx-0 ">
                                    <div className="mr-2 flex items-center">
                                      <Warning className="icon-24 text-feedback-warning" />
                                      <p className="font-body text-base font-medium text-feedback-warning ml-2">
                                        {t('basket.product-out-of-stock')}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              {isLoading && !showLoadingState ? (
                                <ProductTileLoading
                                  className={'sm:h-29'}
                                  noBorder={items.length >= 2 ?? true}
                                />
                              ) : (
                                <BasketProductTile
                                  product={item.product as Product}
                                  sku={item.sku}
                                  idx={idx}
                                  name={item.product.name}
                                  url={item.product.url}
                                  availability={item.product.availability}
                                  quantity={item.quantity ?? 0}
                                  format={item.product.format}
                                  unitVolume={item.product.unitVolume}
                                  family={item.product.family}
                                  inputRef={(input: HTMLInputElement) => {
                                    if (item.sku && input)
                                      inputRef.current[item.sku] = input
                                  }}
                                  inputValue={
                                    item.sku &&
                                    inputRef.current[item.sku]?.value
                                  }
                                  contentSizeFactor={
                                    item.product.contentSizeFactor
                                  }
                                  price={{
                                    currency,
                                    value:
                                      isPromotionalItemsPriceZeroEnabled &&
                                      item.isPromo &&
                                      item.isFullyDiscounted
                                        ? 0
                                        : item.isPromo &&
                                          !item.isFullyDiscounted
                                        ? item.unitPriceToPayAggregation
                                        : item.subtotal
                                  }}
                                  rrp={{
                                    currency,
                                    value:
                                      isPromotionalItemsPriceZeroEnabled &&
                                      item.isPromo &&
                                      item.isFullyDiscounted
                                        ? 0
                                        : item.product.rrp?.value
                                  }}
                                  labels={item.product.labels}
                                  availableQty={
                                    orderUnavailableItem?.available_qty ??
                                    quantityUnavailableItem
                                  }
                                  handleRemoveItem={() =>
                                    handleRemoveFromBasket(item)
                                  }
                                  handleChangeQuantity={e => {
                                    const value = +e.target.value
                                    if (item && item.sku) {
                                      setCurrentItemSku(item.sku)
                                      setCurrentQuantityValue(value)
                                      setIsTriggered(true)
                                    }
                                  }}
                                  increaseQuantity={() => {
                                    setCurrentItemSku(item.sku ?? '')
                                    if (
                                      item &&
                                      item.product &&
                                      item.quantity &&
                                      item.quantity > 0
                                    ) {
                                      setCurrentQuantityValue(item.quantity)
                                    }
                                    setCurrentQuantityValue(v => v + 1)
                                    setIsTriggered(true)
                                    setQuantityChangedFrom(
                                      PATH_DESCRIPTION.BASKET
                                    )
                                  }}
                                  decreaseQuantity={() =>
                                    decreaseProductQuantity(item)
                                  }
                                  // TODO: alt text needs improving
                                  image={{
                                    url: item.product.thumbnailImage,
                                    description: `Image of ${item.product.name}`
                                  }}
                                  className="container sm:px-0"
                                  isPromo={item.isPromo}
                                  maxQuantity={
                                    item.product.maxQuantity ??
                                    MAXIMUM_PRODUCT_QUANTITY
                                  }
                                  addToFavourites={() =>
                                    handleAddToFavourites(String(item.sku))
                                  }
                                  removeFromFavourites={() =>
                                    handleRemoveFromFavourites(String(item.sku))
                                  }
                                  addedFrom={PATH_DESCRIPTION.BASKET}
                                  isOnDemand={item?.product?.isOnDemand}
                                  basketDeliveryDays={basketDeliveryDays}
                                />
                              )}
                            </li>
                          </>
                        )
                      })}
                  </ul>
                  {isLoyaltyAtidaCashEnabled &&
                    !isLoggedIn &&
                    isDesktopFormat &&
                    currency &&
                    !!totals?.rewardTotal && (
                      <LoyaltyLoginCTABasket
                        currency={currency}
                        rewardTotal={totals?.rewardTotal}
                      />
                    )}
                </div>
                <div>
                  {!displayFreeShippingProduct && isNotMobile && (
                    <FreeShippingNotification
                      hasReachedFreeShipping={true}
                      className="bg-ui-carribean-green-lightest mb-2 p-2"
                      icon={
                        <Checkmark className="icon-24 text-labels-campaign-green mr-1" />
                      }
                    />
                  )}
                  {addOnProduct &&
                    addOnProduct?.availability === 'AVAILABLE' &&
                    typeof freeShippingRanks === 'object' &&
                    freeShippingRanks.length > 0 &&
                    displayFreeShippingProduct &&
                    totals.subTotal < shippingThreshold && (
                      <BasketAddOn
                        product={addOnProduct}
                        isProductLoading={addOnProductLoading}
                      />
                    )}
                  {addOnProduct &&
                    addOnProduct.availability === 'AVAILABLE' &&
                    !!discountedProductsNotInBasket?.length &&
                    ((!displayFreeShippingProduct &&
                      totals.subTotal >= shippingThreshold) ||
                      isTaxExempt) && (
                      <BasketAddOn
                        product={addOnProduct}
                        isProductLoading={addOnProductLoading}
                        discountPercentage={
                          discountedProduct?.discountPercentage
                        }
                        idPromotionalItem={
                          discountedProduct?.id_promotional_item
                        }
                        isDiscountedItem={true}
                        setDiscountedProduct={setDiscountedProduct}
                      />
                    )}
                  {hasPromotionalItemOutOfStock &&
                    !isDesktopFormat &&
                    displayGiftOutOfStockNotification(
                      'xs:mb-3 sm:mb-4 p-2 xs:mt-3 sm:mt-4 xs-only:mx-2.5'
                    )}
                  {isLoyaltyAtidaCashEnabled &&
                    !isLoggedIn &&
                    !isDesktopFormat &&
                    currency &&
                    !!totals?.rewardTotal && (
                      <LoyaltyLoginCTABasket
                        currency={currency}
                        rewardTotal={totals?.rewardTotal}
                      />
                    )}
                  <BasketSummary
                    priceChannel={priceChannel}
                    basketCouponData={basketCouponData}
                    couponDiscounts={basketCouponsAmount}
                    basketDiscounts={noWelcomeCashDiscounts}
                    welcomeAtidaCashDiscount={welcomeCashDiscount?.amount}
                    numberOfItems={numberOfItems}
                    currency={currency}
                    subTotalPrice={totals.rrpTotal}
                    itemTotal={totals.itemTotal}
                    totalProducts={totals.grandTotal}
                    surchargeTotal={totals.surchargeTotal}
                    shipping={totals.shippingTotal}
                    grandTotal={totals.grandTotal}
                    unavailableProducts={unavailableProducts}
                    payButtonRef={payButtonRef}
                    onOrderClick={() =>
                      handleOrder(BasketButtonPosition.BOTTOM)
                    }
                    isLoading={showLoadingState}
                    couponAccordionRef={couponAccordionRef}
                    cartCoupons={cartCoupons}
                    usedCoupon={usedCoupon}
                    hasPromotionalItemOutOfStock={hasPromotionalItemOutOfStock}
                    rrpDiscountTotal={totals.rrpDiscountTotal}
                    rewardTotal={totals?.rewardTotal}
                    hasOnlyPrescriptionItems={hasOnlyPrescriptionItems}
                  />
                </div>
                <StickyMobileCTA
                  grandTotal={totals.grandTotal}
                  currency={currency}
                  isDisabled={
                    unavailableProducts && !!unavailableProducts.length
                  }
                  handleSubmit={() => handleOrder(BasketButtonPosition.STICKY)}
                  isLoading={showLoadingState}
                  hasReachedFreeShipping={totals?.shippingTotal === 0}
                  payButtonRef={payButtonRef}
                />
              </div>
            )}
          </>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.BASKET_FREE_SHIPPING_PRODUCTS,
    FeatureFlag.NAVIGATION_SCROLL_TO_TOP_BASKET_PAGE,
    FeatureFlag.BASKET_PROMOTIONAL_ITEMS_PRICE_ZERO,
    FeatureFlag.BASKET_ERROR_NOTIFICATION,
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH,
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default Basket
