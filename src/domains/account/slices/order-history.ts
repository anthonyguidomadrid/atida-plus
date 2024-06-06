import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  OrderHistoryPayload,
  OrderHistorySortedDates,
  OrderHistoryTriggerPayload
} from '../types'

type OrderHistoryState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  orderHistory?: OrderHistorySortedDates[]
  totalPages?: number
}

const initialState: OrderHistoryState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const orderHistorySlice = createSlice({
  name: 'account/order-history',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<OrderHistoryTriggerPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false

      delete state.error
    },
    success(state, action: PayloadAction<OrderHistoryPayload>) {
      const { data, totalPages } = action.payload

      state.wasSuccess = true
      state.orderHistory = data
      state.totalPages = totalPages
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload

      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    clearDetails(state) {
      delete state.orderHistory
      delete state.totalPages
    }
  }
})
