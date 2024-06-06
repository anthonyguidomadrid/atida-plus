import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UpdateCustomerPersonalDetailsTriggerPayload } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type UpdateCustomerPersonalDetailsState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  showNotification: boolean
  error?: string
}

const initialState: UpdateCustomerPersonalDetailsState = {
  isLoading: false,
  wasSuccess: false,
  showNotification: false,
  wasError: false
}

export const updateCustomerPersonalDetailsSlice = createSlice({
  name: 'account/details/change-personal-details',
  initialState,
  reducers: {
    trigger(
      _state,
      _action: PayloadAction<UpdateCustomerPersonalDetailsTriggerPayload>
    ) {
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
