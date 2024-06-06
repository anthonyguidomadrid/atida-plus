import { getSelectedPaymentMethodName } from '../get-selected-payment-method-name'
import {
  PAYMENT_OPTIONS,
  PAYMENT_METHOD_NAME
} from '~config/constants/payments'

describe(getSelectedPaymentMethodName, () => {
  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD', () => {
    expect(
      getSelectedPaymentMethodName(PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD)
    ).toEqual(PAYMENT_METHOD_NAME.BRAINTREE_CREDIT_CARD)
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.BRAINTREE_PAYPAL', () => {
    expect(
      getSelectedPaymentMethodName(PAYMENT_OPTIONS.BRAINTREE_PAYPAL)
    ).toEqual(PAYMENT_METHOD_NAME.BRAINTREE_PAYPAL)
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.REDSYS_BIZUM', () => {
    expect(getSelectedPaymentMethodName(PAYMENT_OPTIONS.REDSYS_BIZUM)).toEqual(
      PAYMENT_METHOD_NAME.REDSYS_BIZUM
    )
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY', () => {
    expect(
      getSelectedPaymentMethodName(PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY)
    ).toEqual(PAYMENT_METHOD_NAME.ADYEN_GOOGLE_PAY)
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.ADYEN_APPLE_PAY', () => {
    expect(
      getSelectedPaymentMethodName(PAYMENT_OPTIONS.ADYEN_APPLE_PAY)
    ).toEqual(PAYMENT_METHOD_NAME.ADYEN_APPLE_PAY)
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME', () => {
    expect(
      getSelectedPaymentMethodName(PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME)
    ).toEqual(PAYMENT_METHOD_NAME.ADYEN_KLARNA_PAY_OVER_TIME)
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.ADYEN_MB_WAY', () => {
    expect(getSelectedPaymentMethodName(PAYMENT_OPTIONS.ADYEN_MB_WAY)).toEqual(
      PAYMENT_METHOD_NAME.ADYEN_MB_WAY
    )
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.ADYEN_MULTIBANCO', () => {
    expect(
      getSelectedPaymentMethodName(PAYMENT_OPTIONS.ADYEN_MULTIBANCO)
    ).toEqual(PAYMENT_METHOD_NAME.ADYEN_MULTIBANCO)
  })

  it('returns the correct payment method name when the payload is PAYMENT_OPTIONS.ADYEN_CARD', () => {
    expect(getSelectedPaymentMethodName(PAYMENT_OPTIONS.ADYEN_CARD)).toEqual(
      PAYMENT_METHOD_NAME.ADYEN_CARD
    )
  })

  it('returns an empty string when payload is different', () => {
    expect(getSelectedPaymentMethodName(PAYMENT_OPTIONS.SIBS_MBWAY)).toEqual('')
  })
})
