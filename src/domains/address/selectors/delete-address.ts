import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getDeletedAddress = (state: RootState) =>
  state?.client?.address?.['delete-address']

export const selectDeletedAddressWasSuccess = createSelector(
  getDeletedAddress,
  getDeletedAddress => getDeletedAddress?.wasSuccess ?? false
)

export const selectDeletedAddressWasError = createSelector(
  getDeletedAddress,
  getDeletedAddress => getDeletedAddress?.wasError ?? false
)

export const selectDeletedAddressError = createSelector(
  getDeletedAddress,
  getDeletedAddress => getDeletedAddress?.error
)

export const selectDeleteAddressItems = createSelector(
  getDeletedAddress,
  getDeletedAddress => getDeletedAddress?.items
)
