import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import {
  SIBSMultibancoPaymentData,
  SIBSMultibancoResponseData
} from '~domains/checkout/types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  details?: SIBSMultibancoResponseData
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const createSIBSMultibancoPaymentSlice = createSlice({
  name: 'checkout/create-sibs-multibanco-payment',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<SIBSMultibancoPaymentData>) {
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
      action: PayloadAction<SIBSMultibancoResponseData | undefined>
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
    clearDetails(state) {
      state.details = undefined
      state.isLoading = false
      state.wasSuccess = false
      state.wasError = false
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
