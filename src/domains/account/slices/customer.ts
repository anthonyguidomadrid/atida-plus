import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  GetCustomerTriggerPayload,
  Customer,
  ReadCustomerPayload,
  CustomerAddress,
  RequestInvoiceTriggerPayload
} from '../types'

type CustomerState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  reference?: string
  details?: Partial<Customer>
  addresses?: CustomerAddress[]
  showNotification: boolean
}

const initialState: CustomerState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  showNotification: false
}

export const customerSlice = createSlice({
  name: 'account/customer',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<GetCustomerTriggerPayload>) {
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
      const { addresses, ...details } = action.payload

      details.hasPreviousSuccessfulOrder =
        state.details?.hasPreviousSuccessfulOrder
      state.details = details
      state.addresses = addresses
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
      delete state.reference
      delete state.details
      delete state.addresses
    },
    fulfill(state) {
      state.isLoading = false
    },
    triggerReadCustomer(_state) {
      // no-op, used for triggering saga
    },
    triggerShowNotification(state) {
      state.showNotification = true
    },
    triggerHideNotification(state) {
      state.showNotification = false
    },
    readCustomer(state, action: PayloadAction<ReadCustomerPayload>) {
      state.reference = action.payload.reference
      if (state.details) {
        state.details.hasPreviousSuccessfulOrder =
          action.payload.hasPreviousSuccessfulOrder
      } else {
        state.details = {
          hasPreviousSuccessfulOrder: action.payload.hasPreviousSuccessfulOrder
        }
      }
    },
    invoiceRequireTrigger(
      _state,
      _action: PayloadAction<RequestInvoiceTriggerPayload>
    ) {
      // no-op, used for triggering saga
    },
    invoiceRequireSuccess(state, action) {
      state.wasSuccess = true
      const invoiceRequired = action.payload
      if (state.details) {
        state.details.invoiceRequired = invoiceRequired
      }
    },
    invoiceRequireFailure(state, action) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    clearData(state) {
      delete state.reference
      delete state.details
      delete state.addresses
    }
  }
})
