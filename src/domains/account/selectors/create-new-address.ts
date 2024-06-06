import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getCustomerNewAddress = (state: RootState) =>
  state?.client?.account?.['create-new-address']

export const selectWasError = createSelector(
  getCustomerNewAddress,
  getCustomerNewAddress => getCustomerNewAddress?.wasError ?? false
)

export const selectError = createSelector(
  getCustomerNewAddress,
  getCustomerNewAddress => getCustomerNewAddress?.error
)
