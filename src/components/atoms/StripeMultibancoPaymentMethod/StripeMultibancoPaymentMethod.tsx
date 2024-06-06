import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  BaseSyntheticEvent,
  useEffect,
  useState
} from 'react'
import classNames from 'classnames'
import { createClient, logger, cookieStorageMechanism } from '~helpers'
import { Button } from '~components/atoms/Button'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {
  createOrderTrigger,
  selectDeliveryMethod,
  selectBillingAddress,
  selectDeliveryAddress,
  selectOrderPaymentsData,
  selectOrderId,
  selectPaymentMethodRef,
  selectCreateOrderWasError,
  selectWasAnyPaymentStepError,
  createOrderRequest,
  createPaymentMethodClearDetails,
  selectAtidaCashUsed
} from '~domains/checkout'
import {
  selectCustomerDetails,
  selectCustomerReference,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { useTranslation } from 'react-i18next'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import {
  triggerReportAddPaymentInfo,
  triggerReportOrderCompleted,
  triggerReportProductOrdered
} from '~domains/analytics'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { getGuestName } from '~domains/account'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { selectGrandTotal } from '~domains/basket'
import { getOrderPaymentsData } from '~domains/checkout/helpers'

export type StripeMultibancoPaymentMethodType = ComponentPropsWithoutRef<'span'> & {
  stripeMultibancoIsSubmitting: boolean
  createOrderIsLoading: boolean
  setStripeMultibancoIsSubmitting: (
    stripeMultibancoPaymentMethodIsSubmitting: boolean
  ) => void
}

export type StripeMultibancoPaymentMethodProps = StripeMultibancoPaymentMethodType

export const StripeMultibancoPaymentMethod: FunctionComponent<StripeMultibancoPaymentMethodProps> = ({
  stripeMultibancoIsSubmitting,
  createOrderIsLoading,
  setStripeMultibancoIsSubmitting
}) => {
  const { locale, push, route } = useRouter()
  const dispatch = useDispatch()
  const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
  const currentDeliveryMethod = useSelector(selectDeliveryMethod)
  const customer = useSelector(selectCustomerDetails)
  const { t } = useTranslation()
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const billingAddress = useSelector(selectBillingAddress)
  const orderPaymentsData = useSelector(selectOrderPaymentsData)
  const orderId = useSelector(selectOrderId)
  const paymentMethodRef = useSelector(selectPaymentMethodRef)
  const createOrderWasError = useSelector(selectCreateOrderWasError)
  const wasAnyPaymentErrors = useSelector(selectWasAnyPaymentStepError)
  const customerReference = useSelector(selectCustomerReference)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const guestCookie = cookieStorageMechanism().get(getGuestName())
  const anonymousId = guestCookie && JSON.parse(guestCookie)?.guestId
  const grandTotal = useSelector(selectGrandTotal)
  const atidaCashUsed = useSelector(selectAtidaCashUsed)

  const [basketAmount, setBasketAmount] = useState(0)

  const isNewRelicEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC
  )

  useEffect(() => {
    if (
      orderPaymentsData !== undefined &&
      stripeMultibancoIsSubmitting &&
      !createOrderIsLoading
    ) {
      const { amount, paymentReference } = orderPaymentsData[0]
      const localePrepend = locale && `/${locale}`
      const returnUrl = `${window.location.origin}${localePrepend}${route}/multibanco-status?orderId=${orderId}`

      cookieStorageMechanism().set(
        getOrderPaymentsData(),
        JSON.stringify({
          paymentIdentifier: paymentReference,
          payment_token: paymentMethodRef,
          method_code: PAYMENT_OPTIONS.STRIPE_MULTIBANCO,
          is_redirected: true,
          order_id: orderId
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
        }
      )

      dispatch(
        triggerReportProductOrdered({
          payment_method: PAYMENT_OPTIONS.STRIPE_MULTIBANCO,
          is_redirected: true
        })
      )
      dispatch(
        triggerReportOrderCompleted({
          payment_method: PAYMENT_OPTIONS.STRIPE_MULTIBANCO,
          is_redirected: true
        })
      )

      client
        .post('/api/checkout/stripe-multibanco-data', {
          amount,
          paymentReference,
          returnUrl,
          orderId,
          customer: {
            customer_reference: customerReference ?? anonymousId,
            email: (customer?.email || deliveryAddress?.email) ?? '',
            name: `${customer?.firstName ?? billingAddress?.firstName} ${
              customer?.lastName ?? billingAddress?.lastName
            }`,
            is_guest: !isLoggedIn
          }
        })
        .then(({ data }) => push(data.redirect_url))
        .catch(error => {
          logger.error(error)
          setStripeMultibancoIsSubmitting(false)
        })
    }
  }, [
    dispatch,
    client,
    locale,
    orderId,
    orderPaymentsData,
    paymentMethodRef,
    push,
    route,
    stripeMultibancoIsSubmitting,
    setStripeMultibancoIsSubmitting,
    customerReference,
    customer,
    anonymousId,
    deliveryAddress,
    createOrderIsLoading,
    billingAddress,
    isLoggedIn
  ])

  useEffect(() => {
    dispatch(
      triggerReportAddPaymentInfo({
        payment_method: PAYMENT_OPTIONS.STRIPE_MULTIBANCO,
        success: true
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (
      stripeMultibancoIsSubmitting &&
      (createOrderWasError || wasAnyPaymentErrors)
    ) {
      setStripeMultibancoIsSubmitting(false)
    }
  }, [
    createOrderWasError,
    wasAnyPaymentErrors,
    stripeMultibancoIsSubmitting,
    setStripeMultibancoIsSubmitting
  ])

  useEffect(() => {
    dispatch(createPaymentMethodClearDetails())
  }, [dispatch])

  useEffect(() => {
    if (grandTotal) {
      setBasketAmount(grandTotal)
    }
  }, [grandTotal])

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault()

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
          paymentMethod: PAYMENT_OPTIONS.STRIPE_MULTIBANCO
        })
      )

    // TODO: can most of this data be passed via the saga?? duplication
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
    setStripeMultibancoIsSubmitting(true)
  }

  return (
    <Button
      variant="secondary"
      data-testid={'stripe-multibanco-payment-button'}
      className={classNames('w-full sm:w-35 my-3 mx-auto')}
      onClick={handleSubmit}
      isLoading={stripeMultibancoIsSubmitting}
    >
      {t('checkout.pay-now')}
    </Button>
  )
}
