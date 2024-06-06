import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import type { CreatePaymentData, MethodRef, PaymentLoad } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  details?: CreatePaymentData
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const createPaymentMethodSlice = createSlice({
  name: 'checkout/create-payment-method',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<PaymentLoad>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<MethodRef>) {
      const { methodRef } = action.payload
      if (typeof methodRef !== 'undefined')
        state.details = { ...state.details, methodRef }
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
    setMethodCode(state, action: PayloadAction<{ methodCode: string }>) {
      const { methodCode } = action.payload
      state.details = { methodCode }
    },
    clearDetails(state) {
      state.details = undefined
      state.isLoading = false
      state.wasSuccess = false
      state.wasError = false
      state.error = undefined
    },
    clearMethodCode(state) {
      if (typeof state.details !== 'undefined')
        state.details = { ...state.details, methodCode: undefined }
    },
    setError(state, action: PayloadAction<string | undefined>) {
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
