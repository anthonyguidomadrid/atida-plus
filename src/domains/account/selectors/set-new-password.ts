import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectSetNewPassword = (state: RootState) =>
  state?.client?.account?.['set-new-password']

export const selectIsLoading = createSelector(
  selectSetNewPassword,
  setNewPassword => setNewPassword?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectSetNewPassword,
  setNewPassword => setNewPassword?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectSetNewPassword,
  setNewPassword => setNewPassword?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectSetNewPassword,
  setNewPassword => setNewPassword?.error
)
