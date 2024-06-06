import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  OrderDetailsPayload,
  OrderDetailsSingle,
  OrderDetailsTriggerPayload
} from '../types'

type OrderDetailsState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  orderDetails?: OrderDetailsSingle
}

const initialState: OrderDetailsState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const orderDetailsSlice = createSlice({
  name: 'account/order-details',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<OrderDetailsTriggerPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false

      delete state.error
    },
    success(state, action: PayloadAction<OrderDetailsPayload>) {
      const data = action.payload

      state.wasSuccess = true
      state.orderDetails = data
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
      delete state.orderDetails
    }
  }
})
