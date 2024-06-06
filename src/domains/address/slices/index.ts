import { combineReducers } from '@reduxjs/toolkit'
import { updateAddressSlice } from '~domains/address/slices/update-address'
import { createAddressSlice } from '~domains/address/slices/create-address'
import { deleteAddressSlice } from '~domains/address/slices/delete-address'
import { validateAddressSlice } from '~domains/address/slices/validate-address'

export const addressReducer = combineReducers({
  'update-address': updateAddressSlice.reducer,
  'create-address': createAddressSlice.reducer,
  'delete-address': deleteAddressSlice.reducer,
  'validate-address': validateAddressSlice.reducer
})

export const {
  trigger: createAddressTrigger,
  request: createAddressRequest,
  success: createAddressSuccess,
  failure: createAddressFailure,
  fulfill: createAddressFulfill,
  clearSuccess: createAddressClearSuccess
} = createAddressSlice.actions

export const {
  trigger: updateAddressTrigger,
  request: updateAddressRequest,
  success: updateAddressSuccess,
  failure: updateAddressFailure,
  fulfill: updateAddressFulfill,
  clearSuccess: updateAddressClearSuccess
} = updateAddressSlice.actions

export const {
  trigger: deleteAddressTrigger,
  request: deleteAddressRequest,
  success: deleteAddressSuccess,
  failure: deleteAddressFailure,
  fulfill: deleteAddressFulfill,
  itemIsLoading: deleteAddressItemIsLoading,
  itemWasSuccess: deleteAddressItemWasSuccess,
  itemWasError: deleteAddressItemWasError,
  clearSuccess: deleteAddressClearSuccess
} = deleteAddressSlice.actions

export const {
  trigger: validateAddressTrigger,
  request: validateAddressRequest,
  success: validateAddressSuccess,
  failure: validateAddressFailure,
  fulfill: validateAddressFulfill,
  reset: validateAddressReset
} = validateAddressSlice.actions
