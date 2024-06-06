import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SetNewPasswordTriggerPayload } from '../types'

type SetNewPasswordState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: SetNewPasswordState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const setNewPasswordSlice = createSlice({
  name: 'account/set-new-password',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<SetNewPasswordTriggerPayload>) {
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
    },
    clearState(state) {
      state.isLoading = false
      state.wasError = false
      state.wasSuccess = false
    }
  }
})
