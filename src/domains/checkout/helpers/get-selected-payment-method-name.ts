import {
  PAYMENT_OPTIONS,
  PAYMENT_METHOD_NAME
} from '~config/constants/payments'

export const getSelectedPaymentMethodName = (selectedPaymentMethod: string) => {
  if (selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD) {
    return PAYMENT_METHOD_NAME.BRAINTREE_CREDIT_CARD
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.BRAINTREE_PAYPAL) {
    return PAYMENT_METHOD_NAME.BRAINTREE_PAYPAL
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.REDSYS_BIZUM) {
    return PAYMENT_METHOD_NAME.REDSYS_BIZUM
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY) {
    return PAYMENT_METHOD_NAME.ADYEN_GOOGLE_PAY
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_APPLE_PAY) {
    return PAYMENT_METHOD_NAME.ADYEN_APPLE_PAY
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME) {
    return PAYMENT_METHOD_NAME.ADYEN_KLARNA_PAY_OVER_TIME
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_MB_WAY) {
    return PAYMENT_METHOD_NAME.ADYEN_MB_WAY
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_MULTIBANCO) {
    return PAYMENT_METHOD_NAME.ADYEN_MULTIBANCO
  }
  if (selectedPaymentMethod === PAYMENT_OPTIONS.ADYEN_CARD) {
    return PAYMENT_METHOD_NAME.ADYEN_CARD
  }
  return ''
}
