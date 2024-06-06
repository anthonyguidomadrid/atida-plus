import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SelectedPaymentMethod } from '../types'

const initialSelectedPaymentMethodState: SelectedPaymentMethod = {
  selectedPaymentMethod: '',
  isValid: false,
  isPaymentPending: false
}

export const selectedPaymentMethodSlice = createSlice({
  name: 'checkout/selected-payment-method',
  initialState: initialSelectedPaymentMethodState,
  reducers: {
    setSelectedPaymentMethod(state, action: PayloadAction<string>) {
      state.selectedPaymentMethod = action.payload
    },
    setIsValidPaymentMethod(state, action: PayloadAction<boolean>) {
      state.isValid = action.payload
    },
    setIsPaymentPending(state, action: PayloadAction<boolean>) {
      state.isPaymentPending = action.payload
    }
  }
})
