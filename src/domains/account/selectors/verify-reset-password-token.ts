import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectVerifyResetPasswordToken = (state: RootState) =>
  state?.client?.account?.['verify-reset-password-token']

export const selectIsLoading = createSelector(
  selectVerifyResetPasswordToken,
  verifyResetPasswordToken => verifyResetPasswordToken?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectVerifyResetPasswordToken,
  verifyResetPasswordToken => verifyResetPasswordToken?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectVerifyResetPasswordToken,
  verifyResetPasswordToken => verifyResetPasswordToken?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectVerifyResetPasswordToken,
  verifyResetPasswordToken => verifyResetPasswordToken?.error
)

export const selectUserInfo = createSelector(
  selectVerifyResetPasswordToken,
  verifyResetPasswordToken => verifyResetPasswordToken?.user
)
