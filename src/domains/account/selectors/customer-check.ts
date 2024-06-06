import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectorCustomerCheck = (state: RootState) =>
  state?.client?.account?.['customer-check']

export const selectCustomerCheckIsLoading = createSelector(
  selectorCustomerCheck,
  customerCheck => customerCheck?.isLoading ?? false
)

export const selectCustomerCheckWasSuccess = createSelector(
  selectorCustomerCheck,
  customerCheck => customerCheck?.wasSuccess
)

export const selectCustomerCheckWasError = createSelector(
  selectorCustomerCheck,
  customerCheck => customerCheck?.wasError
)

export const selectCustomerCheckDetails = createSelector(
  selectorCustomerCheck,
  customerCheck => customerCheck?.details
)
