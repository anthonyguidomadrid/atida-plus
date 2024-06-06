import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const getUpdatedAddress = (state: RootState) =>
  state?.client?.address?.['update-address']

export const selectWasSuccess = createSelector(
  getUpdatedAddress,
  getUpdatedAddress => getUpdatedAddress?.wasSuccess ?? false
)

export const selectWasError = createSelector(
  getUpdatedAddress,
  getUpdatedAddress => getUpdatedAddress?.wasError ?? false
)

export const selectError = createSelector(
  getUpdatedAddress,
  getUpdatedAddress => getUpdatedAddress?.error
)
