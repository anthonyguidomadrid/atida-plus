import { FunctionComponentElement, SVGAttributes } from 'react'
import { ReactComponent as Multibanco } from '~assets/svg/payment-providers/Multibanco.svg'
import { ReactComponent as MBWay } from '~assets/svg/payment-providers/MBWay.svg'
import { ReactComponent as Bizum } from '~assets/svg/payment-providers/Bizum.svg'
import { ReactComponent as Visa } from '~assets/svg/payment-providers/Visa.svg'
import { ReactComponent as Mastercard } from '~assets/svg/payment-providers/Mastercard.svg'
import { ReactComponent as Paypal } from '~assets/svg/payment-providers/PaypalNoPadding.svg'
import { ReactComponent as GooglePay } from '~assets/svg/payment-providers/GooglePay.svg'
import { ReactComponent as ApplePay } from '~assets/svg/payment-providers/ApplePay.svg'
import {
  PAYMENT_OPTIONS,
  PAYMENT_METHOD_NAME
} from '~config/constants/payments'
import { FeatureFlagValue } from '~components/helpers/FeatureFlags/hooks'

type PaymentMethodsType = {
  id: string
  name?: string
  icon: FunctionComponentElement<SVGAttributes<'svg'>> | null
}[]

type PaymentMethodsFFConfig = {
  isBizumEnabled: FeatureFlagValue
  isSibsMultibancoEnabled: FeatureFlagValue
  isStripeMultibancoEnabled: FeatureFlagValue
  isSibsMBWayEnabled: FeatureFlagValue
  isAdyenApplePayEnabled: FeatureFlagValue
  isAdyenKlarnaPayOverTimeEnabled: FeatureFlagValue
  isAdyenGooglePayEnabled: FeatureFlagValue
  isBraintreePaypalEnabled: FeatureFlagValue
  isBraintreeCardEnabled: FeatureFlagValue
  isAdyenMBWayEnabled: FeatureFlagValue
  isAdyenPaymentMethodsEnabled: FeatureFlagValue
  isAdyenMultibancoEnabled: FeatureFlagValue
  isAdyenCardEnabled: FeatureFlagValue
}

