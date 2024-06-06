import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getCustomerUpdatedPassword = (state: RootState) =>
  state?.client?.account?.['update-customer-password']

export const selectWasSuccess = createSelector(
  getCustomerUpdatedPassword,
  getCustomerUpdatedPassword => getCustomerUpdatedPassword?.wasSuccess ?? false
)

export const selectWasError = createSelector(
  getCustomerUpdatedPassword,
  getCustomerUpdatedPassword => getCustomerUpdatedPassword?.wasError ?? false
)

export const selectError = createSelector(
  getCustomerUpdatedPassword,
  getCustomerUpdatedPassword => getCustomerUpdatedPassword?.error
)

export const selectShowNotification = createSelector(
  getCustomerUpdatedPassword,
  getCustomerUpdatedPassword => getCustomerUpdatedPassword?.showNotification
)
