import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type UpdateTaxReferenceState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: UpdateTaxReferenceState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const updateTaxReferenceSlice = createSlice({
  name: 'account/details/update-tax-reference',
  initialState,
  reducers: {
    trigger(
      _state,
      _action: PayloadAction<{
        customerReference: string
        taxReference: string
      }>
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
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    clearError(state) {
      delete state.error
      state.wasError = false
    }
  }
})
