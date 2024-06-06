import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import type { ClientToken, BraintreeTokenLoad } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  token?: ClientToken
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const braintreeSlice = createSlice({
  name: 'checkout/create-braintree-token',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<BraintreeTokenLoad>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<ClientToken | undefined>) {
      const data = action.payload
      if (typeof data !== 'undefined') state.token = data
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
    error(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    clearDetails(state) {
      state.isLoading = false
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    clearToken(state) {
      delete state.token
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, state => {
      state.wasError = false
      delete state.error
    })
  }
})
