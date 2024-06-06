import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useMemo,
  BaseSyntheticEvent,
  useRef
} from 'react'
import AdyenCheckout from '@adyen/adyen-web'
import { AdyenCheckoutConfiguration } from '~domains/checkout/config/adyen-checkout-configuration'
import '@adyen/adyen-web/dist/adyen.css'
import type {
  AdyenAmount,
  AdyenPaymentDetailsState,
  AdyenPaymentMethodsResponseData,
  AdyenResponseData,
  AdyenSubmitEvent
} from '~domains/checkout/types'
import {
  adyenPaymentSetError,
  createMultiplePaymentsSetError,
  adyenPaymentTrigger,
  createOrderRequest,
  createOrderTrigger,
  selectAdyenDetails,
  selectBillingAddress,
  selectDeliveryAddress,
  selectDeliveryMethod,
  selectOrderId,
  selectOrderItems,
  selectOrderExpenses,
  selectOrderPaymentsData,
  selectAdyenPaymentMethodsData,
  selectAtidaCashUsed,
  createMultiplePaymentsTrigger,
  selectOrderInternalPaymentReference,
  selectOrderLoyaltyPaymentReference,
  setIsValidPaymentMethod,
  adyenPaymentDetailsTrigger,
  selectMultiplePaymentsDetailsAdyen,
  selectAdyenDetailsAction,
  selectMultiplePaymentsDetailsAdyenMultibancoPaymentRef,
  selectMultiplePaymentsDetailsAdyenMultibancoPaymentAmount,
  selectMultiplePaymentsDetailsAdyenMultibancoPaymentEntity,
  selectMultiplePaymentsDetailsAdyenMultibancoExpirationDate,
  selectAdyenMultibancoPaymentRef,
  selectAdyenMultibancoPaymentAmount,
  selectAdyenMultibancoPaymentEntity,
  selectAdyenMultibancoExpirationDate,
  selectTotalAmount,
  selectIsValidPaymentMethod,
  selectAdyenPaymentMethodsIsLoading
} from '~domains/checkout'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomerDetails } from '~domains/account/selectors/customer'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { useRouter } from 'next/router'
import {
  triggerReportAddPaymentInfo,
  triggerReportCheckoutStepCompleted,
  triggerReportOrderCompleted,
  triggerReportProductOrdered
} from '~domains/analytics'
import {
  ADYEN_PAYMENT_METHODS,
  PAYMENT_OPTIONS
} from '~config/constants/payments'
import {
  cookieStorageMechanism,
  getIso2CodeFromLocale,
  logger,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  getOrderPaymentsData,
  getMultibancoExpirationDate,
  getMultibancoCookie
} from '~domains/checkout/helpers'
import { PaymentMethods } from '@adyen/adyen-web/dist/types/types'
import { useTranslation } from 'react-i18next'
import { Notification } from '~components/atoms/Notification'
import {
  selectAdyenPaymentDetailsData,
  selectAdyenPaymentDetailsWasError
} from '~domains/checkout/selectors/adyen-payment-details'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { useFormatPrice } from '~domains/product'
import classNames from 'classnames'
import { AdyenStoredCards } from '~components/atoms/AdyenStoredCard'
import { AdyenCardHeader } from '~components/atoms/AdyenCardHeader'
import { clearAndSetTimeout } from '~helpers/clearAndSetTimeout'
import { MOBILE_ADD_NEW_CARD_BUTTON_HEIGHT } from '~config/constants/adyen-stored-cards-add-new-card-button-height'

export type AdyenPaymentMethodProps = ComponentPropsWithoutRef<'span'> & {
  amount: AdyenAmount
  locale: string
  paymentMethod: string
  customerReference?: string
  guestReference?: string
  isLoggedIn: boolean
  isSetCheckoutDataLoading?: boolean
  isSmallScreen?: boolean
}

