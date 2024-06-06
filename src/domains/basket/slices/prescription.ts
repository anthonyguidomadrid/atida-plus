import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BasketWithProducts } from '../types'

export type Prescription = {
  token: string | string[]
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  data?: BasketWithProducts
}

const initialState: Prescription = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  token: []
}
export const prescriptionSlice = createSlice({
  name: 'basket/prescription',
  initialState,
  reducers: {
    addPrescriptionToBasketTrigger(
      _state,
      _action: PayloadAction<string | string[]>
    ) {
      // no-op, triggers saga
    },
    addPrescriptionToBasketRequest(state) {
      state.isLoading = true
      state.wasSuccess = false
      delete state.error
    },
    addPrescriptionToBasketSuccess(
      state,
      action: PayloadAction<BasketWithProducts>
    ) {
      state.data = action.payload
      state.wasSuccess = true
    },
    addPrescriptionToBasketFailure(
      state,
      action: PayloadAction<{ message: string }>
    ) {
      const { message } = action.payload
      state.wasError = true
      state.wasSuccess = false
      state.error = message
    },
    addPrescriptionToBasketFulfill(state) {
      state.isLoading = false
    },
    resetPrescriptionState(state) {
      state.wasSuccess = false
      state.wasError = false
      state.isLoading = false
      delete state.error
    }
  }
})
