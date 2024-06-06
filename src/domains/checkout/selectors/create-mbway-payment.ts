import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectMBWayPayment = (state: RootState) =>
  state?.client?.checkout?.mbWayPayment

export const selectMBWayPaymentRef = createSelector(
  selectMBWayPayment,
  data => data?.details?.internal_ref
)
