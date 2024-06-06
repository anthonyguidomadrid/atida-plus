import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectReOrder = (state: RootState) => state?.client?.checkout?.reOrder

export const selectReOrderWasError = createSelector(
  selectReOrder,
  data => data.wasError
)

export const selectReOrderWasSuccess = createSelector(
  selectReOrder,
  data => data.wasSuccess
)

export const selectReOrderLoading = createSelector(
  selectReOrder,
  data => data.isLoading
)

export const selectReOrderErrorMesssage = createSelector(
  selectReOrder,
  data => data?.error
)
