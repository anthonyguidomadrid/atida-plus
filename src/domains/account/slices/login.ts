import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LoginMessages, LoginTriggerPayload } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type LoginState = {
  isLoading: boolean
  notification: string
  wasSuccess: boolean
  wasError: boolean
  email?: string
  error?: string
  messages?: LoginMessages
}

const initialState: LoginState = {
  isLoading: false,
  notification: '',
  wasSuccess: false,
  wasError: false
}

export const loginSlice = createSlice({
  name: 'account/login',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<LoginTriggerPayload>) {
      // no-op, used for triggering saga
    },
    triggerNotification(state, action: PayloadAction<{ type: string }>) {
      const { type } = action.payload

      state.notification = type
    },
    clearNotification(state) {
      state.notification = ''
    },
    clearError(state) {
      delete state.error
      state.wasError = false
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<LoginMessages>) {
      state.messages = action.payload
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
      state.notification = ''
    },
    clearMessages(state) {
      delete state.messages
    },
    setEmail(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
    }
  }
})
