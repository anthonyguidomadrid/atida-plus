import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import classNames from 'classnames'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { Button } from '~components/atoms/Button'
import {
  setDataTrigger,
  adyenPaymentMethodsTrigger,
  selectActiveStep,
  setActiveStep,
  selectDeliveryMethod,
  selectDeliveryAddress,
  selectBillingAddress,
  selectWasSuccess,
  selectError,
  selectWasAnyPaymentStepError,
  selectShipmentMethods,
  createPaymentMethodClearDetails,
  createOrderResetState,
  selectOrderError,
  mbWayPaymentClearDetails,
  sibsMultibancoPaymentClearDetails,
  selectCreateOrderWasError,
  selectIsAnyPaymentLoading,
  selectCreateOrderIsLoading,
  selectOrderId,
  selectOrderErrorDetails,
  selectErrorMessage,
  selectDeliveryDays,
  setDataFulfill,
  selectWasError,
  selectWasLoading,
  setGuestStep,
  setIsPaymentStepActive,
  selectGuestStep,
  selectIsBillingSameAsShipping,
  selectTaxReference,
  selectIsTaxExempt,
  selectAdyenPaymentMethodsAllowedPaymentMethods,
  adyenPaymentResetState,
  selectAtidaCashAmount,
  selectPaymentMethods,
  selectAtidaCashUsed,
  createMultiplePaymentsResetState,
  selectAdyenError,
  selectMultiplePaymentsError,
  adyenPaymentDetailsResetState,
  setIsPaymentPending
} from '~domains/checkout'
import {
  selectIsBasketEmpty,
  selectWasSuccess as selectBasketWasSuccess,
  selectCurrency,
  selectTotals,
  selectNumberOfItems,
  selectDiscountTotal,
  selectBasketCouponData,
  selectItems,
  selectIsProductUnavailable,
  getBasketTrigger,
  removeCouponTrigger,
  removeCouponFulfill,
  selectBasketDiscountsList
} from '~domains/basket'
import { getAlternateLinks } from '~domains/translated-routes'
import {
  triggerReportCheckoutStarted,
  triggerReportCheckoutStepCompleted,
  triggerReportCheckoutStepViewed,
  triggerReportPageViewed,
  triggerReportGuestDetailsEntered,
  triggerReportMissingAddressCheckoutPageViewed,
  triggerReportGuestDetailsPageViewed
} from '~domains/analytics'
import { clearStateErrors, createReduxStore } from '~domains/redux'
import {
  pageContentFulfill,
  pageContentTrigger,
  selectContent
} from '~domains/page'
import { DeliveryMethodGroup } from '~components/molecules/DeliveryMethodGroup'
import { DeliveryMethod } from '~components/atoms/DeliveryMethod'
import { PaymentMethodGroup } from '~components/molecules/PaymentMethodGroup'
import { PaymentMethod } from '~components/atoms/PaymentMethod'
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { getPaymentMethods } from '~domains/checkout/config/payment-methods'
import { useDispatch, useSelector } from 'react-redux'
import { BraintreePaymentMethod } from '~components/atoms/BraintreePaymentMethod/BraintreePaymentMethod'
import { TermsAndConditions } from '~components/atoms/TermsAndConditions'
import { Notification } from '~components/atoms/Notification'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import {
  CustomerAddress,
  customerSelectors,
  getCustomerTrigger,
  getGuestName,
  orderDetailsResetState,
  OrderDetailsSingleItem,
  orderHistoryTrigger,
  triggerHideCustomerNotification
} from '~domains/account'
import { StripeMultibancoPaymentMethod } from '~components/atoms/StripeMultibancoPaymentMethod/StripeMultibancoPaymentMethod'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { OrderSummary } from '~components/molecules/OrderSummary'
import isEqual from 'react-fast-compare'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { ReactComponent as FastDelivery } from '~assets/svg/navigation-24px/FastDelivery.svg'
import { ReactComponent as Add } from '~assets/svg/navigation-16px/NavAdd.svg'
import { ReactComponent as Pin } from '~assets/svg/navigation-24px/Pin.svg'
import {
  Address,
  CustomerSalutation,
  MondialAddress,
  ShipmentMethods
} from '~domains/checkout/types'
import { RestrictedZipCode } from '~components/atoms/RestrictedZipCode'
import { useRestrictedZipCode } from '~helpers/useRestrictedZipCode'
import { MBWayPaymentMethod } from '~components/atoms/MBWayPaymentMethod'
import { SIBSMultibancoPaymentMethod } from '~components/atoms/SIBSMultibancoPaymentMethod'
import { BizumPaymentMethod } from '~components/atoms/BizumPaymentMethod'
import { AdyenPaymentMethod } from '~components/atoms/AdyenPaymentMethod'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import {
  cookieStorageMechanism,
  getCountryFromIso2Code,
  getIso2CodeFromLocale,
  getLocaleFromCountry,
  logger,
  scrollToElement,
  useDetectOutsideClick
} from '~helpers'
import { selectMessages } from '~domains/account/selectors/login'
import { BasketItem } from '~domains/basket/types'
import { Product } from '~domains/product'
import {
  selectDefaultShippingAddressIsTaxExempt,
  selectDefaultShippingAddressIsoCode,
  selectDefaultShippingAddress,
  selectDefaultBillingAddress,
  selectAddresses,
  selectCustomerDetails,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { NotificationModalLayout } from '~components/molecules/NotificationModalLayout/NotificationModalLayout'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
// TODO: Remove once implementation is proved on all environments
import { FeatureFlag } from '~config/constants/feature-flags'
import { SPECIAL_TAX_PROVINCES_ES } from '~config/constants/subdivisions-per-locale'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { API_RESPONSE } from '~config/constants/api-response'
import { AddressFormModalLayout } from '~components/molecules/AddressFormModalLayout'
import {
  ADYEN_PAYMENT_METHODS,
  PAYMENT_OPTIONS
} from '~config/constants/payments'
import { AddressList } from '~components/organisms/AddressList'
import {
  DeleteAddressPayload,
  UpdateAddressTriggerPayload
} from '~domains/address'
import { ProductTileLoading } from '~components/molecules/ProductTile/ProductTileLoading'
import { breakpoints } from '~domains/breakpoints/config'
import { useBreakpoint } from '~domains/breakpoints'
import {
  GuestCheckoutFormValues,
  GuestCheckoutForm
} from '~components/organisms/GuestCheckoutForm'
import { USP } from '~components/atoms/USP/USP'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { useUserAgent } from 'next-useragent'
import {
  getMultibancoCookie,
  getOrderPaymentsData
} from '~domains/checkout/helpers'
import type { Dropin as DropInInstance } from 'braintree-web-drop-in'
import { AtidaCash } from '~components/molecules/AtidaCash'
import { isTaxRegionValid } from '~helpers/isTaxRegionValid'
import { MondialRelayScript } from '~components/meta/MetaData/MondialRelayScript'
import { MondialRelayWidget } from '~components/atoms/MondialRelayWidget'

type GuestDataProps = {
  customer?: {
    salutation?: CustomerSalutation
    email?: string
  }
  billingAddress?: Address
  deliveryAddress?: Address
  isBillingSameAsShipping?: boolean
  newsletter?: boolean
  taxReference?: string
  deliveryMethod?: string
}

const Checkout: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { locale, push } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [dataTriggerDispatched, setDataTriggerDispatched] = useState(false)
  const [openOrderDetails, setOpenOrderDetails] = useState(false)
  const [
    reportCheckoutStartedDispatched,
    setReportCheckoutStartedDispatched
  ] = useState(false)
  const customerReference = useSelector(
    customerSelectors.selectCustomerReference
  )
  const customerIsLoading = useSelector(customerSelectors.selectIsLoading)
  const customerWasSuccess = useSelector(customerSelectors.selectWasSuccess)

  const shipmentMethods = useSelector(selectShipmentMethods)
  const isSpecialTaxProvince = (subdivision: string): boolean => {
    return SPECIAL_TAX_PROVINCES_ES.some(
      province => province.label === subdivision
    )
  }

  const checkoutDataIsLoading = useSelector(selectWasLoading)
  const checkoutDataWasSuccess = useSelector(selectWasSuccess)
  const checkoutDataError = useSelector(selectError)
  const checkoutDataWasError = useSelector(selectWasError)
  const hasPaymentStepError = useSelector(selectWasAnyPaymentStepError)
  const currentDeliveryMethod = useSelector(selectDeliveryMethod)
  const activeStep = useSelector(selectActiveStep)
  const taxReference = useSelector(selectTaxReference)
  const deliveryAddress = useSelector(selectDeliveryAddress, isEqual)
  const billingAddress = useSelector(selectBillingAddress, isEqual)
  const isBillingSameAsShipping = useSelector(selectIsBillingSameAsShipping)
  const addresses = useSelector(selectAddresses) as Partial<Address>[]
  const customerDetails = useSelector(selectCustomerDetails)
  const customerDeliveryAddress = useSelector(selectDefaultShippingAddress)
  const customerBillingAddress = useSelector(selectDefaultBillingAddress)
  const notificationRef = useRef<HTMLDivElement>(null)
  const checkoutDataPaymentMethods = useSelector(selectPaymentMethods)
  const atidaCashAvailableAmount = useSelector(selectAtidaCashAmount)
  const atidaCashUsed = useSelector(selectAtidaCashUsed)

  const basketWasSuccess = useSelector(selectBasketWasSuccess)
  const isBasketEmpty = useSelector(selectIsBasketEmpty)

  const currency = useSelector(selectCurrency)
  const totals = useSelector(selectTotals, isEqual)
  const numberOfItems = useSelector(selectNumberOfItems)
  const discountTotal = useSelector(selectDiscountTotal)
  const isAnyProductUnavailable = useSelector(selectIsProductUnavailable)
  const restrictedZipCode = useRestrictedZipCode

  const basketCouponData = useSelector(selectBasketCouponData)
  const basketCouponsAmount =
    basketCouponData &&
    basketCouponData.reduce((a, b) => a + (b.amount ?? 0), 0)
  const orderError = useSelector(selectOrderError)

  const content = useSelector(selectContent)
  const items = useSelector(selectItems)
  const adyenPaymentMethods = useSelector(
    selectAdyenPaymentMethodsAllowedPaymentMethods
  )

  const guestCookie = cookieStorageMechanism().get(getGuestName())
  const guestId = guestCookie && JSON.parse(guestCookie)?.guestId
  const userAgent = useUserAgent(
    typeof window !== 'undefined' ? window.navigator.userAgent : ''
  )
  const isSafari = userAgent?.browser.toLowerCase().includes('safari')
  const isUserAgentMobileBrowser = userAgent?.browser
    .toLowerCase()
    .includes('mobile')
  const createOrderWasError = useSelector(selectCreateOrderWasError)
  const paymentIsLoading = useSelector(selectIsAnyPaymentLoading)
  const createOrderIsLoading = useSelector(selectCreateOrderIsLoading)
  const createOrderId = useSelector(selectOrderId)
  const createOrderError = useSelector(selectOrderErrorDetails)
  const threeDSecureErrorMessage = useSelector(selectErrorMessage)
  const loginMessage = useSelector(selectMessages)
  const deliveryDays = useSelector(selectDeliveryDays)
  const isTaxExempt = useSelector(selectDefaultShippingAddressIsTaxExempt)
  const isGuestCheckoutTaxExempt = useSelector(selectIsTaxExempt)
  const addressIsoCode = useSelector(selectDefaultShippingAddressIsoCode)
  const guestStep = useSelector(selectGuestStep)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const adyenError = useSelector(selectAdyenError)
  const basketDiscountsList = useSelector(selectBasketDiscountsList)
  const multiplePaymentsError = useSelector(selectMultiplePaymentsError)
  const [loadMore, setLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [guestData, setGuestData] = useState<GuestDataProps>({})
  const [removedVoucher, setRemovedVoucher] = useState('')
  const [
    braintreeDropInInstance,
    setBraintreeDropInInstance
  ] = useState<DropInInstance | null>(null)
  const [braintreeShowButton, setBraintreeShowButton] = useState(false)
  const [isMondialRelayModalOpen, setIsMondialRelayModalOpen] = useState(false)
  //In future we also need to extract mondialRelayAddress
  const [
    mondialRelayAddress,
    setMondialRelayAddress
  ] = useState<MondialAddress | null>(null)

  const [handleModal, setHandleModal] = useState({ isOpen: false, type: '' })

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>(
    ''
  )
  const [isMondialTriggered, setIsMondialTriggered] = useState(false)

  const [
    selectedDeliveryMethodName,
    setSelectedDeliveryMethodName
  ] = useState<string>('')

  const isDeliveryStepDisabled = useMemo(
    () =>
      !(checkoutDataWasSuccess && (customerWasSuccess || guestId)) ||
      !deliveryAddress,
    [checkoutDataWasSuccess, deliveryAddress, guestId, customerWasSuccess]
  )

  const isOrderOrPaymentErrorDisplayable = useMemo(
    () =>
      (orderError || hasPaymentStepError || createOrderWasError) &&
      orderError !== 'checkout.create-order.invalid-data' &&
      orderError !== 'checkout.create-order.unavailable-product',
    [createOrderWasError, hasPaymentStepError, orderError]
  )

  const [
    stripeMultibancoIsSubmitting,
    setStripeMultibancoIsSubmitting
  ] = useState(false)

  const anyPaymentMethodIsLoading =
    paymentIsLoading || stripeMultibancoIsSubmitting

  const scrollingElement = useRef<HTMLDivElement>(null)
  const addressModal = useRef<HTMLDivElement>(null)
  const [isAddressModalOpen, setIsAddressModalOpen] = useDetectOutsideClick(
    addressModal,
    false
  )
  const isToPaymentEventNotClickable = useMemo(
    () => !(checkoutDataWasSuccess && (customerWasSuccess || guestId)),
    [checkoutDataWasSuccess, customerWasSuccess, guestId]
  )

  const payButtonRef = useRef<HTMLDivElement>(null)

  const [selectedAddress, setSelectedAddress] = useState<
    Partial<Address> | undefined
  >(undefined)

  const [preservedGrandTotal, setPreservedGrandTotal] = useState({
    value: 0,
    currency: ''
  })

  const updateAddress = (payload: UpdateAddressTriggerPayload) => {
    // Mock method until address selector allows customers to update addresses on the checkout
    return payload
  }

  const handleDeleteAddress = (payload: DeleteAddressPayload) => {
    // Mock method until address selector allows customers to delete addresses on the checkout
    return payload
  }

  const isSmallScreen = useBreakpoint(breakpoints.sm)

  const isBizumEnabled = useFeatureFlag(FeatureFlag.CHECKOUT_PAYMENT_BIZUM)

  const isSibsMultibancoEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_SIBS_MULTIBANCO
  )

  const isStripeMultibancoEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_STRIPE_MULTIBANCO
  )

  const isSibsMBWayEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_SIBS_MBWAY
  )

  const isAddressSelectorEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_ADDRESS_BOOK_ADDRESS_SELECTOR
  )
  const orderPaymentsDataString = cookieStorageMechanism().get(
    getOrderPaymentsData()
  )

  const atidaWelcomeCashDiscount = useFeatureFlag(
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY
  ) as string

  const isAdyenPaymentMethodsEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_PAYMENT_METHODS
  )

  const isAdyenGooglePayEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_GOOGLE_PAY
  )

  const isAdyenKlarnaPayOverTimeEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_KLARNA_PAY_OVER_TIME
  )

  const isNewRelicEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC
  )

  const isBraintreeCardEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_VISA_MASTER
  )

  const isBraintreePaypalEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_PAYPAL
  )

  const isMultipleTaxRegionsValidationEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION
  )

  const isMissingAddressFormEnabled = Boolean(
    useFeatureFlag(FeatureFlag.CHECKOUT_MISSING_ADDRESS_FORM)
  )

  const isCheckoutHeaderNavigationUpdateStyleEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_HEADER_NAVIGATION_UPDATE_STYLE
  )

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isAdyenApplePayFlagEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_APPLE_PAY
  )

  const isAdyenApplePayDisabledOnLargeScreen = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_APPLE_PAY_DISABLED_ON_LARGE_SCREEN
  )

  const isAdyenMultibancoEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_MULTIBANCO
  )

  const isMondialRelayEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_DELIVERY_MONDIAL_RELAY
  )

  const isDeliveryStickyCTAEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_DELIVERY_STICKY_CTA_BUTTON
  )

  const isAnyAddressValidForLocale = useMemo(
    () =>
      addresses.filter(
        address => getLocaleFromCountry(address.country) === locale
      ).length > 0,
    [addresses, locale]
  )

  const isAdyenMBWayEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_MB_WAY
  )

  const isAdyenCardEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_CARD
  )

  const isLoggedInWithAddress = useMemo(() => {
    return (
      isLoggedIn &&
      (isMissingAddressFormEnabled ? isAnyAddressValidForLocale : true)
    )
  }, [isAnyAddressValidForLocale, isLoggedIn, isMissingAddressFormEnabled])

  const validTaxRegions = useMemo(
    () =>
      isMultipleTaxRegionsValidationEnabled
        ? deliveryAddress &&
          billingAddress &&
          isTaxRegionValid(deliveryAddress, billingAddress, locale)
        : true,
    [
      deliveryAddress,
      billingAddress,
      locale,
      isMultipleTaxRegionsValidationEnabled
    ]
  )

  const isToPaymentButtonDisabled =
    (isLoggedIn && !billingAddress?.houseNumber) ||
    (selectedDeliveryMethodName === 'spain-mondial-relay' &&
      !mondialRelayAddress) ||
    (isLoggedIn &&
      selectedDeliveryMethodName !== 'spain-mondial-relay' &&
      !deliveryAddress?.houseNumber) ||
    restrictedZipCode(`${deliveryAddress?.zipCode}`, `${locale}`) ||
    !deliveryAddress ||
    !selectedDeliveryMethod

  const welcomeCashDiscount = basketDiscountsList?.find(discount =>
    discount.discountKey?.includes(atidaWelcomeCashDiscount)
  )

  const noWelcomeCashDiscounts = (basketDiscountsList ?? [])
    ?.filter(
      discounts => !discounts.discountKey?.includes(atidaWelcomeCashDiscount)
    )
    .reduce((sum, item) => {
      return sum + item?.amount
    }, 0)

  const isAppleDevice = navigator?.vendor?.toLowerCase()?.includes('apple')

  const isAdyenApplePayEnabled =
    isAdyenApplePayFlagEnabled &&
    isSafari &&
    isAppleDevice &&
    (!isAdyenApplePayDisabledOnLargeScreen || isUserAgentMobileBrowser)

  const paymentMethods = useMemo(() => {
    const paymentMethodsFFConfig = {
      isBizumEnabled,
      isSibsMultibancoEnabled,
      isStripeMultibancoEnabled,
      isSibsMBWayEnabled,
      isAdyenApplePayEnabled,
      isAdyenKlarnaPayOverTimeEnabled,
      isAdyenGooglePayEnabled,
      isBraintreePaypalEnabled,
      isBraintreeCardEnabled,
      isAdyenMBWayEnabled,
      isAdyenPaymentMethodsEnabled,
      isAdyenMultibancoEnabled,
      isAdyenCardEnabled
    }
    return getPaymentMethods(
      paymentMethodsFFConfig,
      adyenPaymentMethods,
      locale
    )
  }, [
    adyenPaymentMethods,
    isAdyenApplePayEnabled,
    isAdyenGooglePayEnabled,
    isAdyenKlarnaPayOverTimeEnabled,
    isAdyenMBWayEnabled,
    isAdyenPaymentMethodsEnabled,
    isAdyenMultibancoEnabled,
    isBizumEnabled,
    isBraintreeCardEnabled,
    isBraintreePaypalEnabled,
    isSibsMBWayEnabled,
    isSibsMultibancoEnabled,
    isStripeMultibancoEnabled,
    isAdyenCardEnabled,
    locale
  ])

  useEffect(() => {
    if (isLoggedIn && !isAnyAddressValidForLocale && customerWasSuccess) {
      dispatch(triggerReportMissingAddressCheckoutPageViewed())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAnyAddressValidForLocale, isLoggedIn, customerDetails?.email])

  useEffect(() => {
    setMondialRelayAddress(null)
  }, [])

  const isPaymentStepActive = isLoggedInWithAddress
    ? activeStep === 1
    : guestStep === 2

  const isDeliveryStepActive = isLoggedInWithAddress
    ? activeStep === 0
    : guestStep === 1

  useEffect(() => {
    dispatch(setIsPaymentStepActive(isPaymentStepActive))
  }, [isPaymentStepActive, dispatch])

  useEffect(() => {
    if (
      loginMessage &&
      loginMessage?.length > 0 &&
      (basketCouponData?.length === 0 || !basketCouponData)
    ) {
      push('/basket')
    }
  }, [push, loginMessage, basketCouponData])

  useEffect(() => {
    if (
      orderError === 'checkout.create-order.unavailable-product' ||
      (orderError === 'checkout.create-order.invalid-data' &&
        typeof createOrderError !== 'string')
    ) {
      push('/basket')
    }
  }, [orderError, push, dispatch, createOrderError])

  // this will fetch basket if set-data fails so we can display the order summary
  useEffect(() => {
    if (!checkoutDataWasSuccess && checkoutDataError) {
      dispatch(getBasketTrigger())
    }
  }, [dispatch, checkoutDataWasSuccess, checkoutDataError])

  useEffect(() => {
    if (paymentIsLoading || createOrderIsLoading) setIsLoading(true)
  }, [createOrderIsLoading, paymentIsLoading])
  useEffect(() => {
    if (hasPaymentStepError || createOrderWasError) setIsLoading(false)
  }, [hasPaymentStepError, createOrderWasError])

  useEffect(() => {
    dispatch(createPaymentMethodClearDetails())
    dispatch(mbWayPaymentClearDetails())
    dispatch(sibsMultibancoPaymentClearDetails())
    dispatch(createOrderResetState())
    dispatch(adyenPaymentResetState())
    dispatch(createMultiplePaymentsResetState())
    dispatch(adyenPaymentDetailsResetState())
    dispatch(setIsPaymentPending(false))
    cookieStorageMechanism().remove(getMultibancoCookie())
    isLoggedInWithAddress && dispatch(orderHistoryTrigger({ page: 1 }))
    dispatch({
      type: 'checkout',
      [WAIT_FOR_ACTION]: setDataFulfill().type
    })
    setDataTriggerDispatched(true)
  }, [dispatch, isLoggedInWithAddress])

  useEffect(() => {
    if (isAdyenPaymentMethodsEnabled && totals.grandTotal) {
      dispatch(adyenPaymentMethodsTrigger())
    }
  }, [dispatch, isAdyenPaymentMethodsEnabled, totals.grandTotal])

  useEffect(() => {
    if (customerIsLoading && customerWasSuccess) {
      setSelectedAddress(customerDeliveryAddress as Partial<Address>)
    }
  }, [customerDeliveryAddress, customerIsLoading, customerWasSuccess])

  useEffect(() => {
    if (
      !createOrderIsLoading &&
      !createOrderId &&
      !anyPaymentMethodIsLoading &&
      !isMondialTriggered
    ) {
      if (isLoggedInWithAddress) {
        dispatch(
          setDataTrigger({
            deliveryAddress:
              (selectedAddress as Address) ??
              (customerDeliveryAddress as CustomerAddress),
            billingAddress: (customerBillingAddress as unknown) as Address,
            ...(selectedDeliveryMethod && {
              deliveryMethod: selectedDeliveryMethod.toString()
            }),
            isBillingSameAsShipping,
            taxReference,
            payments:
              atidaCashUsed === undefined || atidaCashUsed === null
                ? undefined
                : [
                    {
                      paymentSelection: 'atidaPaymentLoyalty',
                      paymentMethodName: 'LoyaltySpend',
                      paymentProviderName: 'AtidaPayment',
                      amount: atidaCashUsed
                    },
                    {
                      paymentSelection: 'atidaPaymentInternal',
                      paymentMethodName: 'Internal',
                      paymentProviderName: 'AtidaPayment'
                    }
                  ]
          })
        )
      }
      if (!isLoggedInWithAddress && Object.keys(guestData).length > 0) {
        dispatch(
          setDataTrigger({
            ...guestData,
            payments:
              atidaCashUsed === undefined || atidaCashUsed === null
                ? undefined
                : [
                    {
                      paymentSelection: 'atidaPaymentLoyalty',
                      paymentMethodName: 'LoyaltySpend',
                      paymentProviderName: 'AtidaPayment',
                      amount: atidaCashUsed
                    },
                    {
                      paymentSelection: 'atidaPaymentInternal',
                      paymentMethodName: 'Internal',
                      paymentProviderName: 'AtidaPayment'
                    }
                  ],
            ...(guestStep === 0 && { shouldSetLoading: true }),
            ...(selectedDeliveryMethod && {
              deliveryMethod: selectedDeliveryMethod.toString()
            })
          })
        )
        dispatch(triggerReportGuestDetailsEntered())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoggedInWithAddress,
    dispatch,
    selectedAddress,
    anyPaymentMethodIsLoading,
    atidaCashUsed,
    createOrderId,
    createOrderIsLoading,
    isBillingSameAsShipping,
    isMondialTriggered,
    guestData
  ])

  useEffect(() => {
    if (!isLoggedInWithAddress) {
      dispatch(setDataTrigger({}))
    }
  }, [dispatch, isLoggedInWithAddress])

  useEffect(() => {
    if (isLoggedInWithAddress && dataTriggerDispatched && !isBasketEmpty) {
      dispatch(triggerReportCheckoutStarted())
      setReportCheckoutStartedDispatched(true)
    }
  }, [dataTriggerDispatched, isBasketEmpty, dispatch, isLoggedInWithAddress])

  useEffect(() => {
    if (
      !isLoggedInWithAddress &&
      !reportCheckoutStartedDispatched &&
      guestStep === 1
    ) {
      dispatch(triggerReportCheckoutStarted())
      setReportCheckoutStartedDispatched(true)
    }
  }, [
    dispatch,
    guestStep,
    isLoggedInWithAddress,
    reportCheckoutStartedDispatched
  ])

  useEffect(() => {
    if (customerReference) {
      dispatch(getCustomerTrigger({ customerReference }))
    }
  }, [dispatch, customerReference])

  useEffect(() => {
    if (
      checkoutDataError === API_RESPONSE.cart_not_found ||
      (basketWasSuccess && (isBasketEmpty || isAnyProductUnavailable))
    ) {
      if (orderPaymentsDataString) {
        const methodCode =
          (orderPaymentsDataString &&
            JSON.parse(orderPaymentsDataString).method_code) ??
          ''
        const orderId = JSON.parse(orderPaymentsDataString)?.order_id ?? ''
        if (
          methodCode === PAYMENT_OPTIONS.REDSYS_BIZUM ||
          methodCode === PAYMENT_OPTIONS.STRIPE_MULTIBANCO ||
          methodCode === PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY ||
          methodCode === PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME
        ) {
          push(`/unsuccessful/${orderId}`)
          return
        }
        dispatch(orderDetailsResetState())
        dispatch(setIsPaymentPending(true))
        push(`/confirmation/${orderId}`)
        return
      }
      push('/basket')
    }
  }, [
    dispatch,
    checkoutDataError,
    basketWasSuccess,
    isBasketEmpty,
    push,
    orderPaymentsDataString,
    isAnyProductUnavailable
  ])

  useEffect(() => {
    if (
      checkoutDataError === API_RESPONSE.request_failed_after_several_attempt &&
      checkoutDataWasError &&
      checkoutDataIsLoading
    ) {
      push('/basket')
    }
  }, [checkoutDataError, checkoutDataWasError, checkoutDataIsLoading, push])

  useEffect(() => {
    if (orderPaymentsDataString && !isBasketEmpty) {
      cookieStorageMechanism().remove(getOrderPaymentsData())
    }
  }, [orderPaymentsDataString, isBasketEmpty])

  useEffect(() => {
    let page = ''
    if (isLoggedInWithAddress) {
      page = activeStep === 0 ? 'Delivery' : 'Payment'
    } else {
      switch (guestStep) {
        case 0:
          page = isLoggedIn ? 'Missing Details' : 'Guest Details'
          break
        case 1:
          page = 'Delivery'
          break
        case 2:
          page = 'Payment'
          break
        default:
          page = ''
      }
    }
    page &&
      dispatch(triggerReportPageViewed({ page: page, pageType: 'checkout' }))
  }, [activeStep, dispatch, guestStep, isLoggedIn, isLoggedInWithAddress])
  useEffect(() => {
    if (guestStep === 0 && !isLoggedIn) {
      dispatch(triggerReportGuestDetailsPageViewed())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, guestStep])

  useEffect(() => {
    dispatch(triggerHideCustomerNotification())
    setRemovedVoucher('')
  }, [dispatch])

  useEffect(() => {
    if (
      isNewRelicEnabled &&
      reportCheckoutStartedDispatched &&
      (isLoggedInWithAddress || guestStep !== 0)
    ) {
      logger.error(
        {
          message: 'current step on checkout page',
          name: 'checkout active step'
        },
        JSON.stringify({
          activeStep: isLoggedInWithAddress ? activeStep + 1 : guestStep
        })
      )
      dispatch(triggerReportCheckoutStepViewed())
    }
  }, [
    reportCheckoutStartedDispatched,
    activeStep,
    guestStep,
    isLoggedInWithAddress,
    dispatch,
    isNewRelicEnabled
  ])

  useEffect(() => {
    dispatch(clearStateErrors())
  }, [activeStep, dispatch])

  useEffect(() => {
    if (isGuestCheckoutTaxExempt && !isLoggedInWithAddress) {
      setHandleModal({ isOpen: true, type: 'taxExempt' })
    }
  }, [isLoggedInWithAddress, isGuestCheckoutTaxExempt])

  useEffect(() => {
    const isTaxExemptCookie = cookieStorageMechanism().get('isTaxExempt')
    const isTaxExemptCookieStore =
      isTaxExemptCookie && JSON.parse(isTaxExemptCookie).store
    if (
      isTaxExempt &&
      addressIsoCode === getIso2CodeFromLocale(locale) &&
      (!isTaxExemptCookieStore || isTaxExemptCookieStore !== addressIsoCode)
    ) {
      setHandleModal({ isOpen: true, type: 'taxExempt' })
      cookieStorageMechanism().set(
        'isTaxExempt',
        JSON.stringify({
          store: addressIsoCode
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.oneYear)
        }
      )
    }
  }, [addressIsoCode, isTaxExempt, locale])

  useEffect(() => {
    if (isSpecialTaxProvince(selectedAddress?.province ?? '')) {
      setHandleModal({ isOpen: true, type: 'taxExempt' })
    }
  }, [selectedAddress])

  useEffect(() => {
    isLoggedInWithAddress && dispatch(setGuestStep(1))
  }, [isLoggedInWithAddress, dispatch])

  useEffect(() => {
    !isLoggedInWithAddress &&
      checkoutDataWasSuccess &&
      checkoutDataIsLoading &&
      Object.keys(guestData).length > 0 &&
      dispatch(setGuestStep(1))
  }, [
    isLoggedInWithAddress,
    checkoutDataWasSuccess,
    guestData,
    dispatch,
    checkoutDataIsLoading
  ])

  const handleRemoveVoucher = useCallback(
    async (voucherCode: string) => {
      dispatch(removeCouponTrigger(voucherCode))
      await dispatch({
        type: 'checkout',
        [WAIT_FOR_ACTION]: removeCouponFulfill().type
      })
      dispatch(setDataTrigger(guestData))
      setRemovedVoucher(voucherCode)
    },
    [dispatch, guestData]
  )

  useEffect(() => {
    if (
      checkoutDataError &&
      checkoutDataError.includes(API_RESPONSE.voucher_not_allowed)
    ) {
      const voucherCode = checkoutDataError.replace(
        `${API_RESPONSE.voucher_not_allowed}.`,
        ''
      )
      handleRemoveVoucher(voucherCode)
    }
  }, [checkoutDataError, guestData, handleRemoveVoucher])

  useEffect(() => {
    if (totals.grandTotal && currency) {
      setPreservedGrandTotal({
        value: totals.grandTotal,
        currency
      })
    }
  }, [currency, totals.grandTotal])

  const handlePaymentProceed = useCallback(() => {
    dispatch(setActiveStep(1))
    !isLoggedInWithAddress && dispatch(setGuestStep(2))
    window.scrollTo(0, 0)
    dispatch(triggerReportCheckoutStepCompleted({}))
  }, [dispatch, isLoggedInWithAddress])

  const handleDeliveryMethodChange = useCallback(
    (deliveryMethodId?: string) => {
      setMondialRelayAddress(null)
      const currDeliveryMethod = shipmentMethods?.find(
        method => method.id === deliveryMethodId
      )
      if (currDeliveryMethod?.attributes.name === 'spain-mondial-relay') {
        setIsMondialRelayModalOpen(true)
      }
      if (selectedDeliveryMethod !== deliveryMethodId) {
        dispatch(
          setDataTrigger(
            Object.keys(guestData).length > 0 &&
              !isLoggedInWithAddress &&
              isMissingAddressFormEnabled
              ? {
                  ...guestData,
                  deliveryMethod: deliveryMethodId,
                  isDelivery: true
                }
              : {
                  deliveryAddress:
                    currDeliveryMethod?.attributes.name ===
                    'spain-mondial-relay'
                      ? deliveryAddress
                      : ((customerDeliveryAddress as unknown) as Address),
                  deliveryMethod: deliveryMethodId,
                  billingAddress: isLoggedInWithAddress
                    ? undefined
                    : billingAddress,
                  isBillingSameAsShipping,
                  taxReference,
                  isDelivery: true
                }
          )
        )
      }
      setSelectedDeliveryMethod(String(deliveryMethodId))
      setSelectedDeliveryMethodName(currDeliveryMethod?.attributes?.name ?? '')
    },
    [
      shipmentMethods,
      customerDeliveryAddress,
      selectedDeliveryMethod,
      dispatch,
      guestData,
      isLoggedInWithAddress,
      isMissingAddressFormEnabled,
      billingAddress,
      isBillingSameAsShipping,
      taxReference,
      deliveryAddress
    ]
  )

  const handleOpenOrderDetails = () => {
    setOpenOrderDetails(!openOrderDetails)
  }

  useEffect(() => {
    if (!isLoggedInWithAddress && guestStep === 0 && checkoutDataError)
      scrollToElement(notificationRef.current)
  }, [isLoggedInWithAddress, guestStep, checkoutDataError])

  useEffect(() => {
    if (!isPaymentStepActive) {
      setBraintreeShowButton(false)
      setBraintreeDropInInstance(null)
    }
  }, [setBraintreeShowButton, setBraintreeDropInInstance, isPaymentStepActive])

  useEffect(() => {
    if (isOrderOrPaymentErrorDisplayable) {
      setTimeout(() => {
        scrollToElement(scrollingElement.current)
      }, 0)
      return
    }
  }, [isOrderOrPaymentErrorDisplayable])

  useEffect(() => {
    if (isMondialRelayEnabled) {
      const eventListener = (event: CustomEvent) => {
        const { detail } = event
        setMondialRelayAddress({
          Address1: detail.Adresse1,
          Address2: detail.Adresse2,
          Postcode: detail.CP,
          id: detail.ID,
          Lat: detail.Lat,
          Long: detail.Long,
          Name: detail.Nom,
          Country: detail.Pays,
          Photo: detail.Photo,
          City: detail.Ville
        })
      }

      if (isMondialRelayModalOpen) {
        document.addEventListener(
          'selectMondialRelayAddress',
          eventListener as EventListener
        )
        return
      }
      document.removeEventListener(
        'selectMondialRelayAddress',
        eventListener as EventListener
      )
    }
  }, [isMondialRelayModalOpen, isMondialRelayEnabled])

  const handleLoadMore = () => {
    setLoadMore(true)
  }

  const handleCloseModal = () => {
    setHandleModal({ isOpen: false, type: '' })
  }

  const handlePickUpAddress = useCallback(() => {
    if (mondialRelayAddress && deliveryAddress) {
      setIsMondialTriggered(true)
      dispatch(
        setDataTrigger(
          Object.keys(guestData).length > 0 &&
            !isLoggedInWithAddress &&
            isMissingAddressFormEnabled
            ? {
                ...guestData,
                deliveryAddress: {
                  ...deliveryAddress,
                  id: undefined,
                  zipCode: mondialRelayAddress.Postcode,
                  address1: mondialRelayAddress.Address1,
                  address2: mondialRelayAddress.Address2,
                  city: mondialRelayAddress.City,
                  country: mondialRelayAddress.Country,
                  pickingStationId: mondialRelayAddress.id,
                  pickingStationName: mondialRelayAddress.Name,
                  isAddressSavingSkipped: true,
                  isDefaultBilling: false,
                  isDefaultShipping: false,
                  addition: undefined,
                  houseNumber: undefined
                },
                deliveryMethod: selectedDeliveryMethod
                  ? selectedDeliveryMethod.toString()
                  : currentDeliveryMethod,
                isDelivery: true
              }
            : {
                deliveryAddress: {
                  ...deliveryAddress,
                  id: undefined,
                  zipCode: mondialRelayAddress.Postcode,
                  address1: mondialRelayAddress.Address1,
                  address2: mondialRelayAddress.Address2,
                  city: mondialRelayAddress.City,
                  country: mondialRelayAddress.Country,
                  pickingStationId: mondialRelayAddress.id,
                  pickingStationName: mondialRelayAddress.Name,
                  isAddressSavingSkipped: true,
                  isDefaultBilling: false,
                  isDefaultShipping: false,
                  addition: undefined,
                  houseNumber: undefined
                },
                deliveryMethod: currentDeliveryMethod,
                billingAddress: isLoggedInWithAddress
                  ? undefined
                  : billingAddress,
                isBillingSameAsShipping: false,
                taxReference,
                isDelivery: true
              }
        )
      )
    }
  }, [
    billingAddress,
    currentDeliveryMethod,
    deliveryAddress,
    dispatch,
    guestData,
    isLoggedInWithAddress,
    isMissingAddressFormEnabled,
    mondialRelayAddress,
    selectedDeliveryMethod,
    taxReference
  ])

  const handleGuestCheckoutFormOnSubmit = (values: GuestCheckoutFormValues) => {
    setGuestData({
      customer: {
        salutation: (customerDetails?.salutation ?? 'Ms') as CustomerSalutation,
        email: values.email
      },
      deliveryAddress: {
        ...values.shipping,
        ...(locale === 'es-es' && {
          province: values.shipping.subdivision
        }),
        ...(locale === 'pt-pt' && {
          district: values.shipping.subdivision
        }),
        salutation: 'Ms',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phoneNumber,
        iso2Code: getIso2CodeFromLocale(locale)
      } as Address,
      billingAddress: {
        ...(!values.isBillingSameAsShipping
          ? {
              ...values.billing,
              ...(locale === 'es-es' && {
                province: values.billing?.subdivision
              }),
              ...(locale === 'pt-pt' && {
                district: values.billing?.subdivision
              })
            }
          : {
              ...values.shipping,
              ...(locale === 'es-es' && {
                province: values.shipping.subdivision
              }),
              ...(locale === 'pt-pt' && {
                district: values.shipping.subdivision
              })
            }),
        salutation: 'Ms',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phoneNumber,
        iso2Code: getIso2CodeFromLocale(locale)
      } as Address,
      isBillingSameAsShipping: values.isBillingSameAsShipping,
      newsletter: values.newsletter,
      taxReference:
        values?.shipping?.taxReference || values?.billing?.taxReference,
      deliveryMethod: currentDeliveryMethod
    })
    window.scrollTo(0, 0)
  }

  const PaymentStepNotifications = () => {
    /* TODO: Check why braintreeToken requests are sent while onChange */
    if (isOrderOrPaymentErrorDisplayable) {
      let errorTitle = t('checkout.generic-payment-error')
      if (isLoyaltyAtidaCashEnabled && multiplePaymentsError) {
        errorTitle = multiplePaymentsError
      }
      if (!isLoyaltyAtidaCashEnabled) {
        if (threeDSecureErrorMessage) {
          errorTitle = threeDSecureErrorMessage
        }
        if (adyenError) {
          errorTitle = t(adyenError)
        }
      }

      return (
        <Notification type="error" title={errorTitle} className="p-2 mt-3" />
      )
    }
    if (!validTaxRegions)
      return (
        <Notification
          type="warning"
          title={t('checkout.notification.invalid-tax-regions.title')}
          content={t('checkout.notification.invalid-tax-regions.body')}
        >
          <NextLink
            href={`/account/address-book?address=${billingAddress?.id}`}
            passHref
          >
            <Link>{t('checkout.notification.invalid-tax-regions.link')}</Link>
          </NextLink>
        </Notification>
      )
    return null
  }

  return (
    <>
      <MetaData
        title={content?.seo?.title || content?.title || undefined}
        description={content?.seo?.description}
        indexation="noindex"
      />
      <AlternateLinks links={getAlternateLinks('checkout', locale)} />
      {isMondialRelayEnabled && deliveryAddress?.zipCode && (
        <>
          <MondialRelayScript zipCode={deliveryAddress?.zipCode} />
          <MondialRelayWidget
            isSmallScreen={isSmallScreen}
            isMondialRelayModalOpen={isMondialRelayModalOpen}
            setMondialRelayAddress={setMondialRelayAddress}
            setIsMondialRelayModalOpen={setIsMondialRelayModalOpen}
            handlePickUpAddress={handlePickUpAddress}
          />
        </>
      )}
      <NotificationModalLayout
        isOpen={handleModal.isOpen}
        variant={isSmallScreen ? 'center' : 'bottom'}
        maxWidth={!isSmallScreen}
        isFixedPosition
        children={
          <div className="text-left sm:text-center text-sm xs:text-base">
            <p className="mb-0.5">
              <b>
                {handleModal.type === 'taxExempt'
                  ? t('checkout.notification.tax-exemption.title')
                  : t('checkout.notification.removed-voucher.title')}
              </b>
            </p>
            <p className="xs:mb-2">
              {handleModal.type === 'taxExempt'
                ? t('checkout.notification.tax-exemption.description')
                : t('checkout.notification.removed-voucher.description')}
            </p>
          </div>
        }
        confirmButtonLabel={
          handleModal.type === 'taxExempt'
            ? t('checkout.notification.tax-exemption.button')
            : t('checkout.notification.removed-voucher.button')
        }
        handleConfirm={handleCloseModal}
        iconPosition="left-mobile"
        isMondialRelayModalOpen={isMondialRelayModalOpen}
      />
      {(orderPaymentsDataString && !createOrderId) || checkoutDataIsLoading ? (
        <section className="h-40 flex justify-center mt-2 mb-9 mx-2 sm:mx-12 sm:mt-4 md:mx-8 md:mt-8 lg:mx-20 lg:mt-10">
          <LoadingSpinner />
        </section>
      ) : (
        <main
          className={classNames(
            'mt-3',
            'sm:container sm:container-fixed',
            'mx-auto grid gap-x-3 grid-cols-12 grid-flow-row-dense',
            'sm:px-0 sm:my-5',
            'md:mb-8'
          )}
        >
          {!isLoggedInWithAddress && guestStep === 0 && (
            <section className="px-2 pb-3 col-start-1 col-end-13 sm:col-start-2 sm:px-0 sm:col-end-12 md:col-start-1 md:col-end-8 md:pb-0 lg:col-start-2 lg:col-end-7">
              <h1
                id="delivery-step-title"
                className={classNames('mb-2 col-start-1 col-end-13', {
                  'mt-2 sm:mt-1 md:-mt-2': isCheckoutHeaderNavigationUpdateStyleEnabled
                })}
              >
                {t('checkout.guest-checkout-form.title')}
              </h1>
              {!customerReference && (
                <p
                  className={classNames('col-start-1 col-end-13', {
                    'sm:mb-4': !checkoutDataError,
                    'mb-3': !checkoutDataError
                  })}
                >
                  {t('checkout.guest-checkout-form.login-question')}
                  <NextLink href="/login/checkout" prefetch={false}>
                    <Link
                      href="/login/checkout"
                      className=" font-normal cursor-pointer ml-0.5"
                    >
                      {t('shared.login')}
                    </Link>
                  </NextLink>
                </p>
              )}
              {checkoutDataError &&
                checkoutDataError !== API_RESPONSE.cart_not_found &&
                checkoutDataError !==
                  API_RESPONSE.request_failed_after_several_attempt &&
                !checkoutDataError.includes(API_RESPONSE.voucher_not_allowed) &&
                checkoutDataError !==
                  API_RESPONSE.missing_shipping_billing_address &&
                checkoutDataError !== API_RESPONSE.missing_shipping_address &&
                checkoutDataError !== API_RESPONSE.missing_billing_address && (
                  <Notification
                    type="warning"
                    role="alert"
                    title={t(`${checkoutDataError}.title`)}
                    content={t(`${checkoutDataError}.content`)}
                    className={'mb-2'}
                    notificationRef={notificationRef}
                  />
                )}

              <GuestCheckoutForm
                taxReference={taxReference}
                isGuest={!customerReference ?? false}
                billingSameAsShipping={isBillingSameAsShipping}
                initialBilling={guestData?.billingAddress}
                initialShipping={guestData?.deliveryAddress}
                className={classNames('flex flex-col items-center')}
                onSubmit={handleGuestCheckoutFormOnSubmit}
              />
            </section>
          )}
          {((isLoggedInWithAddress && activeStep == 0) ||
            (!isLoggedInWithAddress && guestStep === 1)) && (
            <section className="lg:mr-15 col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-8 md:mb-4 lg:col-start-2 lg:col-end-8">
              <h1
                id="delivery-step-title"
                className={classNames(
                  'mb-3 px-2 col-start-1 col-end-13',
                  'sm:px-0 sm:col-start-2 sm:col-end-12',
                  'md:col-start-1 md:col-end-8 md:mb-4',
                  'lg:col-start-2 lg:col-end-8 lg:mb-5',
                  {
                    'mt-4 sm:mt-5 md:mt-0': !isCheckoutHeaderNavigationUpdateStyleEnabled,
                    'mt-2 sm:mt-1 md:-mt-2': isCheckoutHeaderNavigationUpdateStyleEnabled
                  }
                )}
              >
                {t('checkout.delivery-step-title')}
              </h1>
              {removedVoucher && (
                <Notification
                  type="error"
                  role="alert"
                  title={t(
                    'checkout.set-checkout-data.error.voucher-removed.title'
                  )}
                  content={t(
                    'checkout.set-checkout-data.error.voucher-removed.content',
                    { removedVoucher }
                  )}
                  className={'mb-2'}
                  notificationRef={notificationRef}
                />
              )}

              <div
                className={classNames(
                  'mb-5 px-2 col-start-1 col-end-13',
                  'sm:mb-6 sm:px-0 sm:col-start-2 sm:col-end-12',
                  'md:mb-0 md:col-start-1 md:col-end-8',
                  'lg:col-start-1 lg:col-end-7'
                )}
              >
                {isLoggedInWithAddress &&
                  (checkoutDataWasSuccess || checkoutDataWasError) &&
                  ((checkoutDataError &&
                    checkoutDataError !== API_RESPONSE.cart_not_found &&
                    checkoutDataError !==
                      API_RESPONSE.request_failed_after_several_attempt) ||
                    !customerBillingAddress ||
                    !customerDeliveryAddress ||
                    !customerBillingAddress.houseNumber ||
                    !customerDeliveryAddress.houseNumber) && (
                    <Notification
                      type="warning"
                      role="alert"
                      title={
                        (!customerBillingAddress && !customerDeliveryAddress) ||
                        (!customerBillingAddress?.houseNumber &&
                          !customerDeliveryAddress?.houseNumber)
                          ? t(
                              `checkout.set-checkout-data.error.shipping-billing-addresses.title`
                            )
                          : !customerBillingAddress ||
                            !customerBillingAddress.houseNumber
                          ? t(
                              `checkout.set-checkout-data.error.billing-address.title`
                            )
                          : !customerDeliveryAddress ||
                            !customerDeliveryAddress.houseNumber
                          ? t(
                              `checkout.set-checkout-data.error.shipping-address.title`
                            )
                          : t(`${checkoutDataError}.title`)
                      }
                      content={
                        (!customerBillingAddress && !customerDeliveryAddress) ||
                        (!customerBillingAddress?.houseNumber &&
                          !customerDeliveryAddress?.houseNumber)
                          ? t(
                              `checkout.set-checkout-data.error.shipping-billing-addresses.content`
                            )
                          : !customerBillingAddress ||
                            !customerBillingAddress.houseNumber
                          ? t(
                              `checkout.set-checkout-data.error.billing-address.content`
                            )
                          : !customerDeliveryAddress ||
                            !customerDeliveryAddress.houseNumber
                          ? t(
                              `checkout.set-checkout-data.error.shipping-address.content`
                            )
                          : t(`${checkoutDataError}.title`)
                      }
                      className={'mb-2'}
                    >
                      {((checkoutDataError &&
                        !checkoutDataError.includes('unexpected-error')) ||
                        !customerBillingAddress ||
                        !customerDeliveryAddress ||
                        !customerBillingAddress.houseNumber ||
                        !customerDeliveryAddress.houseNumber) && (
                        <p className="w-full">
                          <NextLink
                            href={
                              checkoutDataError &&
                              checkoutDataError.includes('phone')
                                ? '/account/details/change-personal-details'
                                : `/account/address-book?address=${customerDeliveryAddress?.id}`
                            }
                          >
                            <Link
                              href={
                                checkoutDataError &&
                                checkoutDataError.includes('phone')
                                  ? '/account/details/change-personal-details'
                                  : `/account/address-book?address=${customerDeliveryAddress?.id}`
                              }
                            >
                              {checkoutDataError &&
                              checkoutDataError.includes('phone')
                                ? t('checkout.update-account-details.link')
                                : t('checkout.update-address.link')}
                            </Link>
                          </NextLink>
                        </p>
                      )}
                    </Notification>
                  )}
                <DeliveryMethodGroup
                  aria-labelledby="delivery-step-title"
                  data-testid="checkoutDeliveryMethods"
                  initialDeliveryMethod={currentDeliveryMethod}
                  onDeliveryMethodChange={handleDeliveryMethodChange}
                  shipmentMethods={shipmentMethods}
                  locale={locale}
                >
                  {checkoutDataIsLoading ? (
                    <ProductTileLoading variation="small" />
                  ) : (
                    !checkoutDataError &&
                    ((!isLoggedInWithAddress &&
                      deliveryAddress &&
                      billingAddress) ||
                      (isLoggedInWithAddress &&
                        customerBillingAddress &&
                        deliveryAddress &&
                        customerBillingAddress.houseNumber &&
                        customerDeliveryAddress?.houseNumber)) &&
                    (shipmentMethods as ShipmentMethods[])?.map(method => (
                      <DeliveryMethod
                        key={method.id}
                        inputName="delivery-method"
                        inputValue={method.id}
                        data-testid={`checkoutDeliveryMethod-${method.id}`}
                        inputDisabled={isDeliveryStepDisabled}
                        name={method.attributes.name}
                        isToPaymentEventNotClickable={
                          isToPaymentEventNotClickable
                        }
                        isLoggedInWithAddress={isLoggedInWithAddress}
                        setIsMondialRelayModalOpen={() => {
                          setIsMondialRelayModalOpen(true)
                        }}
                        mondialRelayStation={
                          mondialRelayAddress
                            ? deliveryAddress.pickingStationName
                            : ''
                        }
                        onGuestAddressChange={() => dispatch(setGuestStep(0))}
                        timing={
                          isMondialRelayEnabled
                            ? t('delivery-method.business-days', {
                                minDeliveryDays:
                                  deliveryDays?.minDeliveryDays ??
                                  t('delivery-method.min-delivery-days'),
                                maxDeliveryDays:
                                  deliveryDays?.maxDeliveryDays ??
                                  t('delivery-method.max-delivery-days')
                              })
                            : t('delivery-method.expected-delivery', {
                                minDeliveryDays:
                                  deliveryDays?.minDeliveryDays ??
                                  t('delivery-method.min-delivery-days'),
                                maxDeliveryDays:
                                  deliveryDays?.maxDeliveryDays ??
                                  t('delivery-method.max-delivery-days')
                              })
                        }
                        deliveryAddress={deliveryAddress}
                        price={method.attributes.price}
                        currency={method.attributes.currencyIsoCode}
                        icon={
                          method.attributes.name === 'spain-mondial-relay' ? (
                            <Pin className="icon-24" />
                          ) : method.attributes.price ? (
                            <Delivery className="icon-24" />
                          ) : (
                            <FastDelivery className="icon-24" />
                          )
                        }
                        orderShipping={totals.shippingTotal}
                      >
                        {method.attributes.name === 'spain-mondial-relay' &&
                          mondialRelayAddress && (
                            <address className="not-italic">
                              {deliveryAddress?.address1}{' '}
                              {deliveryAddress?.address2}
                              <br />
                              {deliveryAddress?.zipCode}{' '}
                              {<span>{deliveryAddress?.city}</span>},{' '}
                              {deliveryAddress?.iso2Code &&
                                getCountryFromIso2Code(
                                  deliveryAddress?.iso2Code
                                )}
                            </address>
                          )}
                        {method.attributes.name !== 'spain-mondial-relay' && (
                          <address className="not-italic">
                            {deliveryAddress?.address1}{' '}
                            {deliveryAddress?.houseNumber}{' '}
                            {deliveryAddress?.address2}
                            <br />
                            {deliveryAddress &&
                              deliveryAddress?.addition &&
                              deliveryAddress?.addition?.length > 0 && (
                                <span>
                                  {deliveryAddress?.addition} <br />
                                </span>
                              )}
                            {deliveryAddress?.zipCode} {deliveryAddress?.city}
                            <br />
                            {(deliveryAddress?.province ||
                              deliveryAddress?.district) && (
                              <span>
                                {deliveryAddress?.province ??
                                  deliveryAddress?.district}
                                ,{' '}
                              </span>
                            )}
                            {deliveryAddress?.iso2Code &&
                              getCountryFromIso2Code(deliveryAddress?.iso2Code)}
                          </address>
                        )}

                        {restrictedZipCode(
                          `${deliveryAddress?.zipCode}`,
                          `${locale}`
                        ) && <RestrictedZipCode notificationType="error" />}
                        {!isDeliveryStickyCTAEnabled &&
                          (isLoggedInWithAddress ? (
                            isAddressSelectorEnabled ? (
                              <button
                                onClick={() => setIsAddressModalOpen(true)}
                                className={classNames(
                                  'flex mt-1 underline text-sm ',
                                  {
                                    'cursor-default': isDeliveryStepDisabled
                                  }
                                )}
                                disabled={isDeliveryStepDisabled}
                              >
                                {t('checkout.update-customer-address')}
                              </button>
                            ) : (
                              <p className="w-full mt-1">
                                <NextLink href={'/account/address-book'}>
                                  <Link
                                    href={'/account/address-book'}
                                    className={classNames(
                                      {
                                        'pointer-events-none':
                                          !(
                                            checkoutDataWasSuccess &&
                                            customerWasSuccess
                                          ) || !deliveryAddress
                                      },
                                      'font-normal text-center text-sm cursor-pointer'
                                    )}
                                  >
                                    {t('checkout.update-customer-address')}
                                  </Link>
                                </NextLink>
                              </p>
                            )
                          ) : (
                            <button
                              onClick={() => dispatch(setGuestStep(0))}
                              className={'flex mt-1 underline text-sm'}
                            >
                              {t('checkout.update-customer-address')}
                            </button>
                          ))}
                        {!isDeliveryStickyCTAEnabled &&
                          method.attributes.name !== 'spain-mondial-relay' && (
                            <Button
                              variant="secondary"
                              aria-label={t('checkout.cta-button-text')}
                              data-testid="toPaymentButton"
                              className={classNames(
                                'w-full px-7 mt-3',
                                'sm:w-auto',
                                {
                                  'pointer-events-none': isToPaymentEventNotClickable
                                }
                              )}
                              disabled={
                                (Number(currentDeliveryMethod) !==
                                  Number(method.id) &&
                                  (shipmentMethods as ShipmentMethods[])
                                    .length !== 1) ||
                                restrictedZipCode(
                                  `${deliveryAddress?.zipCode}`,
                                  `${locale}`
                                ) ||
                                !deliveryAddress
                              }
                              onClick={handlePaymentProceed}
                            >
                              {t('checkout.cta-button-text')}
                            </Button>
                          )}
                      </DeliveryMethod>
                    ))
                  )}
                  <div className="mt-5 border-b border-ui-grey-lightest">
                    <USP exclude={3} />
                  </div>
                </DeliveryMethodGroup>
              </div>
            </section>
          )}
          {isPaymentStepActive && (
            <section
              ref={scrollingElement}
              data-testid="paymentSection"
              className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-8 md:mb-4 lg:col-start-2 lg:col-end-8"
            >
              <h1
                id="payment-step-title"
                className={classNames(
                  'mb-3 px-2 col-start-1 col-end-13',
                  'sm:px-0 sm:col-start-2 sm:col-end-12',
                  'md:col-start-1 md:col-end-8 md:mb-2',
                  'lg:col-start-2 lg:col-end-8',
                  {
                    'mt-4 sm:mt-5 md:mt-0': !isCheckoutHeaderNavigationUpdateStyleEnabled,
                    'mt-2 sm:mt-1 md:-mt-2': isCheckoutHeaderNavigationUpdateStyleEnabled
                  }
                )}
              >
                {t('checkout.payment-step-title')}
              </h1>
              <div
                className={classNames(
                  'px-2 col-start-1 col-end-13',
                  'sm:px-0 sm:col-start-2 sm:col-end-12',
                  'md:col-start-1 md:col-end-8',
                  'lg:col-start-1 lg:col-end-8'
                )}
              >
                <PaymentStepNotifications />
                <PaymentMethodGroup
                  disabled={!validTaxRegions}
                  locale={locale}
                  isAdyenApplePayEnabled={isAdyenApplePayEnabled}
                  className={classNames({
                    'opacity-50 pointer-events-none': !validTaxRegions
                  })}
                >
                  {paymentMethods.map(method => (
                    <PaymentMethod
                      key={method.id}
                      inputName="payment-method"
                      inputValue={method.id}
                      disabled={isLoading}
                      data-testid={`checkoutPaymentMethod-${method.id}`}
                      {...method}
                    >
                      {method.id === PAYMENT_OPTIONS.SIBS_MBWAY && (
                        <MBWayPaymentMethod />
                      )}
                      {method.id === PAYMENT_OPTIONS.ADYEN_MB_WAY && locale && (
                        <AdyenPaymentMethod
                          amount={preservedGrandTotal}
                          locale={locale}
                          paymentMethod={ADYEN_PAYMENT_METHODS.MBWAY}
                          customerReference={customerReference}
                          guestReference={guestId}
                          isLoggedIn={isLoggedIn}
                        />
                      )}
                      {method.id === PAYMENT_OPTIONS.STRIPE_MULTIBANCO && (
                        <StripeMultibancoPaymentMethod
                          stripeMultibancoIsSubmitting={
                            stripeMultibancoIsSubmitting
                          }
                          setStripeMultibancoIsSubmitting={
                            setStripeMultibancoIsSubmitting
                          }
                          createOrderIsLoading={createOrderIsLoading}
                        />
                      )}
                      {method.id === PAYMENT_OPTIONS.SIBS_MULTIBANCO && (
                        <SIBSMultibancoPaymentMethod />
                      )}
                      {method.id === PAYMENT_OPTIONS.ADYEN_MULTIBANCO &&
                        locale && (
                          <AdyenPaymentMethod
                            amount={preservedGrandTotal}
                            locale={locale}
                            paymentMethod={ADYEN_PAYMENT_METHODS.MULTIBANCO}
                            customerReference={customerReference}
                            guestReference={guestId}
                            isLoggedIn={isLoggedIn}
                          />
                        )}
                      {method.id === PAYMENT_OPTIONS.REDSYS_BIZUM && (
                        <BizumPaymentMethod />
                      )}
                      {method.id === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD && (
                        <BraintreePaymentMethod
                          paymentMethod={PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD}
                          isLoggedIn={isLoggedIn}
                          customerReference={customerReference}
                          guestReference={guestId}
                          deliveryAddress={deliveryAddress}
                          billingAddress={billingAddress}
                          customerDetails={customerDetails}
                          setBraintreeDropInInstance={
                            setBraintreeDropInInstance
                          }
                          setBraintreeShowButton={setBraintreeShowButton}
                        />
                      )}
                      {method.id === PAYMENT_OPTIONS.BRAINTREE_PAYPAL && (
                        <BraintreePaymentMethod
                          paymentMethod={PAYMENT_OPTIONS.BRAINTREE_PAYPAL}
                          isLoggedIn={isLoggedIn}
                          customerReference={customerReference}
                          guestReference={guestId}
                          deliveryAddress={deliveryAddress}
                          billingAddress={billingAddress}
                          customerDetails={customerDetails}
                          setBraintreeDropInInstance={
                            setBraintreeDropInInstance
                          }
                          setBraintreeShowButton={setBraintreeShowButton}
                        />
                      )}
                      {method.id === PAYMENT_OPTIONS.ADYEN_CARD && locale && (
                        <AdyenPaymentMethod
                          amount={preservedGrandTotal}
                          locale={locale}
                          paymentMethod={ADYEN_PAYMENT_METHODS.CARD}
                          customerReference={customerReference}
                          guestReference={guestId}
                          isLoggedIn={isLoggedIn}
                          isSetCheckoutDataLoading={
                            !checkoutDataWasError && !checkoutDataWasSuccess
                          }
                          isSmallScreen={isSmallScreen}
                        />
                      )}
                      {method.id === PAYMENT_OPTIONS.ADYEN_APPLE_PAY &&
                        locale && (
                          <AdyenPaymentMethod
                            amount={preservedGrandTotal}
                            locale={locale}
                            paymentMethod={ADYEN_PAYMENT_METHODS.APPLE_PAY}
                            customerReference={customerReference}
                            guestReference={guestId}
                            isLoggedIn={isLoggedIn}
                          />
                        )}
                      {method.id === PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY &&
                        locale && (
                          <AdyenPaymentMethod
                            amount={preservedGrandTotal}
                            locale={locale}
                            paymentMethod={ADYEN_PAYMENT_METHODS.GOOGLE_PAY}
                            customerReference={customerReference}
                            guestReference={guestId}
                            isLoggedIn={isLoggedIn}
                          />
                        )}
                      {method.id ===
                        PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME &&
                        locale && (
                          <AdyenPaymentMethod
                            amount={preservedGrandTotal}
                            locale={locale}
                            paymentMethod={
                              ADYEN_PAYMENT_METHODS.KLARNA_PAY_OVER_TIME
                            }
                            customerReference={customerReference}
                            guestReference={guestId}
                            isLoggedIn={isLoggedIn}
                          />
                        )}
                    </PaymentMethod>
                  ))}
                </PaymentMethodGroup>
                {isLoyaltyAtidaCashEnabled && isLoggedIn && (
                  <div className="sm:mb-4 mb-3">
                    <p className="text-lg-xl font-semibold mt-2 mb-4">
                      {t('checkout.use-atida-cash')}
                    </p>
                    <AtidaCash
                      orderGrandTotal={totals.grandTotal}
                      atidaCashUsed={atidaCashUsed}
                      currency={currency}
                      totalBalance={atidaCashAvailableAmount}
                      checkoutDataPaymentMethods={checkoutDataPaymentMethods}
                      rewardTotal={totals?.rewardTotal}
                      payButtonRef={payButtonRef}
                      checkoutDataPayload={{
                        deliveryAddress:
                          selectedDeliveryMethodName === 'spain-mondial-relay'
                            ? deliveryAddress
                            : ((customerDeliveryAddress as unknown) as Address),
                        billingAddress:
                          billingAddress ??
                          ((customerBillingAddress as unknown) as Address),
                        deliveryMethod:
                          selectedDeliveryMethod ?? currentDeliveryMethod ?? '',
                        taxReference,
                        isBillingSameAsShipping
                      }}
                    />
                  </div>
                )}

                <TermsAndConditions
                  contentBlocks={content?.contentBlocks}
                  translation="checkout.payment.terms-and-condition"
                />
              </div>
            </section>
          )}
          <div
            className={classNames(
              'col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-8 md:col-end-13 ml-36',
              { 'md:mt-8.5 lg:mt-10': activeStep === 1 },
              { 'md:mt-7.5 lg:mt-10': activeStep === 0 || activeStep === -1 }
            )}
          >
            {items && (
              <OrderSummary
                openOrderDetails={openOrderDetails}
                handleOpenOrderDetails={handleOpenOrderDetails}
                basketCouponData={basketCouponData}
                basketDiscounts={noWelcomeCashDiscounts}
                discountTotal={discountTotal}
                numberOfItems={numberOfItems}
                welcomeAtidaCashDiscount={welcomeCashDiscount?.amount}
                currency={currency}
                totalProducts={totals.grandTotal}
                surchargeTotal={totals.surchargeTotal}
                subTotalPrice={totals.subTotal}
                shipping={totals.shippingTotal}
                grandTotal={totals.grandTotal}
                itemTotal={totals.itemTotal}
                rrpDiscountTotal={totals.rrpDiscountTotal}
                couponDiscounts={basketCouponsAmount}
                loadMore={loadMore}
                handleLoadMore={handleLoadMore}
                rewardTotal={totals?.rewardTotal}
                atidaCashUsed={atidaCashUsed}
                payButtonRef={payButtonRef}
                items={
                  items as ((BasketItem & OrderDetailsSingleItem) & {
                    product: Omit<Partial<Product>, 'sku' | 'price'>
                  })[]
                }
                activeStep={activeStep}
                guestStep={guestStep}
                isPaymentStepActive={isPaymentStepActive}
                isDeliveryStepActive={isDeliveryStepActive}
                preservedGrandTotalValue={preservedGrandTotal.value}
                preservedGrandTotalCurrency={preservedGrandTotal.currency}
                braintreeDropInInstance={braintreeDropInInstance}
                braintreeShowButton={braintreeShowButton}
                setIsLoading={setIsLoading}
                deliveryAddress={deliveryAddress}
                billingAddress={billingAddress}
                customerDetails={customerDetails}
                createOrderWasError={createOrderWasError}
                createOrderIsLoading={createOrderIsLoading}
                wasAnyPaymentErrors={hasPaymentStepError}
                isLoggedIn={isLoggedIn}
                customerReference={customerReference}
                guestReference={guestId}
                checkoutDataWasSuccess={checkoutDataWasSuccess}
                isLoggedInWithAddress={isLoggedInWithAddress}
                handlePaymentProceed={handlePaymentProceed}
                isToPaymentButtonDisabled={isToPaymentButtonDisabled}
                isToPaymentEventNotClickable={isToPaymentEventNotClickable}
              />
            )}
          </div>
        </main>
      )}
      {isAddressSelectorEnabled && (
        <AddressFormModalLayout
          title={t('checkout.address-book.select-delivery-address')}
          isOpen={isAddressModalOpen}
          setIsAddressModalOpen={setIsAddressModalOpen}
          addressModal={addressModal}
        >
          <>
            <Button
              className="h-12 w-full bg-ui-guyabano"
              onClick={() => {
                push('/account/address-book?address=new')
              }}
              icon={<Add className="icon-16" />}
              variant="add-address"
            >
              {t('account.address-book.add-new-address')}
            </Button>
            {addresses && (
              <AddressList
                locale={locale}
                initialAddresses={addresses as CustomerAddress[]}
                reference={customerReference}
                companyName={customerDetails?.company}
                isMinified={true}
                updateAddress={updateAddress}
                deleteAddress={handleDeleteAddress}
                updateIsPending={false}
                setIsAddressModalOpen={setIsAddressModalOpen}
                setSelectedAddress={setSelectedAddress}
                setShowCheckoutNotification={() => {
                  // This method is only used on address book
                  return
                }}
              />
            )}
          </>
        </AddressFormModalLayout>
      )}
    </>
  )
}

Checkout.Layout = (page: JSX.Element) => (
  <AuthGuard>
    <MinimalPageLayout reducedVerticalMargin withStepper>
      {page}
    </MinimalPageLayout>
  </AuthGuard>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION,
    FeatureFlag.CHECKOUT_PAYMENT_BIZUM,
    FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_VISA_MASTER,
    FeatureFlag.CHECKOUT_PAYMENT_SIBS_MULTIBANCO,
    FeatureFlag.CHECKOUT_PAYMENT_STRIPE_MULTIBANCO,
    FeatureFlag.CHECKOUT_PAYMENT_SIBS_MBWAY,
    FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_PAYPAL,
    FeatureFlag.CHECKOUT_ADDRESS_BOOK_ADDRESS_SELECTOR,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_PAYMENT_METHODS,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_GOOGLE_PAY,
    FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_APPLE_PAY,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_KLARNA_PAY_OVER_TIME,
    FeatureFlag.BASKET_PROMOTIONAL_ITEMS_PRICE_ZERO,
    FeatureFlag.CHECKOUT_MISSING_ADDRESS_FORM,
    FeatureFlag.CHECKOUT_HEADER_NAVIGATION_UPDATE_STYLE,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_REQUESTED_TEST_ACQUIRER_RESPONSE_CODE,
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_MB_WAY,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_MULTIBANCO,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_CARD,
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_SHOPPER_STATEMENT,
    FeatureFlag.LOYALTY_WELCOME_ATIDA_CASH_DISCOUNT_KEY,
    FeatureFlag.CHECKOUT_DELIVERY_MONDIAL_RELAY,
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_APPLE_PAY_DISABLED_ON_LARGE_SCREEN,
    FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_VISA_MASTER_3DS_V2,
    FeatureFlag.CHECKOUT_DELIVERY_STICKY_CTA_BUTTON
  ])

  store.dispatch(pageContentTrigger({ slug: getPageUrlSlug(context) }))

  await store.dispatch({
    type: 'page-content',
    [WAIT_FOR_ACTION]: pageContentFulfill().type
  })

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default Checkout
