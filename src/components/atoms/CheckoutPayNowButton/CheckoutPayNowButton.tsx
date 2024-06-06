import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import {
  createOrderTrigger,
  selectDeliveryMethod,
  selectOrderId,
  createOrderRequest,
  selectOrderPaymentsData,
  bizumPaymentTrigger,
  createPaymentMethodClearDetails,
  selectSelectedPaymentMethod,
  selectBrainTreeToken,
  createPaymentMethodTrigger,
  createPaymentMethodSetMethodCode,
  selectTotalAmount,
  createPaymentMethodSetError,
  createDeviceDataTrigger,
  selectAdyenIsLoading,
  selectAtidaCashUsed,
  selectOrderLoyaltyPaymentReference,
  selectOrderInternalPaymentReference,
  createMultiplePaymentsTrigger,
  createMultiplePaymentsSetError,
  createMultiplePaymentsResetState,
  selectIsValidPaymentMethod,
  selectMultiplePaymentsIsLoading,
  adyenPaymentDetailsResetState
} from '~domains/checkout'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { useTranslation } from 'react-i18next'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { Button } from '~components/atoms/Button'
import { triggerReportAddPaymentInfo } from '~domains/analytics'
import { logger } from '~helpers'
import type {
  PaymentMethodPayload,
  Dropin as DropInInstance
} from 'braintree-web-drop-in'
import {
  handleThreeDSecureErrorMessage,
  ThreeDSecureInfoStatus
} from '~helpers/handleThreeDSecureErrorMessage'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  normalizeNonPrintableCharacters,
  stripSlashAndBackslashFromAddress
} from '~helpers/normalizeString'
import {
  IThreeDSecureVerifyPayload,
  ThreeDSecureError,
  Address,
  PaymentLoad
} from '~domains/checkout/types'
import { Customer } from '~domains/account/types'
import { useUserAgent } from 'next-useragent'
import { StickyMobileCTA } from '~components/atoms/StickyMobileCTA'
import { getSelectedPaymentMethodName } from '~domains/checkout/helpers'
import { isTaxRegionValid } from '~helpers/isTaxRegionValid'
import { useRouter } from 'next/router'

