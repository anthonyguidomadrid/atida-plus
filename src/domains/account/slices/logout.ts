import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CustomerDecodedJWT, LogoutTriggerPayload } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type LogoutState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  customer?: Omit<CustomerDecodedJWT, 'expires'>
}

const initialState: LogoutState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const logoutSlice = createSlice({
  name: 'account/logout',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<LogoutTriggerPayload>) {
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
      delete state.customer
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    }
  }
})
