import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BasketWithProducts } from '~domains/basket/types'
import { clearStateErrors } from '~domains/redux/actions'
import type {
  CheckoutData,
  CreateOrderError,
  SetCheckoutDataPayload
} from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string | string[]
  details?: CheckoutData & {
    temporaryBasket?: BasketWithProducts | undefined
  }
  errorInfo?: CreateOrderError
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const createOrderSlice = createSlice({
  name: 'checkout/create-order',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<SetCheckoutDataPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<CheckoutData>) {
      const data = action.payload
      if (typeof data !== 'undefined') state.details = data
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<CreateOrderError>) {
      const { errorMessage } = action.payload
      state.wasError = true
      state.error = errorMessage
      state.errorInfo = action.payload
    },
    fulfill(state) {
      state.isLoading = false
    },
    setOrderId(state, action: PayloadAction<{ orderId?: string }>) {
      state.details = {
        ...state.details,
        orderId: action.payload.orderId
      }
    },
    setTemporaryBasket(
      state,
      action: PayloadAction<{
        basketItems?: BasketWithProducts | undefined
      }>
    ) {
      state.details = {
        ...state.details,
        temporaryBasket: action.payload.basketItems
      }
    },
    clearDetails(state) {
      delete state.details
    },
    resetState(state) {
      state.isLoading = false
      state.wasSuccess = false
      state.wasError = false
      delete state.details
      delete state.error
      delete state.errorInfo
    },
    clearTemporaryBasket(state) {
      delete state?.details?.temporaryBasket
    },
    clearError(state) {
      delete state.error
      state.wasError = false
      delete state.errorInfo
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
      delete state.errorInfo
    })
  }
})
