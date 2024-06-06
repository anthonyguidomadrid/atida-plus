import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  VerifyResetPasswordTokenSuccessPayload,
  VerifyResetPasswordTokenTriggerPayload,
  VerifyResetPasswordTokenState
} from '../types'

const initialState: VerifyResetPasswordTokenState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const verifyResetPasswordTokenSlice = createSlice({
  name: 'account/verify-reset-password-token',
  initialState,
  reducers: {
    trigger(
      _state,
      _action: PayloadAction<VerifyResetPasswordTokenTriggerPayload>
    ) {
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
      action: PayloadAction<VerifyResetPasswordTokenSuccessPayload>
    ) {
      state.wasSuccess = true
      state.user = {
        firstName: action.payload.data.attributes.firstName,
        lastName: action.payload.data.attributes.lastName,
        email: action.payload.data.attributes.email
      }
    },
    failure(state, action: PayloadAction<{ message: string; status: number }>) {
      const { message, status } = action.payload
      state.wasError = true
      state.error = {
        message: message,
        status: status
      }
    },
    fulfill(state) {
      state.isLoading = false
    }
  }
})
