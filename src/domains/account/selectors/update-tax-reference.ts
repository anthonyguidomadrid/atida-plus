import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getCustomerUpdatedTaxReference = (state: RootState) =>
  state?.client?.account?.['update-tax-reference']

export const selectWasIsLoading = createSelector(
  getCustomerUpdatedTaxReference,
  getCustomerUpdatedTaxReference =>
    getCustomerUpdatedTaxReference?.isLoading ?? false
)

export const selectWasError = createSelector(
  getCustomerUpdatedTaxReference,
  getCustomerUpdatedTaxReference => getCustomerUpdatedTaxReference?.wasError
)

export const selectError = createSelector(
  getCustomerUpdatedTaxReference,
  getCustomerUpdatedTaxReference => getCustomerUpdatedTaxReference?.error
)
