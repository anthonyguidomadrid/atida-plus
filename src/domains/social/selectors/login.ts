import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectLogin = (state: RootState) => state?.client?.social?.['login']

export const selectLoginIsLoading = createSelector(
  selectLogin,
  data => data?.isLoading
)

export const selectLoginWasError = createSelector(
  selectLogin,
  data => data?.wasError
)

export const selectLoginError = createSelector(selectLogin, data => data?.error)

export const selectSocialDetails = createSelector(selectLogin, data => {
  return { ...data?.details }
})
