import { RootState } from '~domains/redux'
import { createSelector } from '@reduxjs/toolkit'
export * as updateAddressSelectors from './update-address'
export * as createAddressSelectors from './create-address'
export * as deleteAddressSelectors from './delete-address'
export * as validateAddressSelectors from './validate-address'

const selectAddress = (state: RootState) => state.client.address

export const selectWasAnyAddressError = createSelector(
  selectAddress,
  address =>
    address['create-address'].wasError || address['update-address'].wasError
)

export const selectWasAnyAddressSuccess = createSelector(
  selectAddress,
  address =>
    address['create-address'].wasSuccess || address['update-address'].wasSuccess
)

export const selectIsAnyAddressLoading = createSelector(
  selectAddress,
  address =>
    address['create-address'].isLoading || address['update-address'].isLoading
)
