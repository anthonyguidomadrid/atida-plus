import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getValidateAddress = (state: RootState) =>
  state?.client?.address?.['validate-address']

export const selectWasSuccess = createSelector(
  getValidateAddress,
  getValidateAddress => getValidateAddress?.wasSuccess ?? false
)

export const selectWasError = createSelector(
  getValidateAddress,
  getValidateAddress => getValidateAddress?.wasError ?? false
)

export const selectError = createSelector(
  getValidateAddress,
  getValidateAddress => getValidateAddress?.error
)

export const selectBestAddress = createSelector(
  getValidateAddress,
  getValidateAddress =>
    getValidateAddress?.['valid-addresses']?.items[0] ?? undefined
)

export const selectSuggestedAddresses = createSelector(
  getValidateAddress,
  getValidateAddress => getValidateAddress?.['valid-addresses']?.items ?? []
)