export type CheckoutPayNowButtonProps = ComponentPropsWithoutRef<'button'> & {
  className?: string
  preservedGrandTotalValue?: number
  preservedGrandTotalCurrency?: string
  braintreeDropInInstance?: DropInInstance | null
  braintreeShowButton?: boolean
  setIsLoading: (isLoading: boolean) => void
  deliveryAddress?: Address
  billingAddress?: Address
  customerDetails?: Partial<Customer>
  createOrderWasError?: boolean
  createOrderIsLoading?: boolean
  wasAnyPaymentErrors?: boolean
  isLoggedIn?: boolean
  customerReference?: string
  guestReference?: string
  isSticky?: boolean
  payButtonRef?: RefObject<HTMLDivElement>
}
export const CheckoutPayNowButton: FunctionComponent<CheckoutPayNowButtonProps> = ({
  className,
  preservedGrandTotalValue = 0,
  preservedGrandTotalCurrency,
  braintreeDropInInstance,
  braintreeShowButton,
  setIsLoading,
  deliveryAddress,
  billingAddress,
  customerDetails,
  createOrderWasError,
  createOrderIsLoading,
  wasAnyPaymentErrors,
  isLoggedIn,
  customerReference,
  guestReference,
  payButtonRef
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const currentDeliveryMethod = useSelector(selectDeliveryMethod)
  const orderId = useSelector(selectOrderId)
  const orderPaymentsData = useSelector(selectOrderPaymentsData)
  const orderInternalPaymentReference = useSelector(
    selectOrderInternalPaymentReference
  )
  const orderLoyaltyPaymentReference = useSelector(
    selectOrderLoyaltyPaymentReference
  )
  const clientBrainTreeToken = useSelector(selectBrainTreeToken)
  const adyenIsLoading = useSelector(selectAdyenIsLoading)
  const multiplePaymentsIsLoading = useSelector(selectMultiplePaymentsIsLoading)
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod)
  const totalAmount = useSelector(selectTotalAmount)?.amount
  const atidaCashUsed = useSelector(selectAtidaCashUsed)
  const isPaymentMethodValid = useSelector(selectIsValidPaymentMethod)
  const methodCode = useRef('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reportPaymentInfoEntered, setReportPaymentInfoEntered] = useState(
    false
  )
  const [isPayBtnDisabled, setPayBtnDisabled] = useState(true)

  const userAgent = useUserAgent(
    typeof window !== 'undefined' ? window.navigator.userAgent : ''
  )

  const selectedPaymentMethodName = getSelectedPaymentMethodName(
    selectedPaymentMethod
  )

  const isMultipleTaxRegionsValidationEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION
  )

  const isBraintreePaymentMethodVisaMaster3DSV2Enabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_VISA_MASTER_3DS_V2
  )

  const validTaxRegions = useMemo(
    () =>
      !isMultipleTaxRegionsValidationEnabled ||
      (deliveryAddress &&
        billingAddress &&
        isTaxRegionValid(deliveryAddress, billingAddress, locale)),
    [
      deliveryAddress,
      billingAddress,
      locale,
      isMultipleTaxRegionsValidationEnabled
    ]
  )

  const buttonText = selectedPaymentMethodName
    ? t('checkout.unique-pay-now-button.using-payment-method', {
        selectedPaymentMethodName: t(selectedPaymentMethodName)
      })
    : t('checkout.unique-pay-now-button.no-payment-method-selected')

  const isAdyenPaymentMethod =
    selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY ||
    selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_APPLE_PAY ||
    selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME ||
    selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_MB_WAY ||
    selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_MULTIBANCO ||
    selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD

  const isBrainTreePaymenMethod =
    selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD ||
    selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_PAYPAL

  const isDisabled =
    !validTaxRegions ||
    !selectedPaymentMethod ||
    (selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_PAYPAL &&
      !braintreeShowButton) ||
    (isBrainTreePaymenMethod && (isPayBtnDisabled || !clientBrainTreeToken)) ||
    ((selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_MB_WAY ||
      selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) &&
      !isPaymentMethodValid)

  const threeDSecure = useMemo(
    () => ({
      amount: `${preservedGrandTotalValue / 100}`,
      email: customerDetails?.email?.slice(0, 255),
      billingAddress: {
        givenName: normalizeNonPrintableCharacters(
          billingAddress?.firstName
        )?.slice(0, 50),
        surname: normalizeNonPrintableCharacters(
          billingAddress?.lastName
        )?.slice(0, 50),
        phoneNumber: billingAddress?.phone?.replace(/\D/g, '').slice(0, 20),
        streetAddress: stripSlashAndBackslashFromAddress(
          billingAddress?.address1
        ),
        extendedAddress: stripSlashAndBackslashFromAddress(
          billingAddress?.address2
        ),
        locality: billingAddress?.city?.slice(0, 50),
        postalCode: billingAddress?.zipCode?.slice(0, 10),
        countryCodeAlpha2: billingAddress?.iso2Code?.slice(0, 2)
      },
      additionalInformation: {
        shippingAddress: {
          streetAddress: stripSlashAndBackslashFromAddress(
            deliveryAddress?.address1
          ),
          extendedAddress: stripSlashAndBackslashFromAddress(
            deliveryAddress?.address2
          ),
          locality: deliveryAddress?.city?.slice(0, 50),
          postalCode: deliveryAddress?.zipCode?.slice(0, 10),
          countryCodeAlpha2: deliveryAddress?.iso2Code?.slice(0, 2)
        },
        shippingGivenName: deliveryAddress?.firstName?.slice(0, 50),
        shippingSurname: deliveryAddress?.lastName?.slice(0, 50),
        shippingPhone: deliveryAddress?.phone?.replace(/\D/g, '').slice(0, 20)
      },
      ...(isBraintreePaymentMethodVisaMaster3DSV2Enabled && { version: 2 })
    }),
    [
      billingAddress,
      customerDetails,
      deliveryAddress,
      preservedGrandTotalValue,
      isBraintreePaymentMethodVisaMaster3DSV2Enabled
    ]
  )

  const customer = useMemo(
    () => ({
      customer_reference: customerReference ?? guestReference ?? '',
      email: (customerDetails?.email || deliveryAddress?.email) ?? '',
      name: `${customerDetails?.firstName ?? billingAddress?.firstName} ${
        customerDetails?.lastName ?? billingAddress?.lastName
      }`,
      is_guest: !isLoggedIn
    }),
    [
      billingAddress,
      customerDetails,
      customerReference,
      deliveryAddress,
      guestReference,
      isLoggedIn
    ]
  )

  const isNewRelicEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC
  )

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const handleBraintreeCreditCardPaymentSubmit = useCallback(() => {
    !reportPaymentInfoEntered &&
      dispatch(
        triggerReportAddPaymentInfo({
          payment_method: selectedPaymentMethod,
          success: true
        })
      )
    braintreeDropInInstance?.requestPaymentMethod(
      {
        threeDSecure
      },
      (
        err,
        payload: PaymentMethodPayload & {
          threeDSecureInfo?: IThreeDSecureVerifyPayload
        }
      ) => {
        const error = err as ThreeDSecureError
        const braintreePayload = payload as PaymentMethodPayload & {
          vaulted: boolean
        }
        isNewRelicEnabled &&
          logger.error(
            {
              message: 'payment Response',
              name: 'payment Response'
            },
            JSON.stringify({
              originalErrorCode:
                error?._braintreeWebError?.details?.originalError?.code ?? '',
              originalErrorDescription:
                error?._braintreeWebError?.details?.originalError
                  ?.description ?? '',
              btErrorMessage: error?.message,
              threeDSecureErrorCode: error?._braintreeWebError?.code ?? '',
              threeDSErrorMessage: error?._braintreeWebError?.message ?? '',
              customerRef: customerReference ?? guestReference,
              basketAmount: preservedGrandTotalValue,
              threeDSecureInfoLiabilityShifted:
                payload?.threeDSecureInfo?.liabilityShifted ?? '',
              threeDSecureInfoLiabilityShiftPossible:
                payload?.threeDSecureInfo?.liabilityShiftPossible ?? '',
              threeDSecureInfoStatus: payload?.threeDSecureInfo?.status ?? '',
              paymentType: payload?.type,
              vaultedCard: braintreePayload?.vaulted,
              isLoggedIn,
              paymentMethod: PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD,
              threeDSecureRequestedVersion:
                payload?.threeDSecureInfo?.threeDSecureVersion
            })
          )
        if (err || !payload?.threeDSecureInfo?.liabilityShifted) {
          setIsLoading(true)
          isLoyaltyAtidaCashEnabled
            ? dispatch(createMultiplePaymentsResetState())
            : dispatch(createPaymentMethodClearDetails())
          if (
            error?.details?.originalError.code === 1050 ||
            error?.details?.originalError?.details?.httpStatus === 422
          ) {
            const errorMessage = handleThreeDSecureErrorMessage(
              `${
                error?.details.originalError.code === 1050
                  ? error?.details.originalError.code
                  : error?.details?.originalError?.details?.httpStatus
              }` as ThreeDSecureInfoStatus
            )
            isLoyaltyAtidaCashEnabled
              ? dispatch(createMultiplePaymentsSetError(t(errorMessage)))
              : dispatch(createPaymentMethodSetError(t(errorMessage)))
            return
          }
          if (payload?.threeDSecureInfo?.status) {
            const errorMessage = handleThreeDSecureErrorMessage(
              payload.threeDSecureInfo.status as ThreeDSecureInfoStatus
            )
            isLoyaltyAtidaCashEnabled
              ? dispatch(createMultiplePaymentsSetError(t(errorMessage)))
              : dispatch(createPaymentMethodSetError(t(errorMessage)))
            return
          }
          isLoyaltyAtidaCashEnabled
            ? dispatch(createMultiplePaymentsSetError())
            : dispatch(createPaymentMethodSetError())
          return
        }

        sendBraintreeDeviceData(payload?.deviceData)
        dispatchBraintreeCreateOrderTrigger()
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    braintreeDropInInstance,
    threeDSecure,
    dispatch,
    customerReference,
    guestReference,
    isLoggedIn,
    preservedGrandTotalValue,
    isNewRelicEnabled,
    atidaCashUsed,
    currentDeliveryMethod
  ])

  const handleBraintreePaypalPaymentSubmit = useCallback(() => {
    !reportPaymentInfoEntered &&
      dispatch(
        triggerReportAddPaymentInfo({
          payment_method: selectedPaymentMethod,
          success: true
        })
      )
    setIsLoading(true)
    isLoyaltyAtidaCashEnabled
      ? dispatch(createMultiplePaymentsResetState())
      : dispatch(createPaymentMethodClearDetails())
    braintreeDropInInstance?.requestPaymentMethod((err, payload) => {
      if (err) {
        dispatch(createPaymentMethodSetError())
        return
      }
      sendBraintreeDeviceData(payload?.deviceData)
      dispatchBraintreeCreateOrderTrigger()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [braintreeDropInInstance, dispatch, atidaCashUsed, currentDeliveryMethod])

  const handleRedsysBizumPaymentSubmit = useCallback(async () => {
    setTimeout(() => {
      dispatch(
        createOrderTrigger({
          deliveryAddress: deliveryAddress,
          deliveryMethod: currentDeliveryMethod,
          customer: {
            salutation: deliveryAddress?.salutation,
            email: (customerDetails?.email || deliveryAddress?.email) ?? '',
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
  }, [
    dispatch,
    billingAddress,
    currentDeliveryMethod,
    customerDetails,
    deliveryAddress,
    orderId,
    atidaCashUsed
  ])

  const dispatchBraintreeCreateOrderTrigger = () => {
    dispatch(
      createOrderTrigger({
        deliveryAddress,
        deliveryMethod: currentDeliveryMethod,
        customer: {
          salutation: deliveryAddress?.salutation,
          email: (customerDetails?.email || deliveryAddress?.email) ?? '',
          firstName: billingAddress?.firstName ?? '',
          lastName: billingAddress?.lastName ?? ''
        },
        billingAddress,
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
    orderId &&
      dispatch({
        type: 'checkout',
        [WAIT_FOR_ACTION]: createOrderRequest().type
      })
    setIsSubmitting(true)
  }

  const sendBraintreeDeviceData = (deviceData: string | undefined) => {
    deviceData &&
      dispatch(
        createDeviceDataTrigger({
          customer_browser: userAgent?.browser || '',
          device_data: deviceData,
          customer: {
            customer_reference: customerReference ?? guestReference ?? '',
            email: (customerDetails?.email || deliveryAddress?.email) ?? '',
            name: `${customerDetails?.firstName ?? billingAddress?.firstName} ${
              customerDetails?.lastName ?? billingAddress?.lastName
            }`,
            is_guest: !isLoggedIn
          }
        })
      )
  }

  const handlePayment = () => {
    isNewRelicEnabled &&
      logger.error(
        {
          message: 'payment Request',
          name: 'payment Request'
        },
        JSON.stringify({
          customerRef: customerReference ?? guestReference,
          basketAmount: preservedGrandTotalValue,
          isLoggedIn,
          paymentMethod: selectedPaymentMethod
        })
      )
    if (selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD) {
      handleBraintreeCreditCardPaymentSubmit()
    }
    if (selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_PAYPAL) {
      handleBraintreePaypalPaymentSubmit()
    }
    if (selectedPaymentMethod === PAYMENT_OPTIONS.REDSYS_BIZUM) {
      handleRedsysBizumPaymentSubmit()
    }
    if (selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) {
      dispatch(adyenPaymentDetailsResetState())
    }
  }

  useEffect(() => {
    if (
      orderId &&
      braintreeDropInInstance &&
      isSubmitting &&
      isBrainTreePaymenMethod
    ) {
      const initialiseBraintreeDropInInstance = async () => {
        const rawPayload = await braintreeDropInInstance.requestPaymentMethod()
        const braintreePayload = {
          method_code: selectedPaymentMethod,
          data: {
            payment_nonce: rawPayload.nonce,
            amount: totalAmount ?? 0,
            order_id: orderId
          },
          customer
        }

        if (isLoyaltyAtidaCashEnabled) {
          dispatch(
            createMultiplePaymentsTrigger({
              [selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
                ? PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
                : PAYMENT_OPTIONS.BRAINTREE_PAYPAL]: {
                ...braintreePayload,
                origin_payment_ref: orderInternalPaymentReference
              } as PaymentLoad & {
                origin_payment_ref: string
              },
              ...(orderLoyaltyPaymentReference && {
                [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: {
                  amount: atidaCashUsed ?? 0,
                  invoice_ref: orderId,
                  origin_payment_ref: orderLoyaltyPaymentReference,
                  customer
                }
              })
            })
          )
          return
        }
        dispatch(createPaymentMethodTrigger(braintreePayload))
        dispatch(
          createPaymentMethodSetMethodCode({
            methodCode: selectedPaymentMethod
          })
        )
      }
      initialiseBraintreeDropInInstance()
    }
  }, [
    dispatch,
    braintreeDropInInstance,
    orderId,
    isSubmitting,
    totalAmount,
    isBrainTreePaymenMethod,
    selectedPaymentMethod,
    customer,
    isLoyaltyAtidaCashEnabled,
    atidaCashUsed,
    orderInternalPaymentReference,
    orderLoyaltyPaymentReference
  ])

  useEffect(() => {
    if (isBrainTreePaymenMethod) {
      methodCode.current = selectedPaymentMethod
      setPayBtnDisabled(true)
    }
  }, [selectedPaymentMethod, isBrainTreePaymenMethod])

  useEffect(() => {
    if (
      methodCode.current === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD ||
      methodCode.current === PAYMENT_OPTIONS.BRAINTREE_PAYPAL
    ) {
      if (braintreeDropInInstance?.isPaymentMethodRequestable()) {
        // This will be true if you generated the client token with a customer ID and there is a saved payment method available to tokenize with that customer.
        setPayBtnDisabled(false)
      }

      braintreeDropInInstance?.on('paymentMethodRequestable', event => {
        setPayBtnDisabled(false)
        if (event.paymentMethodIsSelected) {
          dispatch(
            triggerReportAddPaymentInfo({
              payment_method: methodCode.current,
              success: true
            })
          )
          setReportPaymentInfoEntered(true)
        }
      })

      braintreeDropInInstance?.on('noPaymentMethodRequestable', () => {
        if (braintreeDropInInstance?.isPaymentMethodRequestable()) {
          dispatch(
            triggerReportAddPaymentInfo({
              payment_method: methodCode.current,
              success: false
            })
          )
        }
        setPayBtnDisabled(true)
      })
    }
  }, [dispatch, braintreeDropInInstance])

  useEffect(() => {
    if (
      orderId &&
      orderPaymentsData &&
      orderPaymentsData[0].amount &&
      isSubmitting &&
      selectedPaymentMethod === PAYMENT_OPTIONS.REDSYS_BIZUM
    ) {
      const bizumPayload = {
        amount: orderPaymentsData[0].amount,
        invoice_ref: orderId,
        customer
      }

      if (isLoyaltyAtidaCashEnabled) {
        dispatch(
          createMultiplePaymentsTrigger({
            [PAYMENT_OPTIONS.REDSYS_BIZUM]: {
              ...bizumPayload,
              origin_payment_ref: orderInternalPaymentReference ?? ''
            },
            ...(orderLoyaltyPaymentReference && {
              [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: {
                amount: atidaCashUsed ?? 0,
                invoice_ref: orderId,
                origin_payment_ref: orderLoyaltyPaymentReference,
                customer
              }
            })
          })
        )
        return
      }
      dispatch(bizumPaymentTrigger(bizumPayload))
    }
  }, [
    dispatch,
    orderId,
    orderPaymentsData,
    isSubmitting,
    customerReference,
    customerDetails,
    guestReference,
    deliveryAddress,
    billingAddress,
    isLoggedIn,
    selectedPaymentMethod,
    customer,
    isLoyaltyAtidaCashEnabled,
    atidaCashUsed,
    orderInternalPaymentReference,
    orderLoyaltyPaymentReference
  ])

  useEffect(() => {
    isLoyaltyAtidaCashEnabled
      ? dispatch(createMultiplePaymentsResetState())
      : dispatch(createPaymentMethodClearDetails())
  }, [dispatch, isLoyaltyAtidaCashEnabled])

  useEffect(() => {
    if (isSubmitting && (createOrderWasError || wasAnyPaymentErrors)) {
      setIsSubmitting(false)
    }
  }, [createOrderWasError, wasAnyPaymentErrors, isSubmitting])

  useEffect(() => {
    if (
      (createOrderIsLoading ||
        (isLoyaltyAtidaCashEnabled
          ? multiplePaymentsIsLoading
          : adyenIsLoading)) &&
      isAdyenPaymentMethod
    ) {
      setIsSubmitting(true)
    }
  }, [
    createOrderIsLoading,
    isAdyenPaymentMethod,
    adyenIsLoading,
    isLoyaltyAtidaCashEnabled,
    multiplePaymentsIsLoading
  ])

  return (
    <>
      <Button
        variant="secondary"
        id="unique-pay-now-button"
        data-testid={'unique-pay-now-button'}
        className={classNames('w-full h-6 mb-1', className)}
        onClick={handlePayment}
        isLoading={isSubmitting}
        disabled={isDisabled}
      >
        {buttonText}
      </Button>
      <StickyMobileCTA
        handleSubmit={handlePayment}
        isDisabled={isDisabled}
        grandTotal={preservedGrandTotalValue}
        currency={preservedGrandTotalCurrency}
        isLoading={isSubmitting}
        checkoutPageButtonText={buttonText}
        isCheckoutPage
        payButtonRef={payButtonRef}
      />
    </>
  )
}
