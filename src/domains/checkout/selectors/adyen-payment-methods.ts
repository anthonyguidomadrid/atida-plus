import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'
import { ADYEN_PAYMENT_METHODS } from '~config/constants/payments'

const selectAdyenPaymentMethods = (state: RootState) =>
  state?.client?.checkout?.adyenPaymentMethods

export const selectAdyenPaymentMethodsIsLoading = createSelector(
  selectAdyenPaymentMethods,
  data => data?.isLoading
)

export const selectAdyenPaymentMethodsAllowedPaymentMethods = createSelector(
  selectAdyenPaymentMethods,
  data => data?.details?.allowedPaymentMethods
)

export const selectAdyenPaymentMethodsData = createSelector(
  selectAdyenPaymentMethods,
  data => data?.details?.data
)

export const selectAdyenApplePayMerchantId = createSelector(
  selectAdyenPaymentMethodsData,
  data =>
    data?.paymentMethods?.find(
      ({ type }) => type === ADYEN_PAYMENT_METHODS.APPLE_PAY
    )?.configuration?.merchantId ?? ''
)
