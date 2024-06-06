import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectPasswordForgotten = (state: RootState) =>
  state?.client?.account?.['password-forgotten']

export const selectIsLoading = createSelector(
  selectPasswordForgotten,
  passwordForgotten => passwordForgotten?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectPasswordForgotten,
  passwordForgotten => passwordForgotten?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectPasswordForgotten,
  passwordForgotten => passwordForgotten?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectPasswordForgotten,
  passwordForgotten => passwordForgotten?.error
)
