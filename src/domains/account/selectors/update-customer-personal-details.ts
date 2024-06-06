import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getCustomerUpdatedAddress = (state: RootState) =>
  state?.client?.account?.['update-customer-personal-details']

export const selectWasSuccess = createSelector(
  getCustomerUpdatedAddress,
  getCustomerUpdatedAddress => getCustomerUpdatedAddress?.wasSuccess ?? false
)

export const selectWasError = createSelector(
  getCustomerUpdatedAddress,
  getCustomerUpdatedAddress => getCustomerUpdatedAddress?.wasError ?? false
)

export const selectError = createSelector(
  getCustomerUpdatedAddress,
  getCustomerUpdatedAddress => getCustomerUpdatedAddress?.error
)

export const selectShowNotification = createSelector(
  getCustomerUpdatedAddress,
  getCustomerUpdatedAddress => getCustomerUpdatedAddress?.showNotification
)
