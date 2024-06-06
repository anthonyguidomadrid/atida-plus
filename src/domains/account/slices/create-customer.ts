import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CreateCustomerTriggerPayload } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type CreateCustomerState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: CreateCustomerState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const createCustomerSlice = createSlice({
  name: 'account/create-customer',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<CreateCustomerTriggerPayload>) {
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
    clear(state) {
      state.isLoading = false
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    }
  }
})
