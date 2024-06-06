import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectLogin = (state: RootState) => state?.client?.account?.login

export const selectIsLoading = createSelector(
  selectLogin,
  login => login?.isLoading ?? false
)

export const selectLoginNotification = createSelector(
  selectLogin,
  login => login?.notification ?? false
)

export const selectWasError = createSelector(
  selectLogin,
  login => login?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectLogin,
  login => login?.wasSuccess ?? false
)

export const selectError = createSelector(selectLogin, login => login?.error)

export const selectLoginEmail = createSelector(
  selectLogin,
  login => login?.email
)

export const selectMessages = createSelector(
  selectLogin,
  login => login.messages
)
