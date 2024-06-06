import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectPaymentMethod = (state: RootState) =>
  state?.client?.checkout?.selectedPaymentMethod

export const selectSelectedPaymentMethod = createSelector(
  selectPaymentMethod,
  data => data?.selectedPaymentMethod
)

export const selectIsValidPaymentMethod = createSelector(
  selectPaymentMethod,
  data => data?.isValid
)

export const selectIsPaymentPending = createSelector(
  selectPaymentMethod,
  data => data?.isPaymentPending
)
