import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectAdyenPaymentDetails = (state: RootState) =>
  state?.client?.checkout?.adyenPaymentDetails

export const selectAdyenPaymentDetailsData = createSelector(
  selectAdyenPaymentDetails,
  data => data?.details
)

export const selectAdyenPaymentDetailsIsLoading = createSelector(
  selectAdyenPaymentDetails,
  data => data?.isLoading
)

export const selectAdyenPaymentDetailsWasError = createSelector(
  selectAdyenPaymentDetails,
  data => data?.wasError
)
