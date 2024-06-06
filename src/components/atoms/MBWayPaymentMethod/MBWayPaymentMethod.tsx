import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  mbWayPaymentTrigger,
  createOrderTrigger,
  selectOrderId,
  selectDeliveryMethod,
  selectDeliveryAddress,
  selectBillingAddress,
  selectOrderPaymentsData,
  selectMBWayPaymentRef,
  selectWasAnyPaymentStepError,
  createOrderRequest,
  createPaymentMethodClearDetails,
  selectAtidaCashUsed
} from '~domains/checkout'
import { selectCreateOrderWasError } from '~domains/checkout/selectors/create-order'
import {
  selectCustomerDetails,
  selectCustomerReference,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { PhoneNumberForm } from '~components/organisms/PhoneNumberForm'
import { COUNTRY_CODES } from '~config/constants/phone-country-prefixes'
import { useRouter } from 'next/router'
import { cookieStorageMechanism, logger } from '~helpers'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { Notification } from '~components/atoms/Notification'
import { useTranslation } from 'react-i18next'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { getGuestName } from '~domains/account'
import { getOrderPaymentsData } from '~domains/checkout/helpers'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { selectGrandTotal } from '~domains/basket'

export type MBWayPaymentMethodType = ComponentPropsWithoutRef<'span'>
export type MBWayPaymentMethodProps = MBWayPaymentMethodType

export const MBWayPaymentMethod: FunctionComponent<MBWayPaymentMethodProps> = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState({
    country: COUNTRY_CODES.PT,
    number: ''
  })
  const orderId = useSelector(selectOrderId)
  const currentDeliveryMethod = useSelector(selectDeliveryMethod)
  const customer = useSelector(selectCustomerDetails)
  const deliveryAddress = useSelector(selectDeliveryAddress)
  const billingAddress = useSelector(selectBillingAddress)
  const createOrderWasError = useSelector(selectCreateOrderWasError)
  const orderPaymentsData = useSelector(selectOrderPaymentsData)
  const wasAnyPaymentErrors = useSelector(selectWasAnyPaymentStepError)
  const mbWaypaymentRef = useSelector(selectMBWayPaymentRef)
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
    if (grandTotal) {
      setBasketAmount(grandTotal)
    }
  }, [grandTotal])

  const handleMBWayPaymentSubmit = useCallback(async () => {
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
          paymentMethod: PAYMENT_OPTIONS.SIBS_MBWAY
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
    isNewRelicEnabled,
    customerReference,
    anonymousId,
    basketAmount,
    grandTotal,
    isLoggedIn,
    orderId,
    dispatch,
    deliveryAddress,
    currentDeliveryMethod,
    customer?.email,
    billingAddress
  ])

  useEffect(() => {
    dispatch(createPaymentMethodClearDetails())
  }, [dispatch])

  useEffect(() => {
    if (
      orderId &&
      phoneNumber.number !== '' &&
      orderPaymentsData &&
      orderPaymentsData[0].amount &&
      isSubmitting
    ) {
      dispatch(
        mbWayPaymentTrigger({
          amount: orderPaymentsData[0].amount,
          orderId: orderId,
          customer: {
            phone: `${phoneNumber.country}#${phoneNumber.number}`,
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
    phoneNumber,
    isSubmitting,
    customerReference,
    customer,
    anonymousId,
    deliveryAddress,
    billingAddress,
    isLoggedIn
  ])
  useEffect(() => {
    if (mbWaypaymentRef !== undefined && orderPaymentsData !== undefined) {
      cookieStorageMechanism().set(
        getOrderPaymentsData(),
        JSON.stringify({
          paymentIdentifier: orderPaymentsData[0].paymentReference,
          payment_token: mbWaypaymentRef,
          method_code: PAYMENT_OPTIONS.SIBS_MBWAY,
          order_id: orderId
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
        }
      )
      push(`/confirmation/${orderId}`)
    }
  }, [mbWaypaymentRef, orderId, orderPaymentsData, push])

  useEffect(() => {
    if (isSubmitting && (createOrderWasError || wasAnyPaymentErrors)) {
      setIsSubmitting(false)
    }
  }, [createOrderWasError, isSubmitting, wasAnyPaymentErrors])

  return (
    <>
      <Notification
        type="info"
        title={t('checkout.mbway.notification.title')}
        content={t('checkout.mbway.notification.content')}
      />
      <PhoneNumberForm
        handleSubmit={handleMBWayPaymentSubmit}
        isSubmitting={isSubmitting}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    </>
  )
}
