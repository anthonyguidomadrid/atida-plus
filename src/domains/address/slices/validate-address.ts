import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ValidateAddressTriggerPayload, ValidatedAddress } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type ValidateAddressState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  'valid-addresses'?: { items: ValidatedAddress[] }
  error?: string
}

const initialState: ValidateAddressState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const validateAddressSlice = createSlice({
  name: 'address/validate-address',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<ValidateAddressTriggerPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<{ items: ValidatedAddress[] }>) {
      const data = action.payload
      state.wasSuccess = true
      if (typeof data !== 'undefined') state['valid-addresses'] = data
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    reset(state) {
      state.isLoading = false
      state.wasSuccess = true
      state.wasError = false
      state['valid-addresses'] = undefined
    }
  }
})