export const AdyenPaymentMethod: FunctionComponent<AdyenPaymentMethodProps> = ({
  amount,
  locale,
  paymentMethod,
  customerReference,
  guestReference,
  isLoggedIn,
  isSetCheckoutDataLoading,
  isSmallScreen
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { push } = useRouter()
  const formatPrice = useFormatPrice()
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const currentDeliveryMethod = useSelector(selectDeliveryMethod)
  const customer = useSelector(selectCustomerDetails)
  const billingAddress = useSelector(selectBillingAddress)
  const orderId = useSelector(selectOrderId)
  const orderItems = useSelector(selectOrderItems)
  const orderExpenses = useSelector(selectOrderExpenses)
  const orderPaymentsData = useSelector(selectOrderPaymentsData)
  const orderInternalPaymentReference = useSelector(
    selectOrderInternalPaymentReference
  )
  const orderLoyaltyPaymentReference = useSelector(
    selectOrderLoyaltyPaymentReference
  )
  const adyenPaymentDetails = useSelector(selectAdyenDetails)
  const multiplePaymentsDetailsAdyen = useSelector(
    selectMultiplePaymentsDetailsAdyen
  )
  const adyenPaymentDetailsAction = useSelector(selectAdyenDetailsAction)
  const adyenPaymentMethodsData = useSelector(
    selectAdyenPaymentMethodsData
  ) as AdyenPaymentMethodsResponseData
  const atidaCashUsed = useSelector(selectAtidaCashUsed)
  const adyenPaymentDetailsWasError = useSelector(
    selectAdyenPaymentDetailsWasError
  )
  const adyenPaymentDetailsData = useSelector(selectAdyenPaymentDetailsData)
  const multiplePaymentsDetailsAdyenMultibancoPaymentRef = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoPaymentRef
  )
  const multiplePaymentsDetailsAdyenMultibancoPaymentAmount = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoPaymentAmount
  )
  const multiplePaymentsDetailsAdyenMultibancoPaymentEntity = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoPaymentEntity
  )
  const multiplePaymentsDetailsAdyenMultibancoExpirationDate = useSelector(
    selectMultiplePaymentsDetailsAdyenMultibancoExpirationDate
  )

  const adyenMultibancoPaymentRef = useSelector(selectAdyenMultibancoPaymentRef)
  const adyenMultibancoPaymentAmount = useSelector(
    selectAdyenMultibancoPaymentAmount
  )
  const adyenMultibancoPaymentEntity = useSelector(
    selectAdyenMultibancoPaymentEntity
  )
  const adyenMultibancoExpirationDate = useSelector(
    selectAdyenMultibancoExpirationDate
  )

  const orderTotalAmount = useSelector(selectTotalAmount)?.amount ?? 0
  const isPaymentMethodValid = useSelector(selectIsValidPaymentMethod)
  const adyenPaymentMethodsIsLoading = useSelector(
    selectAdyenPaymentMethodsIsLoading
  )

  const [
    adyenPaymentResponse,
    setAdyenPaymentResponse
  ] = useState<AdyenSubmitEvent>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const [storedCardIndex, setStoredCardIndex] = useState<undefined | number>(
    undefined
  )
  const [instancesArray, setInstancesArray] = useState<
    InstanceType<PaymentMethods[keyof PaymentMethods]>[]
  >([])
  const [isNewCardFormVisible, setIsNewCardFormVisible] = useState(true)
  const [isStoredCardsListVisible, setIsStoredCardsListVisible] = useState(true)
  const [isCardEditActive, setIsCardEditActive] = useState(false)

  //The following four states are for animation purposes
  const [isRadioInputAnimation, setIsRadioInputAnimation] = useState(false)
  const [isDeleteIconAnimation, setIsDeleteIconAnimation] = useState(false)
  const [isNewCardFormAnimation, setIsNewCardFormAnimation] = useState(false)
  const [isStoredCardsListAnimation, setIsStoredCardsListAnimation] = useState(
    false
  )

  const isFirstRender = useRef(true)
  const storedCardsComponentRef = useRef<HTMLDivElement>(null)
  const amountRef = useRef(amount.value)
  const isNewCardValidRef = useRef(false)
  const isAtidaCashAddingRef = useRef(false)
  const cardStateRef = useRef()
  const lastSelectedCardIndexRef = useRef<undefined | number>(undefined)

  const translations = useMemo(
    () => ({
      [`${locale}`]: {
        ['creditCard.numberField.placeholder']: t(
          'checkout.payment.adyen-card-number-field-placeholder'
        ),
        ['creditCard.expiryDateField.placeholder']: t(
          'checkout.payment.adyen-card-expiry-date-field-placeholder'
        )
      }
    }),
    [locale, t]
  )

  const customerData = useMemo(
    () => ({
      customer_reference: customerReference ?? guestReference ?? '',
      email: (customer?.email || deliveryAddress?.email) ?? '',
      name: `${customer?.firstName ?? billingAddress?.firstName} ${
        customer?.firstName ?? billingAddress?.lastName
      }`,
      is_guest: !isLoggedIn
    }),
    [
      billingAddress?.firstName,
      billingAddress?.lastName,
      customer?.email,
      customer?.firstName,
      customerReference,
      deliveryAddress?.email,
      guestReference,
      isLoggedIn
    ]
  )
  const isNewRelicEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC
  )

  const requestedTestAcquirerResponseCode = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_REQUESTED_TEST_ACQUIRER_RESPONSE_CODE
  )

  const mbWayShopperStatement = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_ADYEN_SHOPPER_STATEMENT
  )

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const paymentMethodConverter = (paymentMethod: string) => {
    switch (paymentMethod) {
      case ADYEN_PAYMENT_METHODS.GOOGLE_PAY:
        return PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY
      case ADYEN_PAYMENT_METHODS.APPLE_PAY:
        return PAYMENT_OPTIONS.ADYEN_APPLE_PAY
      case ADYEN_PAYMENT_METHODS.KLARNA_PAY_OVER_TIME:
        return PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME
      case ADYEN_PAYMENT_METHODS.MBWAY:
        return PAYMENT_OPTIONS.ADYEN_MB_WAY
      case ADYEN_PAYMENT_METHODS.MULTIBANCO:
        return PAYMENT_OPTIONS.ADYEN_MULTIBANCO
      case ADYEN_PAYMENT_METHODS.CARD:
        return PAYMENT_OPTIONS.ADYEN_CARD
      default:
        return PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY
    }
  }

  const adyenPaymentMethod = paymentMethodConverter(paymentMethod)

  const hasAnyStoredCard =
    adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD &&
    !!adyenPaymentMethodsData?.storedPaymentMethods?.length

  const isNewCardContainerFullOpacity =
    isNewCardFormVisible && isNewCardFormAnimation

  const isStoredCardsContainerFullOpacity =
    isStoredCardsListVisible && isStoredCardsListAnimation

  const storedCardsListHeight =
    (adyenPaymentMethodsData.storedPaymentMethods?.length ?? 1) *
    (isSmallScreen ? 94 : 80)

  const handleAdyenPaymentSubmit = useCallback(
    async (e: AdyenSubmitEvent) => {
      isNewRelicEnabled &&
        logger.error(
          {
            message: 'payment Response',
            name: 'payment Response'
          },
          JSON.stringify({
            ...e,
            customerRef: customerReference ?? guestReference,
            basketAmount: amount,
            isLoggedIn,
            paymentMethod: adyenPaymentMethod
          })
        )
      setAdyenPaymentResponse(e)
      setTimeout(() => {
        dispatch(
          createOrderTrigger({
            deliveryAddress: deliveryAddress,
            deliveryMethod: currentDeliveryMethod,
            customer: {
              salutation: deliveryAddress?.salutation,
              email: (customer?.email || deliveryAddress?.email) ?? '',
              firstName: billingAddress?.firstName ?? '',
              lastName: billingAddress?.lastName ?? ''
            },
            billingAddress: billingAddress,
            payments: [
              {
                paymentSelection: 'atidaPaymentLoyalty',
                paymentMethodName: 'LoyaltySpend',
                paymentProviderName: 'AtidaPayment',
                amount: atidaCashUsed ? atidaCashUsed : 0
              },
              {
                paymentSelection: 'atidaPaymentInternal',
                paymentMethodName: 'atidaPaymentInternal',
                paymentProviderName: 'AtidaPayment'
              }
            ]
          })
        )
      }, 0)
      orderId &&
        (await dispatch({
          type: 'checkout',
          [WAIT_FOR_ACTION]: createOrderRequest().type
        }))
      setIsSubmitting(true)
    },
    [
      atidaCashUsed,
      adyenPaymentMethod,
      amount,
      billingAddress,
      currentDeliveryMethod,
      customer?.email,
      customerReference,
      deliveryAddress,
      dispatch,
      guestReference,
      isLoggedIn,
      isNewRelicEnabled,
      orderId
    ]
  )

  const handleAdyenPaymentChange = useCallback(
    (e: AdyenSubmitEvent) => {
      isNewRelicEnabled &&
        logger.error(
          {
            message: 'payment Change',
            name: 'payment Change'
          },
          JSON.stringify({
            ...e,
            customerRef: customerReference ?? guestReference,
            basketAmount: amount,
            isLoggedIn,
            paymentMethod: adyenPaymentMethod
          })
        )
      e.isValid &&
        dispatch(
          triggerReportAddPaymentInfo({
            payment_method: adyenPaymentMethod,
            success: true
          })
        )
      if (e.isStoredCard) {
        return
      }
      dispatch(setIsValidPaymentMethod(e.isValid))
      if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD && !e.isValid) {
        isNewCardValidRef.current = false
      }
    },
    [
      dispatch,
      adyenPaymentMethod,
      amount,
      customerReference,
      guestReference,
      isLoggedIn,
      isNewRelicEnabled
    ]
  )

  const handleAdyenPaymentOnClick = useCallback(() => {
    isNewRelicEnabled &&
      logger.error(
        {
          message: 'payment Request',
          name: 'payment Request'
        },
        JSON.stringify({
          customerRef: customerReference ?? guestReference,
          basketAmount: amount,
          isLoggedIn,
          paymentMethod: adyenPaymentMethod
        })
      )
  }, [
    adyenPaymentMethod,
    amount,
    customerReference,
    guestReference,
    isLoggedIn,
    isNewRelicEnabled
  ])

  const handleAdyenPaymentDetails = useCallback(
    (e: AdyenPaymentDetailsState) => {
      if (
        adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_MB_WAY ||
        adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD
      ) {
        dispatch(
          adyenPaymentDetailsTrigger({
            ...e.data,
            customer: {
              customer_reference: String(customerReference ?? guestReference),
              email: (customer?.email || deliveryAddress?.email) ?? '',
              name: `${customer?.firstName ?? billingAddress?.firstName} ${
                customer?.firstName ?? billingAddress?.lastName
              }`,
              is_guest: !isLoggedIn
            }
          })
        )
      }
    },
    [
      adyenPaymentMethod,
      billingAddress,
      customer,
      customerReference,
      deliveryAddress,
      dispatch,
      guestReference,
      isLoggedIn
    ]
  )

  const handleAdyenPaymentError = useCallback(
    (e: Error) => {
      isNewRelicEnabled &&
        logger.error(
          {
            name: e?.name ?? 'adyen Payment Error',
            message: e?.message ?? 'adyen Payment Error'
          },
          JSON.stringify({ ...e, adyenPaymentMethod })
        )
      if (
        adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD &&
        e.name === 'NETWORK_ERROR'
      ) {
        return
      }
      isLoyaltyAtidaCashEnabled
        ? dispatch(createMultiplePaymentsSetError())
        : dispatch(adyenPaymentSetError({}))
    },
    [dispatch, isNewRelicEnabled, isLoyaltyAtidaCashEnabled, adyenPaymentMethod]
  )

  const adyenCheckoutConfiguration = useMemo(
    () =>
      AdyenCheckoutConfiguration(
        amount,
        locale,
        adyenPaymentMethodsData,
        handleAdyenPaymentSubmit,
        handleAdyenPaymentChange,
        handleAdyenPaymentOnClick,
        handleAdyenPaymentDetails,
        handleAdyenPaymentError,
        isLoggedIn,
        translations
      ),
    [
      amount,
      handleAdyenPaymentChange,
      handleAdyenPaymentSubmit,
      handleAdyenPaymentOnClick,
      locale,
      adyenPaymentMethodsData,
      handleAdyenPaymentDetails,
      handleAdyenPaymentError,
      isLoggedIn,
      translations
    ]
  )

  const finalizeCheckout = useCallback(() => {
    cookieStorageMechanism().set(
      getOrderPaymentsData(),
      JSON.stringify({
        method_code: adyenPaymentMethod,
        is_redirected: true,
        order_id: orderId,
        customer: customerData
      }),
      {
        expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
      }
    )
    if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_MULTIBANCO) {
      const priceToPay = formatPrice(
        isLoyaltyAtidaCashEnabled
          ? multiplePaymentsDetailsAdyenMultibancoPaymentAmount?.value
          : adyenMultibancoPaymentAmount?.value,
        amount.currency
      ).asOne

      const multibancoTotalAmount = priceCurrencyFormatter(
        priceToPay,
        amount.currency
      )

      const multibancoExpirationDateFormatted = getMultibancoExpirationDate(
        isLoyaltyAtidaCashEnabled
          ? multiplePaymentsDetailsAdyenMultibancoExpirationDate
          : adyenMultibancoExpirationDate,
        locale
      )

      cookieStorageMechanism().set(
        getMultibancoCookie(),
        JSON.stringify({
          payment_ref: isLoyaltyAtidaCashEnabled
            ? multiplePaymentsDetailsAdyenMultibancoPaymentRef
            : adyenMultibancoPaymentRef,
          total_amount: multibancoTotalAmount,
          payment_entity: isLoyaltyAtidaCashEnabled
            ? multiplePaymentsDetailsAdyenMultibancoPaymentEntity
            : adyenMultibancoPaymentEntity,
          expiration_date_formatted: multibancoExpirationDateFormatted,
          order_id: orderId
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
        }
      )
    }
    dispatch(
      triggerReportProductOrdered({
        payment_method: adyenPaymentMethod,
        is_redirected: true
      })
    )
    dispatch(
      triggerReportOrderCompleted({
        payment_method: adyenPaymentMethod,
        is_redirected: true
      })
    )
    dispatch(
      triggerReportCheckoutStepCompleted({
        payment_method: adyenPaymentMethod
      })
    )
  }, [
    adyenPaymentMethod,
    customerData,
    dispatch,
    orderId,
    adyenMultibancoPaymentEntity,
    adyenMultibancoPaymentRef,
    isLoyaltyAtidaCashEnabled,
    adyenMultibancoPaymentAmount?.value,
    adyenMultibancoExpirationDate,
    multiplePaymentsDetailsAdyenMultibancoExpirationDate,
    multiplePaymentsDetailsAdyenMultibancoPaymentAmount?.value,
    locale,
    amount.currency,
    formatPrice,
    multiplePaymentsDetailsAdyenMultibancoPaymentEntity,
    multiplePaymentsDetailsAdyenMultibancoPaymentRef
  ])

  const handleStoredCardClick = useCallback((index: number) => {
    setStoredCardIndex(index)
    lastSelectedCardIndexRef.current = index
  }, [])

  const handleStoredCardBlur = (
    event: BaseSyntheticEvent & { relatedTarget: { id: string } | null }
  ) => {
    if (
      event?.relatedTarget?.id !== 'unique-sticky-pay-now-button' &&
      event?.relatedTarget?.id !== 'unique-pay-now-button'
    ) {
      dispatch(setIsValidPaymentMethod(false))
      setStoredCardIndex(undefined)
    }
  }

  const handleStoredCardHeaderButtonClick = () => {
    if (isNewCardFormVisible) {
      setIsStoredCardsListVisible(true)
      setIsNewCardFormVisible(false)
      setIsCardEditActive(false)
      dispatch(setIsValidPaymentMethod(false))
      return
    }
    if (!isCardEditActive) {
      lastSelectedCardIndexRef.current = undefined
    }
    setIsCardEditActive(prev => !prev)
  }

  const handleAddNewCard = () => {
    setIsNewCardFormVisible(true)
    setIsStoredCardsListVisible(false)
    lastSelectedCardIndexRef.current = undefined
  }

  const restoreState = useCallback(() => {
    dispatch(setIsValidPaymentMethod(false))
    setShouldRender(true)
    isNewCardValidRef.current = false
    isFirstRender.current = true
    if (hasAnyStoredCard) {
      setStoredCardIndex(undefined)
      setIsNewCardFormVisible(true)
      setIsStoredCardsListVisible(true)
      lastSelectedCardIndexRef.current = undefined
    }
  }, [dispatch, hasAnyStoredCard])

  useEffect(() => {
    if (adyenPaymentMethodsIsLoading && hasAnyStoredCard) {
      instancesArray.forEach((_instance, index) => {
        if (index < instancesArray.length - 1) {
          instancesArray[index].unmount()
        }
      })
    }
  }, [adyenPaymentMethodsIsLoading, hasAnyStoredCard, instancesArray])

  useEffect(() => {
    if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) {
      if (isSetCheckoutDataLoading) {
        setShouldRender(false)
        if (instancesArray.length && isNewCardValidRef.current) {
          cardStateRef.current = {
            ...instancesArray[instancesArray.length - 1].state
          }
        }
        if (isNewCardFormVisible) {
          isAtidaCashAddingRef.current = true
          if (isNewCardValidRef.current) {
            dispatch(setIsValidPaymentMethod(false))
          }
        }
      }
      if (!isSetCheckoutDataLoading && amountRef.current !== amount.value) {
        setShouldRender(true)
        amountRef.current = amount.value
      }
    }
  }, [
    dispatch,
    amount,
    isNewCardFormVisible,
    instancesArray,
    isSetCheckoutDataLoading,
    adyenPaymentMethod,
    isStoredCardsListVisible
  ])

  useEffect(() => {
    if (
      shouldRender &&
      (paymentMethod !== ADYEN_PAYMENT_METHODS.CARD ||
        !adyenPaymentMethodsIsLoading)
    ) {
      let checkoutInstance: InstanceType<PaymentMethods[keyof PaymentMethods]>
      const helperInstancesArray: InstanceType<
        PaymentMethods[keyof PaymentMethods]
      >[] = []
      const createCheckout = async () => {
        const checkout = await AdyenCheckout(adyenCheckoutConfiguration)
        if (
          paymentMethod === ADYEN_PAYMENT_METHODS.CARD &&
          storedCardsComponentRef.current
        ) {
          const storedPaymentMethodsArray =
            checkout.paymentMethodsResponse?.storedPaymentMethods

          storedPaymentMethodsArray?.forEach((method, index: number) => {
            checkoutInstance = checkout.create(paymentMethod, method)
            checkoutInstance.mount(`#stored-adyen-card-${index}`)
            helperInstancesArray.push(checkoutInstance)
          })
        }
        checkoutInstance = checkout.create(paymentMethod)
        if (
          paymentMethod === ADYEN_PAYMENT_METHODS.CARD &&
          isNewCardValidRef.current
        ) {
          checkoutInstance.state = {
            ...(typeof cardStateRef.current === 'object'
              ? cardStateRef.current
              : {})
          }
          cardStateRef.current = undefined
        }
        checkoutInstance.mount(`#adyen-${paymentMethod}-container`)
        helperInstancesArray.push(checkoutInstance)
        setInstancesArray(helperInstancesArray)
        if (
          paymentMethod === ADYEN_PAYMENT_METHODS.CARD &&
          typeof lastSelectedCardIndexRef.current === 'number'
        ) {
          handleStoredCardClick(lastSelectedCardIndexRef.current)
          document
            .getElementById(
              `stored-adyen-card-${lastSelectedCardIndexRef.current}`
            )
            ?.focus()
        }
      }
      createCheckout()
    }
  }, [
    adyenCheckoutConfiguration,
    paymentMethod,
    shouldRender,
    handleStoredCardClick,
    adyenPaymentMethodsIsLoading
  ])

  useEffect(() => {
    if (
      orderId &&
      orderPaymentsData &&
      orderPaymentsData[0].amount &&
      isSubmitting &&
      adyenPaymentResponse?.isValid
    ) {
      const adyenPayload = removeUndefinedPropertiesFromObject({
        amount: orderTotalAmount,
        currency: amount.currency,
        reference: orderId,
        paymentMethod: adyenPaymentResponse.data?.paymentMethod,
        browserInfo: adyenPaymentResponse.data?.browserInfo,
        riskData: adyenPaymentResponse.data?.riskData,
        clientStateDataIndicator:
          adyenPaymentResponse.data?.clientStateDataIndicator,
        billingAddress: {
          country: billingAddress?.iso2Code ?? '',
          street: billingAddress?.address1 ?? '',
          houseNumberOrName: billingAddress?.houseNumber ?? '',
          postalCode: billingAddress?.zipCode ?? '',
          city: billingAddress?.city ?? '',
          stateOrProvince: billingAddress?.province ?? billingAddress?.district
        },
        shopperEmail: (customer?.email || deliveryAddress?.email) ?? '',
        customer: customerData,
        countryCode: getIso2CodeFromLocale(locale),
        items:
          paymentMethod === ADYEN_PAYMENT_METHODS.KLARNA_PAY_OVER_TIME
            ? orderItems
            : undefined,
        expenses:
          paymentMethod === ADYEN_PAYMENT_METHODS.KLARNA_PAY_OVER_TIME
            ? orderExpenses
            : undefined,
        additionalData: {
          allow3DS2: 'true',
          ...(requestedTestAcquirerResponseCode > -1 && {
            RequestedTestAcquirerResponseCode: `${requestedTestAcquirerResponseCode}`
          })
        },
        ...(paymentMethod === ADYEN_PAYMENT_METHODS.MBWAY &&
          mbWayShopperStatement > 0 && {
            shopperStatement: `MBWay shopper statement-c${mbWayShopperStatement}`
          }),
        ...(paymentMethod === ADYEN_PAYMENT_METHODS.KLARNA_PAY_OVER_TIME && {
          telephoneNumber: billingAddress?.phone ?? ''
        }),
        storePaymentMethod: adyenPaymentResponse.data?.storePaymentMethod
      })
      if (isLoyaltyAtidaCashEnabled) {
        dispatch(
          createMultiplePaymentsTrigger({
            [PAYMENT_OPTIONS.ADYEN]: {
              ...adyenPayload,
              origin_payment_ref: orderInternalPaymentReference ?? '',
              shopperInteraction: 'ContAuth',
              recurringProcessingModel: 'CardOnFile',
              shopperReference: customerData.customer_reference
            },
            ...(orderLoyaltyPaymentReference && {
              [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: {
                amount: atidaCashUsed ?? 0,
                invoice_ref: orderId,
                origin_payment_ref: orderLoyaltyPaymentReference,
                customer: customerData
              }
            })
          })
        )
        return
      }
      dispatch(adyenPaymentTrigger(adyenPayload))
    }
  }, [
    adyenPaymentResponse,
    amount.currency,
    amount.value,
    billingAddress,
    customer,
    customerData,
    customerReference,
    deliveryAddress?.email,
    dispatch,
    guestReference,
    isLoggedIn,
    isSubmitting,
    locale,
    orderId,
    orderPaymentsData,
    paymentMethod,
    orderItems,
    orderExpenses,
    requestedTestAcquirerResponseCode,
    mbWayShopperStatement,
    isLoyaltyAtidaCashEnabled,
    atidaCashUsed,
    orderInternalPaymentReference,
    orderLoyaltyPaymentReference,
    orderTotalAmount
  ])

  useEffect(() => {
    if (
      isLoyaltyAtidaCashEnabled
        ? multiplePaymentsDetailsAdyen
        : adyenPaymentDetails
    ) {
      if (
        isLoyaltyAtidaCashEnabled
          ? (multiplePaymentsDetailsAdyen as AdyenResponseData).action
          : (adyenPaymentDetails as AdyenResponseData).action
      ) {
        if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_MULTIBANCO) {
          finalizeCheckout()
          push(`/confirmation/${orderId}`)
          return
        }
        const handleRedirection = async () => {
          finalizeCheckout()
          const checkout = await AdyenCheckout(adyenCheckoutConfiguration)
          checkout
            .createFromAction(
              isLoyaltyAtidaCashEnabled
                ? (multiplePaymentsDetailsAdyen as AdyenResponseData).action
                : (adyenPaymentDetails as AdyenResponseData).action
            )
            .mount(`#adyen-${paymentMethod}-container`)
        }
        handleRedirection()
        if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) {
          setShouldRender(false)
        }
        return
      }
      if (
        isLoyaltyAtidaCashEnabled
          ? (multiplePaymentsDetailsAdyen as AdyenResponseData).resultCode ===
            'Authorised'
          : (adyenPaymentDetails as AdyenResponseData).resultCode ===
            'Authorised'
      ) {
        finalizeCheckout()
        push(`/confirmation/${orderId}`)
        return
      }
      isLoyaltyAtidaCashEnabled
        ? dispatch(
            createMultiplePaymentsSetError(
              paymentMethod === ADYEN_PAYMENT_METHODS.MBWAY
                ? t('checkout.error.verify-payment-information')
                : undefined
            )
          )
        : dispatch(
            adyenPaymentSetError({
              ...(paymentMethod === ADYEN_PAYMENT_METHODS.MBWAY && {
                message: 'checkout.error.verify-payment-information'
              })
            })
          )
    }
  }, [
    adyenCheckoutConfiguration,
    adyenPaymentDetails,
    adyenPaymentDetailsAction,
    adyenPaymentMethod,
    amount,
    customerData,
    dispatch,
    finalizeCheckout,
    locale,
    orderId,
    paymentMethod,
    push,
    isLoyaltyAtidaCashEnabled,
    multiplePaymentsDetailsAdyen,
    t
  ])

  useEffect(() => {
    if (
      hasAnyStoredCard &&
      (isLoyaltyAtidaCashEnabled
        ? multiplePaymentsDetailsAdyen?.action
        : adyenPaymentDetails?.action)
    ) {
      setIsNewCardFormVisible(true)
      setIsStoredCardsListVisible(false)
    }
  }, [
    adyenPaymentDetails,
    hasAnyStoredCard,
    isLoyaltyAtidaCashEnabled,
    multiplePaymentsDetailsAdyen
  ])

  useEffect(() => {
    if (adyenPaymentDetailsWasError && adyenPaymentResponse) {
      if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) {
        restoreState()
      }
      isLoyaltyAtidaCashEnabled
        ? dispatch(
            createMultiplePaymentsSetError(
              t('checkout.error.change-payment-method')
            )
          )
        : dispatch(
            adyenPaymentSetError({
              message: 'checkout.error.change-payment-method'
            })
          )
      setIsSubmitting(false)
    }
  }, [
    adyenPaymentDetailsWasError,
    dispatch,
    isLoyaltyAtidaCashEnabled,
    t,
    adyenPaymentMethod,
    adyenPaymentResponse,
    restoreState
  ])

  useEffect(() => {
    if (adyenPaymentDetailsData) {
      if (adyenPaymentDetailsData.resultCode === 'Refused') {
        if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) {
          restoreState()
        }
        isNewRelicEnabled &&
          logger.error(
            {
              name: 'adyen payment Refusal Reason',
              message: 'adyen payment Refusal Reason'
            },
            JSON.stringify({
              adyenPaymentDetailsData
            })
          )
        isLoyaltyAtidaCashEnabled
          ? dispatch(
              createMultiplePaymentsSetError(
                t('checkout.error.change-payment-method')
              )
            )
          : dispatch(
              adyenPaymentSetError({
                message: 'checkout.error.change-payment-method'
              })
            )
        return
      }
      if (adyenPaymentDetailsData.resultCode === 'Error') {
        // We are first logging the refusal reason before being able to handle them properly with PLUS-7167 ticket
        isNewRelicEnabled &&
          logger.error(
            {
              message: 'adyen MBWay payment Refusal Reason',
              name: 'adyen MBWay payment Error'
            },
            JSON.stringify({
              adyenPaymentDetailsData
            })
          )
        isLoyaltyAtidaCashEnabled
          ? dispatch(createMultiplePaymentsSetError())
          : dispatch(adyenPaymentSetError({}))
        return
      }
      push(`/confirmation/${orderId}`)
    }
  }, [
    adyenPaymentDetailsData,
    dispatch,
    isNewRelicEnabled,
    orderId,
    push,
    isLoyaltyAtidaCashEnabled,
    t,
    adyenPaymentMethod,
    restoreState
  ])

  useEffect(() => {
    if (
      adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD &&
      isNewCardFormVisible &&
      isPaymentMethodValid &&
      !isNewCardValidRef.current &&
      !isFirstRender.current
    ) {
      isNewCardValidRef.current = true
    }
  }, [adyenPaymentMethod, isPaymentMethodValid, isNewCardFormVisible])

  useEffect(() => {
    if (isNewCardFormVisible && isNewCardValidRef.current) {
      dispatch(setIsValidPaymentMethod(true))
    }
  }, [dispatch, isNewCardFormVisible, instancesArray])

  useEffect(() => {
    if (
      adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD &&
      typeof storedCardIndex === 'number' &&
      !isPaymentMethodValid
    ) {
      dispatch(setIsValidPaymentMethod(true))
    }
  }, [adyenPaymentMethod, storedCardIndex, dispatch, isPaymentMethodValid])

  useEffect(() => {
    if (instancesArray.length) {
      const customButtonSubmit = () => {
        if (typeof storedCardIndex === 'number') {
          instancesArray[storedCardIndex].submit()
          return
        }
        instancesArray[instancesArray.length - 1].submit()
      }
      const customButton = document.getElementById('unique-pay-now-button')
      const customStickyButton = document.getElementById(
        'unique-sticky-pay-now-button'
      )
      if (customButton) {
        customButton.addEventListener('click', customButtonSubmit)
      }
      if (customStickyButton) {
        customStickyButton.addEventListener('click', customButtonSubmit)
      }
      if (instancesArray.length > 1) {
        if (isFirstRender.current) {
          handleStoredCardClick(0)
          document
            .getElementById('checkoutPaymentMethod-adyen_card')
            ?.classList.remove('ring')
          document
            .getElementById('stored-adyen-card-0')
            ?.focus({ preventScroll: true })
        }
        if (!isAtidaCashAddingRef.current) {
          setIsNewCardFormVisible(false)
        } else {
          isAtidaCashAddingRef.current = false
        }
      }
      if (adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) {
        isFirstRender.current = false
      }
      return () => {
        if (customButton) {
          customButton.removeEventListener('click', customButtonSubmit)
        }
        if (customStickyButton) {
          customStickyButton.removeEventListener('click', customButtonSubmit)
        }
      }
    }
  }, [
    dispatch,
    storedCardIndex,
    instancesArray,
    handleStoredCardClick,
    adyenPaymentMethod
  ])

  useEffect(() => {
    const animate = async () => {
      if (hasAnyStoredCard && isCardEditActive) {
        setIsDeleteIconAnimation(true)
        await clearAndSetTimeout(500, 'editStoredCardAnimation')
        setIsRadioInputAnimation(false)
        return
      }
      setIsRadioInputAnimation(true)
      await clearAndSetTimeout(500, 'editStoredCardAnimation')
      setIsDeleteIconAnimation(false)
    }
    animate()
  }, [hasAnyStoredCard, isCardEditActive])

  useEffect(() => {
    const animate = async () => {
      if (hasAnyStoredCard && isStoredCardsListVisible) {
        setIsStoredCardsListAnimation(true)
        await clearAndSetTimeout(500, 'switchFormsAnimation')
        setIsNewCardFormAnimation(false)
        return
      }
      setIsNewCardFormAnimation(true)
      await clearAndSetTimeout(500, 'switchFormsAnimation')
      setIsStoredCardsListAnimation(false)
    }
    animate()
  }, [hasAnyStoredCard, isStoredCardsListVisible])

  return (
    <>
      {adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_MB_WAY && (
        <Notification
          type="info"
          title={t('checkout.mbway.notification.title')}
          content={t('checkout.mbway.notification.content')}
          className={'mb-3.5'}
        />
      )}
      {hasAnyStoredCard &&
        !(isLoyaltyAtidaCashEnabled
          ? multiplePaymentsDetailsAdyen?.action
          : adyenPaymentDetails?.action) && (
          <AdyenCardHeader
            isNewCardFormVisible={isNewCardFormVisible}
            isStoredCardsListVisible={isStoredCardsListVisible}
            isCardEditActive={isCardEditActive}
            isRadioInputAnimation={isRadioInputAnimation}
            isDeleteIconAnimation={isDeleteIconAnimation}
            isNewCardFormAnimation={isNewCardFormAnimation}
            isStoredCardsListAnimation={isStoredCardsListAnimation}
            isSavedPaymentOptionsTextFullOpacity={
              isStoredCardsContainerFullOpacity
            }
            isAddANewCardTextFullOpacity={isNewCardContainerFullOpacity}
            isSwitchingFormsDisabled={isSetCheckoutDataLoading}
            isFirstRender={isFirstRender.current}
            handleStoredCardHeaderButtonClick={
              handleStoredCardHeaderButtonClick
            }
          />
        )}
      <div
        className={classNames({
          'relative overflow-hidden': hasAnyStoredCard
        })}
      >
        <div
          {...(hasAnyStoredCard &&
            !isSmallScreen &&
            !isNewCardContainerFullOpacity && {
              style: {
                transform: `translateY(${
                  storedCardsListHeight + MOBILE_ADD_NEW_CARD_BUTTON_HEIGHT
                }px)`
              }
            })}
          className={classNames({
            'absolute top-0 right-0 left-0 transition duration-500': hasAnyStoredCard,
            'translate-y-0':
              hasAnyStoredCard &&
              (isLoyaltyAtidaCashEnabled
                ? !!multiplePaymentsDetailsAdyen?.action
                : !!adyenPaymentDetails?.action),
            'xs-only:grid xs-only:grid-cols-1 xs-only:overflow-scroll':
              adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD &&
              (isLoyaltyAtidaCashEnabled
                ? multiplePaymentsDetailsAdyen
                : adyenPaymentDetails),
            hidden:
              hasAnyStoredCard &&
              !(isNewCardFormVisible || isNewCardFormAnimation),
            'p-3':
              adyenPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD &&
              isNewCardFormVisible,
            'opacity-100': hasAnyStoredCard && isNewCardContainerFullOpacity,
            'opacity-0 p-3': hasAnyStoredCard && !isNewCardContainerFullOpacity,
            relative:
              hasAnyStoredCard &&
              isNewCardFormVisible &&
              !isStoredCardsListAnimation &&
              !isFirstRender.current
          })}
          id={`adyen-${paymentMethod}-container`}
          data-testid={`adyen-${paymentMethod}-container`}
        ></div>
        {hasAnyStoredCard &&
          (isStoredCardsListVisible ||
            isStoredCardsListAnimation ||
            isAtidaCashAddingRef.current) && (
            <AdyenStoredCards
              isCardEditActive={isCardEditActive}
              isClickable={
                !(
                  (isLoyaltyAtidaCashEnabled
                    ? multiplePaymentsDetailsAdyen
                    : adyenPaymentDetails) ||
                  isCardEditActive ||
                  isNewCardFormVisible
                )
              }
              storedCardIndex={storedCardIndex}
              isRadioInputAnimation={isRadioInputAnimation}
              isDeleteIconAnimation={isDeleteIconAnimation}
              isFirstRender={isFirstRender.current}
              isStoredCardsContainerFullOpacity={
                isStoredCardsContainerFullOpacity
              }
              storedCardsListHeight={storedCardsListHeight}
              isSmallScreen={isSmallScreen}
              storedPaymentMethods={
                adyenPaymentMethodsData.storedPaymentMethods
              }
              isStoredCardsListVisible={isStoredCardsListVisible}
              isSwitchingFormsDisabled={isSetCheckoutDataLoading}
              isActionRequired={
                isLoyaltyAtidaCashEnabled
                  ? !!multiplePaymentsDetailsAdyen?.action
                  : !!adyenPaymentDetails?.action
              }
              storedCardsComponentRef={storedCardsComponentRef}
              isAtidaCashAdding={
                isNewCardFormVisible && isAtidaCashAddingRef.current
              }
              handleStoredCardClick={handleStoredCardClick}
              handleStoredCardBlur={handleStoredCardBlur}
              handleAddNewCard={handleAddNewCard}
            />
          )}
      </div>
    </>
  )
}
