import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectGetOrder = (state: RootState) => state?.client?.checkout?.getOrder

export const selectOrderWasError = createSelector(
  selectGetOrder,
  data => data.wasError
)

export const selectOrderWasSuccess = createSelector(
  selectGetOrder,
  data => data.wasSuccess
)

export const selectOrderDetails = createSelector(
  selectGetOrder,
  data => data?.details
)
