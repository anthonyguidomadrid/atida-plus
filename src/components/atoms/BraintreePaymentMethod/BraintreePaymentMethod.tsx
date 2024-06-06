import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useRef
} from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import {
  selectOrderId,
  getBrainTreeTokenTrigger,
  selectBrainTreeToken,
  selectPaymentMethodRef,
  selectOrderPaymentsData,
  setBrainTreeError,
  createPaymentMethodClearDetails,
  clearBraintreeToken,
  selectPaymentMethodWasError,
  selectMultiplePaymentsBraintreeCardMethodRef,
  selectMultiplePaymentsBraintreePaypalMethodRef,
  createMultiplePaymentsResetState,
  selectMultiplePaymentsWasError
} from '~domains/checkout'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  cookieStorageMechanism,
  removeUndefinedPropertiesFromObject,
  transformLocaleToUppercaseAndUnderscore
} from '~helpers'
import type { Dropin as DropInInstance } from 'braintree-web-drop-in'
import { Address } from '~domains/checkout/types'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { Customer } from '~domains/account/types'
import { getOrderPaymentsData } from '~domains/checkout/helpers'

const DropIn = dynamic(() => import('braintree-web-drop-in-react'))

export type BraintreePaymentMethodProps = ComponentPropsWithoutRef<'span'> & {
  paymentMethod: string
  isLoggedIn: boolean
  customerReference?: string
  guestReference?: string
  deliveryAddress?: Address
  billingAddress?: Address
  customerDetails?: Partial<Customer>
  setBraintreeDropInInstance: (instance: DropInInstance | null) => void
  setBraintreeShowButton: (showButton: boolean) => void
}

export const BraintreePaymentMethod: FunctionComponent<BraintreePaymentMethodProps> = ({
  paymentMethod,
  isLoggedIn,
  customerReference,
  guestReference,
  deliveryAddress,
  billingAddress,
  customerDetails,
  setBraintreeDropInInstance,
  setBraintreeShowButton
}) => {
  const { push, locale } = useRouter()
  const dispatch = useDispatch()
  const isFirstRender = useRef(true)
  const orderId = useSelector(selectOrderId)
  const clientBrainTreeToken = useSelector(selectBrainTreeToken)
  const { t } = useTranslation()
  const paymentMethodRef = useSelector(selectPaymentMethodRef)
  const methodCode = useRef('')
  const orderPaymentsData = useSelector(selectOrderPaymentsData)
  const paymentMethodWasError = useSelector(selectPaymentMethodWasError)
  const multiplePaymentsWasError = useSelector(selectMultiplePaymentsWasError)
  const multiplePaymentsBraintreeCardMethodRef = useSelector(
    selectMultiplePaymentsBraintreeCardMethodRef
  )
  const multiplePaymentsBraintreePaypalMethodRef = useSelector(
    selectMultiplePaymentsBraintreePaypalMethodRef
  )

  const brainTreeTogglePaymentChangeButton = document.querySelector(
    '[data-braintree-id=toggle] span'
  ) as HTMLElement
  if (brainTreeTogglePaymentChangeButton) {
    brainTreeTogglePaymentChangeButton.innerHTML = t(
      'checkout.braintree-add.credit.or.paypal'
    )
    brainTreeTogglePaymentChangeButton.style.display = 'inline-block'
  }

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  useEffect(() => {
    if (isFirstRender.current || !clientBrainTreeToken) {
      dispatch(
        getBrainTreeTokenTrigger({
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
    isFirstRender.current = false
    methodCode.current =
      paymentMethod === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
        ? PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
        : PAYMENT_OPTIONS.BRAINTREE_PAYPAL
  }, [
    guestReference,
    clientBrainTreeToken,
    customerDetails,
    customerReference,
    dispatch,
    paymentMethod,
    deliveryAddress,
    billingAddress,
    isLoggedIn
  ])

  useEffect(() => {
    if (
      (isLoyaltyAtidaCashEnabled
        ? methodCode.current === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
          ? multiplePaymentsBraintreeCardMethodRef
          : multiplePaymentsBraintreePaypalMethodRef
        : paymentMethodRef) &&
      orderPaymentsData
    ) {
      cookieStorageMechanism().set(
        getOrderPaymentsData(),
        JSON.stringify({
          paymentIdentifier: orderPaymentsData[0].paymentReference,
          payment_token:
            paymentMethodRef ??
            multiplePaymentsBraintreeCardMethodRef ??
            multiplePaymentsBraintreePaypalMethodRef,
          method_code: methodCode.current,
          order_id: orderId
        }),
        {
          expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes)
        }
      )
      push(`/confirmation/${orderId}`)
    }
  }, [
    paymentMethodRef,
    orderPaymentsData,
    push,
    orderId,
    multiplePaymentsBraintreeCardMethodRef,
    multiplePaymentsBraintreePaypalMethodRef,
    isLoyaltyAtidaCashEnabled
  ])

  useEffect(() => {
    if (
      isLoyaltyAtidaCashEnabled
        ? multiplePaymentsWasError
        : paymentMethodWasError
    ) {
      dispatch(clearBraintreeToken())
    }
  }, [
    dispatch,
    paymentMethodWasError,
    multiplePaymentsWasError,
    isLoyaltyAtidaCashEnabled
  ])

  const initDropInInstance = (instance: DropInInstance) => {
    setBraintreeDropInInstance(instance)
    // @ts-ignore - TODO: this is apparently wrong but works? investigate
    instance?._model?._paymentMethodIsRequestable &&
      setBraintreeShowButton(true)
  }

  return (
    <>
      {paymentMethod !== '' && clientBrainTreeToken && (
        <div
          data-testid="drop-in-ui"
          key="selectedBraintreePaymentMethod"
          className={classNames('flex flex-col justify-end', {
            'min-h-16': paymentMethod === PAYMENT_OPTIONS.BRAINTREE_PAYPAL,
            'xs-only:grid xs-only:grid-cols-1':
              paymentMethod === PAYMENT_OPTIONS.BRAINTREE_PAYPAL
          })}
        >
          <DropIn
            options={removeUndefinedPropertiesFromObject({
              authorization: clientBrainTreeToken,
              threeDSecure:
                paymentMethod === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
                  ? true
                  : undefined,
              dataCollector: true,
              card:
                paymentMethod === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD
                  ? {
                      vault: {
                        allowVaultCardOverride: true
                      }
                    }
                  : false,
              paypal:
                paymentMethod === PAYMENT_OPTIONS.BRAINTREE_PAYPAL
                  ? {
                      flow: 'vault'
                    }
                  : undefined,
              locale: transformLocaleToUppercaseAndUnderscore(locale),
              vaultManager: true
            })}
            onPaymentMethodRequestable={() => {
              isLoyaltyAtidaCashEnabled
                ? dispatch(createMultiplePaymentsResetState())
                : dispatch(createPaymentMethodClearDetails())
              setBraintreeShowButton(true)
            }}
            onNoPaymentMethodRequestable={() => {
              setBraintreeShowButton(false)
            }}
            onInstance={instance => {
              initDropInInstance(instance)
            }}
            onError={error => {
              dispatch(setBrainTreeError(error.message))
            }}
          />
        </div>
      )}
    </>
  )
}
