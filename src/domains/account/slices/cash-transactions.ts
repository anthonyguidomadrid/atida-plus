import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  AtidaCashTransactionsHistoryByDate,
  AtidaCashTransactionTriggerPayload
} from '../types'

type CashTransactionsState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  transactions: AtidaCashTransactionsHistoryByDate | []
  totalPages?: number
}

const initialState: CashTransactionsState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  transactions: []
}

export const cashTransactionsSlice = createSlice({
  name: 'account/cashTransactions',
  initialState,
  reducers: {
    trigger(
      _state,
      _action: PayloadAction<AtidaCashTransactionTriggerPayload>
    ) {
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
      const data = action.payload
      state.transactions = data.transactions
      state.totalPages = data.totalPages
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
