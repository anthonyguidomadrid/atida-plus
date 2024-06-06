import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getCustomerUpdatedBusinessDetails = (state: RootState) =>
  state?.client?.account?.['update-business-details']

export const selectWasError = createSelector(
  getCustomerUpdatedBusinessDetails,
  getCustomerUpdatedBusinessDetails =>
    getCustomerUpdatedBusinessDetails?.wasError ?? false
)
