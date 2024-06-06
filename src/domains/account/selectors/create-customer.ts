import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectCreateCustomer = (state: RootState) =>
  state?.client?.account?.['create-customer']

export const selectIsLoading = createSelector(
  selectCreateCustomer,
  createCustomer => createCustomer?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectCreateCustomer,
  createCustomer => createCustomer?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectCreateCustomer,
  createCustomer => createCustomer?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectCreateCustomer,
  createCustomer => createCustomer?.error
)
