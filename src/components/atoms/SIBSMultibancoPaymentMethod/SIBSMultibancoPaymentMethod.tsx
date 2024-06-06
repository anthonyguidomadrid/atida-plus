import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState,
  useCallback
} from 'react'
import classNames from 'classnames'
import { Button } from '~components/atoms/Button'
import { useSelector, useDispatch } from 'react-redux'
import {
  createOrderTrigger,
  selectDeliveryMethod,
  selectBillingAddress,
  selectDeliveryAddress,
  selectOrderPaymentsData,
  selectOrderId,
  selectCreateOrderWasError,
  selectSIBSMultibancoPaymentRef,
  selectSIBSMultibancoPaymentInternalRef,
  selectSIBSMultibancoPaymentEntity,
  selectSIBSMultibancoPaymentAmount,
  selectSIBSMultibancoExpirationDate,
  sibsMultibancoPaymentTrigger,
  createOrderRequest,
  selectWasAnyPaymentStepError,
  createPaymentMethodClearDetails,
  selectAtidaCashUsed
} from '~domains/checkout'
import {
  selectCustomerDetails,
  selectCustomerReference,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { useTranslation } from 'react-i18next'
import { cookieStorageMechanism, logger } from '~helpers'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { useRouter } from 'next/router'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { triggerReportAddPaymentInfo } from '~domains/analytics'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { getGuestName } from '~domains/account'
import {
  getOrderPaymentsData,
  getMultibancoExpirationDate,
  getMultibancoCookie
} from '~domains/checkout/helpers'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { selectGrandTotal } from '~domains/basket'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { useFormatPrice } from '~domains/product'
import { getCurrency } from '~helpers/get-currency'

export type SIBSMultibancoPaymentMethodType = ComponentPropsWithoutRef<'span'>

export type SIBSMultibancoPaymentMethodProps = SIBSMultibancoPaymentMethodType

export const SIBSMultibancoPaymentMethod: FunctionComponent<SIBSMultibancoPaymentMethodProps> = () => {
  const { push, locale } = useRouter()
  const dispatch = useDispatch()
  const formatPrice = useFormatPrice()
  const currentDeliveryMethod = useSelector(selectDeliveryMethod)
  const customer = useSelector(selectCustomerDetails)
  const { t } = useTranslation()
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const billingAddress = useSelector(selectBillingAddress)
  const orderPaymentsData = useSelector(selectOrderPaymentsData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const orderId = useSelector(selectOrderId)
  const createOrderWasError = useSelector(selectCreateOrderWasError)
  const wasAnyPaymentErrors = useSelector(selectWasAnyPaymentStepError)
  const sibsMultibancoInternalPaymentRef = useSelector(
    selectSIBSMultibancoPaymentInternalRef
  )
  const customerReference = useSelector(selectCustomerReference)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const guestCookie = cookieStorageMechanism().get(getGuestName())
  const anonymousId = guestCookie && JSON.parse(guestCookie)?.guestId
  const grandTotal = useSelector(selectGrandTotal)
  const atidaCashUsed = useSelector(selectAtidaCashUsed)
  const sibsMultibancoPaymentRef = useSelector(selectSIBSMultibancoPaymentRef)
  const sibsMultibancoPaymentEntity = useSelector(
    selectSIBSMultibancoPaymentEntity
  )
  const sibsMultibancoPaymentAmount = useSelector(
    selectSIBSMultibancoPaymentAmount
  )
  const sibsMultibancoExpirationDate = useSelector(
    selectSIBSMultibancoExpirationDate
  )

  const [basketAmount, setBasketAmount] = useState(0)

  const isNewRelicEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC
  )

  useEffect(() => {
    if (isSubmitting && (createOrderWasError || wasAnyPaymentErrors)) {
      setIsSubmitting(false)
    }
  }, [createOrderWasError, wasAnyPaymentErrors, isSubmitting])

  useEffect(() => {
    dispatch(
      triggerReportAddPaymentInfo({
        payment_method: PAYMENT_OPTIONS.SIBS_MULTIBANCO,
        success: true
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (grandTotal) {
      setBasketAmount(grandTotal)
    }
  }, [grandTotal])

  const handleSIBSMultibancoPaymentSubmit = useCallback(async () => {
    isNewRelicEnabled &&
      logger.error(
        {
          message: 'payment Request',
          name: 'payment Request'
        },
        JSON.stringify({
          customerRef: customerReference ?? anonymousId,
          basketAmount: basketAmount ?? grandTotal,
          isLoggedIn,
          paymentMethod: PAYMENT_OPTIONS.SIBS_MULTIBANCO
        })
      )
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
  }, [
    atidaCashUsed,
    dispatch,
    billingAddress,
    currentDeliveryMethod,
    customer,
    deliveryAddress,
    orderId,
    anonymousId,
    grandTotal,
    customerReference,
    isLoggedIn,
    isNewRelicEnabled,
    basketAmount
  ])

  useEffect(() => {
    if (
      orderId &&
      orderPaymentsData &&
      orderPaymentsData[0].amount &&
      isSubmitting
    ) {
      dispatch(
        sibsMultibancoPaymentTrigger({
          amount: orderPaymentsData[0].amount,
          orderId: orderId,
          customer: {
            customer_reference: customerReference ?? anonymousId,
            email: (customer?.email || deliveryAddress?.email) ?? '',
            name: `${customer?.firstName ?? billingAddress?.firstName} ${
              customer?.lastName ?? billingAddress?.lastName
            }`,
            is_guest: !isLoggedIn
          }
        })
      )
    }
  }, [
    dispatch,
    orderId,
    orderPaymentsData,
    isSubmitting,
    customerReference,
    customer,
    anonymousId,
    deliveryAddress,
    billingAddress,
    isLoggedIn
  ])

  useEffect(() => {
    dispatch(createPaymentMethodClearDetails())
  }, [dispatch])

  useEffect(() => {
    if (
      sibsMultibancoInternalPaymentRef !== undefined &&
      orderPaymentsData !== undefined
    ) {
      cookieStorageMechanism().set(
        getOrderPaymentsData(),
        JSON.stringify({
          paymentIdentifier: orderPaymentsData[0].paymentReference,
          payment_token: sibsMultibancoInternalPaymentRef,
          method_code: PAYMENT_OPTIONS.SIBS_MULTIBANCO,
          order_id: orderId
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
        }
      )
      const currency = getCurrency(locale)
      const priceToPay = formatPrice(sibsMultibancoPaymentAmount, currency)
        .asOne
      const multibancoTotalAmount = priceCurrencyFormatter(priceToPay, currency)
      const multibancoExpirationDateFormatted = getMultibancoExpirationDate(
        sibsMultibancoExpirationDate,
        locale
      )
      cookieStorageMechanism().set(
        getMultibancoCookie(),
        JSON.stringify({
          payment_ref: sibsMultibancoPaymentRef,
          total_amount: multibancoTotalAmount,
          payment_entity: sibsMultibancoPaymentEntity,
          expiration_date_formatted: multibancoExpirationDateFormatted,
          order_id: orderId
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
        }
      )
      push(`/confirmation/${orderId}`)
    }
  }, [
    sibsMultibancoInternalPaymentRef,
    sibsMultibancoPaymentRef,
    orderPaymentsData,
    push,
    orderId,
    sibsMultibancoPaymentEntity,
    formatPrice,
    locale,
    sibsMultibancoExpirationDate,
    sibsMultibancoPaymentAmount
  ])

  return (
    <Button
      variant="secondary"
      data-testid={'sibs-multibanco-payment-button'}
      className={classNames('w-full sm:w-35 my-3 mx-auto')}
      onClick={handleSIBSMultibancoPaymentSubmit}
      isLoading={isSubmitting}
    >
      {t('checkout.pay-now')}
    </Button>
  )
}
