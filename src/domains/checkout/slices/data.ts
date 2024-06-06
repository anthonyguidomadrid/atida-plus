import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CheckoutData, SetCheckoutDataPayload } from '../types'
import { clearStateErrors } from '~domains/redux/actions'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  details?: Omit<CheckoutData, 'basket'>
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const dataSlice = createSlice({
  name: 'checkout/data',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<SetCheckoutDataPayload>) {
      // no-op, used for triggering saga
    },
    request(state, action: PayloadAction<SetCheckoutDataPayload>) {
      const { shouldSetLoading, isDelivery, payments } = action.payload
      const paymentMethodWithAmount = payments?.find(
        payment =>
          typeof payment.amount !== undefined && payment.amount !== null
      )
      if (
        ((!paymentMethodWithAmount?.amount &&
          (paymentMethodWithAmount?.amount === undefined ||
            paymentMethodWithAmount?.amount === null)) ||
          shouldSetLoading) &&
        !isDelivery
      ) {
        state.isLoading = true
      }
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<CheckoutData>) {
      const { basket, ...data } = action.payload
      if (typeof data !== 'undefined') state.details = data
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
    clearDetails(state) {
      delete state.details
    },
    clearError(state) {
      state.wasError = false
      delete state.error
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
