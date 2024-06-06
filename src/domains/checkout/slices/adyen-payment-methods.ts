import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import { AdyenPaymentMethodsResponse } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  details?: AdyenPaymentMethodsResponse
  error?: string
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const adyenPaymentMethodsSlice = createSlice({
  name: 'checkout/adyen-payment-methods',
  initialState,
  reducers: {
    trigger(_state) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(
      state,
      action: PayloadAction<AdyenPaymentMethodsResponse | undefined>
    ) {
      const data = action.payload
      if (typeof data !== 'undefined') state.details = data
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
    resetState(state) {
      state.isLoading = false
      state.wasSuccess = false
      state.wasError = false
      delete state.details
      delete state.error
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
