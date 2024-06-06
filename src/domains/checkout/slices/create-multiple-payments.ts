import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import {
  MultiplePaymentsLoad,
  MultiplePaymentsResponseData
} from '~domains/checkout/types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  details?: MultiplePaymentsResponseData
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const createMultiplePaymentsSlice = createSlice({
  name: 'checkout/create-multiple-payments',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<MultiplePaymentsLoad>) {
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
      action: PayloadAction<MultiplePaymentsResponseData | undefined>
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
      delete state.error
      delete state.details
    },
    setError(state, action: PayloadAction<string | undefined>) {
      delete state.details
      state.wasError = true
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
