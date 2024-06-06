import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectVerify = (state: RootState) => state?.client?.social?.['verify']

export const selectVerifyIsLoading = createSelector(
  selectVerify,
  data => data?.isLoading
)

export const selectVerifyWasError = createSelector(
  selectVerify,
  data => data?.wasError
)

export const selectVerifyWasSuccess = createSelector(
  selectVerify,
  data => data?.wasSuccess
)

export const selectVerifyError = createSelector(
  selectVerify,
  data => data?.error
)
