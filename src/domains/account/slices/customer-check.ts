import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CustomerCheckResponse, CustomerCheckTriggerPayload } from '../types'

type CustomerCheckState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  details?: CustomerCheckResponse
}

const initialState: CustomerCheckState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const customerCheckSlice = createSlice({
  name: 'account/customer-check',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<CustomerCheckTriggerPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false

      delete state.error
    },
    success(state, action: PayloadAction<CustomerCheckResponse>) {
      const data = action.payload

      state.wasSuccess = true
      state.details = data
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
      state.wasError = false
      state.wasSuccess = false
      delete state.details
    }
  }
})