export const getPaymentMethods = (
  paymentMethodsFFConfig?: PaymentMethodsFFConfig,
  adyenPaymentMethods?: string[],
  locale?: string
): PaymentMethodsType => {
  const paymentMethodsState = [
    {
      id: PAYMENT_OPTIONS.SIBS_MBWAY,
      name: PAYMENT_METHOD_NAME.SIBS_MBWAY,
      icon: <MBWay className="h-3 w-3 md:w-5 md:h-5" />
    },
    {
      id: PAYMENT_OPTIONS.ADYEN_MB_WAY,
      name: PAYMENT_METHOD_NAME.ADYEN_MB_WAY,
      icon: <MBWay className="h-3 w-3 md:w-5 md:h-5" />
    },
    {
      id: PAYMENT_OPTIONS.SIBS_MULTIBANCO,
      name: PAYMENT_METHOD_NAME.SIBS_MULTIBANCO,
      icon: <Multibanco className="h-3 w-3 md:w-5 md:h-5" />
    },
    {
      id: PAYMENT_OPTIONS.STRIPE_MULTIBANCO,
      name: PAYMENT_METHOD_NAME.STRIPE_MULTIBANCO,
      icon: <Multibanco className="h-3 w-3 md:w-5 md:h-5" />
    },
    {
      id: PAYMENT_OPTIONS.ADYEN_MULTIBANCO,
      name: PAYMENT_METHOD_NAME.ADYEN_MULTIBANCO,
      icon: <Multibanco className="h-3 w-3 md:w-5 md:h-5" />
    },
    ...(locale === 'pt-pt'
      ? [
          {
            id: PAYMENT_OPTIONS.BRAINTREE_PAYPAL,
            name: 'PayPal',
            icon: (
              <Paypal className="w-3 h-3 md:w-5 md:h-5 ml-0.5 mt-0.5 md:mt-1" />
            )
          }
        ]
      : []),
    {
      id: PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD,
      name: PAYMENT_METHOD_NAME.BRAINTREE_CREDIT_CARD,
      icon: (
        <>
          <Visa className="w-4 h-4 md:w-7 md:h-7 " />
          <Mastercard className="w-4 h-4 md:w-7 md:h-7 ml-0.5" />
        </>
      )
    },
    ...(locale === 'es-es'
      ? [
          {
            id: PAYMENT_OPTIONS.BRAINTREE_PAYPAL,
            name: PAYMENT_METHOD_NAME.BRAINTREE_PAYPAL,
            icon: (
              <Paypal className="w-3 h-3 md:w-5 md:h-5 ml-0.5 mt-0.5 md:mt-1" />
            )
          }
        ]
      : []),
    {
      id: PAYMENT_OPTIONS.ADYEN_CARD,
      name: PAYMENT_METHOD_NAME.ADYEN_CARD,
      icon: (
        <>
          <Visa className="w-3 h-3 md:w-5 md:h-5" />
          <Mastercard className="w-3 h-3 md:w-5 md:h-5 ml-0.5" />
        </>
      )
    },
    {
      id: PAYMENT_OPTIONS.ADYEN_APPLE_PAY,
      name: PAYMENT_METHOD_NAME.ADYEN_APPLE_PAY,
      icon: <ApplePay className="h-3 w-3 md:w-5 md:h-5" />
    },
    {
      id: PAYMENT_OPTIONS.REDSYS_BIZUM,
      name: PAYMENT_METHOD_NAME.REDSYS_BIZUM,
      icon: <Bizum className="h-3 w-3 md:w-5 md:h-5" />
    },
    {
      id: PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME,
      name: PAYMENT_METHOD_NAME.ADYEN_KLARNA_PAY_OVER_TIME,
      // TODO: Replace icon when design is ready
      icon: <Bizum className="h-3 w-3 md:w-5 md:h-5" />
    },
    {
      id: PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY,
      name: PAYMENT_METHOD_NAME.ADYEN_GOOGLE_PAY,
      icon: <GooglePay className="h-3 w-3 md:w-5 md:h-5" />
    }
  ]

  return paymentMethodsState.filter(({ id }) => {
    if (id === PAYMENT_OPTIONS.SIBS_MBWAY)
      return paymentMethodsFFConfig?.isSibsMBWayEnabled
    if (
      id === PAYMENT_OPTIONS.ADYEN_MB_WAY &&
      adyenPaymentMethods?.includes(PAYMENT_OPTIONS.ADYEN_MB_WAY)
    )
      return (
        paymentMethodsFFConfig?.isAdyenMBWayEnabled &&
        paymentMethodsFFConfig?.isAdyenPaymentMethodsEnabled
      )
    if (id === PAYMENT_OPTIONS.SIBS_MULTIBANCO)
      return paymentMethodsFFConfig?.isSibsMultibancoEnabled
    if (id === PAYMENT_OPTIONS.STRIPE_MULTIBANCO)
      return paymentMethodsFFConfig?.isStripeMultibancoEnabled
    if (
      id === PAYMENT_OPTIONS.ADYEN_MULTIBANCO &&
      adyenPaymentMethods?.includes(PAYMENT_OPTIONS.ADYEN_MULTIBANCO)
    )
      return (
        paymentMethodsFFConfig?.isAdyenMultibancoEnabled &&
        paymentMethodsFFConfig?.isAdyenPaymentMethodsEnabled
      )
    if (id === PAYMENT_OPTIONS.BRAINTREE_PAYPAL)
      return paymentMethodsFFConfig?.isBraintreePaypalEnabled
    if (id === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD)
      return paymentMethodsFFConfig?.isBraintreeCardEnabled
    if (
      id === PAYMENT_OPTIONS.ADYEN_CARD &&
      adyenPaymentMethods?.includes(PAYMENT_OPTIONS.ADYEN_CARD)
    )
      return (
        paymentMethodsFFConfig?.isAdyenCardEnabled &&
        paymentMethodsFFConfig?.isAdyenPaymentMethodsEnabled
      )
    if (
      id === PAYMENT_OPTIONS.ADYEN_APPLE_PAY &&
      adyenPaymentMethods?.includes(PAYMENT_OPTIONS.ADYEN_APPLE_PAY)
    )
      return (
        paymentMethodsFFConfig?.isAdyenApplePayEnabled &&
        paymentMethodsFFConfig?.isAdyenPaymentMethodsEnabled
      )
    if (
      id === PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY &&
      adyenPaymentMethods?.includes(PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY)
    )
      return (
        paymentMethodsFFConfig?.isAdyenGooglePayEnabled &&
        paymentMethodsFFConfig?.isAdyenPaymentMethodsEnabled
      )
    if (id === PAYMENT_OPTIONS.REDSYS_BIZUM)
      return paymentMethodsFFConfig?.isBizumEnabled
    if (
      id === PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME &&
      adyenPaymentMethods?.includes(PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME)
    )
      return (
        paymentMethodsFFConfig?.isAdyenKlarnaPayOverTimeEnabled &&
        paymentMethodsFFConfig?.isAdyenPaymentMethodsEnabled
      )
  })
}
