import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectMultiplePayments = (state: RootState) =>
  state?.client?.checkout?.multiplePayments

export const selectMultiplePaymentsIsLoading = createSelector(
  selectMultiplePayments,
  data => data?.isLoading
)

export const selectMultiplePaymentsWasError = createSelector(
  selectMultiplePayments,
  data => data?.wasError
)

export const selectMultiplePaymentsError = createSelector(
  selectMultiplePayments,
  data => data?.error
)

export const selectMultiplePaymentsDetailsAdyen = createSelector(
  selectMultiplePayments,
  data => data?.details?.adyen
)

const selectMultiplePaymentsDetailsAdyenAction = createSelector(
  selectMultiplePayments,
  data => data?.details?.adyen?.action
)

export const selectMultiplePaymentsDetailsAdyenMultibancoPaymentRef = createSelector(
  selectMultiplePaymentsDetailsAdyenAction,
  data => data?.reference
)

export const selectMultiplePaymentsDetailsAdyenMultibancoPaymentAmount = createSelector(
  selectMultiplePaymentsDetailsAdyenAction,
  data => data?.totalAmount
)

export const selectMultiplePaymentsDetailsAdyenMultibancoPaymentEntity = createSelector(
  selectMultiplePaymentsDetailsAdyenAction,
  data => data?.entity
)

export const selectMultiplePaymentsDetailsAdyenMultibancoExpirationDate = createSelector(
  selectMultiplePaymentsDetailsAdyenAction,
  data => data?.expiresAt
)

export const selectMultiplePaymentsDetailsBizum = createSelector(
  selectMultiplePayments,
  data => data?.details?.redsys_bizum
)

export const selectMultiplePaymentsBizumInternalRef = createSelector(
  selectMultiplePaymentsDetailsBizum,
  data => data?.internal_ref
)

export const selectMultiplePaymentsBizumFormUrl = createSelector(
  selectMultiplePaymentsDetailsBizum,
  data => data?.form_url
)

export const selectMultiplePaymentsBizumSignatureVersion = createSelector(
  selectMultiplePaymentsDetailsBizum,
  data => data?.signature_version
)

export const selectMultiplePaymentsMerchantParameters = createSelector(
  selectMultiplePaymentsDetailsBizum,
  data => data?.merchant_params
)

export const selectMultiplePaymentsBizumSignature = createSelector(
  selectMultiplePaymentsDetailsBizum,
  data => data?.signature
)

export const selectMultiplePaymentsBraintreeCardMethodRef = createSelector(
  selectMultiplePayments,
  data => data?.details?.braintree_card?.method_ref
)

export const selectMultiplePaymentsBraintreePaypalMethodRef = createSelector(
  selectMultiplePayments,
  data => data?.details?.braintree_paypal?.method_ref
)
