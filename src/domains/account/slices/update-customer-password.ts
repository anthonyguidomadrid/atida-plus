import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ChangePasswordPayload } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type UpdateCustomerPasswordState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  showNotification: boolean
  error?: string
}

const initialState: UpdateCustomerPasswordState = {
  isLoading: false,
  wasSuccess: false,
  showNotification: false,
  wasError: false
}

export const updateCustomerPasswordSlice = createSlice({
  name: 'account/details/change-password',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<ChangePasswordPayload>) {
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
      state.showNotification = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    hideNotificationTrigger(_state) {
      // no-op, used for triggering hideNotificationTrigger saga
    },
    hideNotification(state) {
      state.showNotification = false
    }
  }
})
