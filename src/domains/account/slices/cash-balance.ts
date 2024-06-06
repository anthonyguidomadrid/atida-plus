import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type CashBalanceState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  amount: number
}

const initialState: CashBalanceState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  amount: 0
}

export const cashBalanceSlice = createSlice({
  name: 'account/cashBalance',
  initialState,
  reducers: {
    trigger() {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action) {
      state.wasSuccess = true
      const { total } = action.payload
      state.amount = total
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
