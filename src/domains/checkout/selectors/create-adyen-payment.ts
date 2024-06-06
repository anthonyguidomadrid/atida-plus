import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectAdyenPayment = (state: RootState) =>
  state?.client?.checkout?.adyenPayment

export const selectAdyenIsLoading = createSelector(
  selectAdyenPayment,
  data => data?.isLoading
)
export const selectAdyenDetails = createSelector(
  selectAdyenPayment,
  data => data?.details
)
export const selectAdyenError = createSelector(
  selectAdyenPayment,
  data => data?.error
)

export const selectAdyenDetailsAction = createSelector(
  selectAdyenPayment,
  data => data?.details?.action
)

export const selectAdyenMultibancoPaymentRef = createSelector(
  selectAdyenDetailsAction,
  data => data?.reference
)

export const selectAdyenMultibancoPaymentAmount = createSelector(
  selectAdyenDetailsAction,
  data => data?.totalAmount
)

export const selectAdyenMultibancoPaymentEntity = createSelector(
  selectAdyenDetailsAction,
  data => data?.entity
)

export const selectAdyenMultibancoExpirationDate = createSelector(
  selectAdyenDetailsAction,
  data => data?.expiresAt
)
