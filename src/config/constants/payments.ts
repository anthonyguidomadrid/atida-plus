export enum PAYMENT_OPTIONS {
  STRIPE_MULTIBANCO = 'stripe_multibanco',
  ADYEN = 'adyen',
  ATIDA_PAYMENT_LOYALTY = 'atida_payment_loyalty',
  BRAINTREE_CREDIT_CARD = 'braintree_card',
  BRAINTREE_PAYPAL = 'braintree_paypal',
  SIBS_MBWAY = 'sibs_mbway',
  SIBS_MULTIBANCO = 'sibs_multibanco',
  ADYEN_GOOGLE_PAY = 'adyen_googlepay',
  ADYEN_APPLE_PAY = 'adyen_applepay',
  ADYEN_KLARNA_PAY_OVER_TIME = 'adyen_klarna_payovertime',
  ADYEN_MB_WAY = 'adyen_mbway',
  ADYEN_MULTIBANCO = 'adyen_multibanco',
  ADYEN_CARD = 'adyen_card',
  REDSYS_BIZUM = 'redsys_bizum'
}

export const ADYEN_PAYMENT_METHODS = {
  GOOGLE_PAY: 'paywithgoogle',
  APPLE_PAY: 'applepay',
  KLARNA_PAY_OVER_TIME: 'klarna_account',
  MBWAY: 'mbway',
  MULTIBANCO: 'multibanco',
  CARD: 'scheme'
}

export const ALLOWED_PAYMENT_METHODS_ADYEN = Object.values(
  ADYEN_PAYMENT_METHODS
).map(method => method)

export const PAYMENT_METHOD_NAME = {
  STRIPE_MULTIBANCO: 'Multibanco',
  BRAINTREE_CREDIT_CARD: 'Visa / Master',
  BRAINTREE_PAYPAL: 'PayPal',
  SIBS_MBWAY: 'MB Way',
  SIBS_MULTIBANCO: 'Multibanco',
  REDSYS_BIZUM: 'Bizum',
  ADYEN_GOOGLE_PAY: 'Google Pay',
  ADYEN_APPLE_PAY: 'Apple Pay',
  ADYEN_KLARNA_PAY_OVER_TIME: 'checkout.payment-method.klarna-pay-over-time',
  ADYEN_MULTIBANCO: 'Multibanco',
  ADYEN_MB_WAY: 'MB Way',
  ADYEN_CARD: 'checkout.payment-method.adyen.card'
}
