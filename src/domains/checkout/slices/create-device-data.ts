import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { BraintreeDeviceData } from '../types'
import { clearStateErrors } from '~domains/redux/actions'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const deviceDataSlice = createSlice({
  name: 'checkout/create-device-data',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<BraintreeDeviceData>) {
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
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
