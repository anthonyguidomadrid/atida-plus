import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

export * from './create-braintree-token'
export * from './create-order'
export * from './create-payment-method'
export * from './data'
export * from './stepper'
export * from './create-mbway-payment'
export * from './create-sibs-multibanco-payment'
export * from './get-order'
export * from './create-bizum-payment'
export * from './adyen-payment-methods'
export * from './re-order'
export * from './create-adyen-payment'
export * from './selected-payment-method'
export * from './create-multiple-payments'
export * from './adyen-payment-details'

const selectCheckout = (state: RootState) => state.client.checkout

export const selectWasAnyPaymentStepError = createSelector(
  selectCheckout,
  checkout =>
    checkout.braintree.wasError ||
    checkout.sibsMultibanco.wasError ||
    checkout.paymentMethod.wasError ||
    checkout.mbWayPayment.wasError ||
    checkout.bizum.wasError ||
    checkout.adyenPayment.wasError ||
    checkout.multiplePayments.wasError
)

export const selectIsAnyPaymentLoading = createSelector(
  selectCheckout,
  checkout =>
    checkout.createOrder.isLoading ||
    checkout.paymentMethod.isLoading ||
    checkout.mbWayPayment.isLoading ||
    checkout.bizum.isLoading ||
    checkout.adyenPayment.isLoading ||
    checkout.multiplePayments.isLoading
)
