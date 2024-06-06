import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectPaymentMethod = (state: RootState) =>
  state?.client?.checkout?.paymentMethod

export const selectPaymentMethodRef = createSelector(
  selectPaymentMethod,
  data => data?.details?.methodRef
)

export const selectPaymentMethodCode = createSelector(
  selectPaymentMethod,
  data => data?.details?.methodCode
)

export const selectErrorMessage = createSelector(
  selectPaymentMethod,
  data => data?.error
)

export const selectPaymentMethodWasError = createSelector(
  selectPaymentMethod,
  data => data?.wasError
)
