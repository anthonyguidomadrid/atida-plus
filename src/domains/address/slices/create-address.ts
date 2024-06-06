import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CreateAddressTriggerPayload } from '~domains/address'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type CreateAddressState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: CreateAddressState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const createAddressSlice = createSlice({
  name: 'address/create-address',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<CreateAddressTriggerPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state) {
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    clearSuccess(state) {
      state.wasSuccess = false
    }
  }
})
