import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import { reOrderPayload } from '../types'

type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  details?: { orderId: string }
  error?: string
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const reOrderSlice = createSlice({
  name: 'checkout/re-order',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<reOrderPayload>) {
      //no-op, used for triggering
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
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
    builder.addCase(clearStateErrors, (state, _actions) => {
      state.wasError = false
      delete state.error
    })
  }
})
