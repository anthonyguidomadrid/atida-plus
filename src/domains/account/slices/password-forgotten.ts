import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PasswordForgottenTriggerPayload } from '../types'

type PasswordForgottenState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: PasswordForgottenState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const passwordForgottenSlice = createSlice({
  name: 'account/password-forgotten',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<PasswordForgottenTriggerPayload>) {
      // no op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false

      delete state.error
    },
    success(
      state,
      _action /* : PayloadAction<PasswordForgottenSuccessPayload> */
    ) {
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
    }
  }
})
