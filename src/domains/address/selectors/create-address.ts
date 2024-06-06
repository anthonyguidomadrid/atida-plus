import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getCustomerAddress = (state: RootState) =>
  state?.client?.address?.['create-address']

export const selectWasSuccess = createSelector(
  getCustomerAddress,
  getCustomerAddress => getCustomerAddress?.wasSuccess ?? false
)

export const selectWasError = createSelector(
  getCustomerAddress,
  getCustomerAddress => getCustomerAddress?.wasError ?? false
)

export const selectIsLoading = createSelector(
  getCustomerAddress,
  getCustomerAddress => getCustomerAddress?.isLoading ?? false
)

export const selectError = createSelector(
  getCustomerAddress,
  getCustomerAddress => getCustomerAddress?.error
)
