import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  AddToBasketFailurePayload,
  AddToBasketPayload,
  AddToBasketSuccessPayload,
  RemoveFromBasketPayload,
  RemoveFromBasketSuccessPayload,
  RemoveFromBasketFailurePayload,
  ChangeItemQuantityPayload,
  ChangeItemQuantitySuccessPayload,
  ChangeItemQuantityFailurePayload,
  ItemQuantityErrorDetails,
  AddSeveralToBasketPayload
} from '../types'

type BasketItemState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  errorInfo?: ItemQuantityErrorDetails
}

type BasketItemStatesState = Record<string, BasketItemState>

const initialState: BasketItemStatesState = {}

const INVALID_SKU = 'invalid-sku'
const INVALID_ID = 'invalid-id'

export const itemStatesSlice = createSlice({
  name: 'basket/item-states',
  initialState,
  reducers: {
    addToBasketTrigger(state, action: PayloadAction<AddToBasketPayload>) {
      // handles setting up the state object for the item
      const { sku = INVALID_SKU } = action.payload
      state[sku] = {
        isLoading: false,
        wasSuccess: false,
        wasError: false
      }
    },
    addToBasketRequest(state, action: PayloadAction<AddToBasketPayload>) {
      const { sku = INVALID_SKU } = action.payload
      state[sku].isLoading = true
    },
    addToBasketSuccess(
      state,
      action: PayloadAction<AddToBasketSuccessPayload>
    ) {
      const { sku = INVALID_SKU } = action.payload
      state[sku].wasSuccess = true
    },
    addToBasketFailure(
      state,
      action: PayloadAction<AddToBasketFailurePayload>
    ) {
      const { message } = action.payload
      const { sku = INVALID_SKU } = action.payload
      state[sku].wasError = true
      state[sku].error = message
    },
    addToBasketFulfill(state, action: PayloadAction<AddToBasketPayload>) {
      const { sku = INVALID_SKU } = action.payload
      state[sku].isLoading = false
    },
    // for adding more than one product at a time
    addSeveralToBasketTrigger(
      state,
      action: PayloadAction<AddSeveralToBasketPayload>
    ) {
      // handles setting up the state object for the item
      const { skus = [] } = action.payload
      state[skus[skus.length - 1]] = {
        isLoading: false,
        wasSuccess: false,
        wasError: false
      }
    },
    // remove from basket reducers
    removeFromBasketTrigger(
      state,
      action: PayloadAction<RemoveFromBasketPayload>
    ) {
      const { id = INVALID_ID } = action.payload

      state[id] = {
        isLoading: false,
        wasSuccess: false,
        wasError: false
      }
    },
    removeFromBasketRequest(
      state,
      action: PayloadAction<RemoveFromBasketPayload>
    ) {
      const { id = INVALID_ID } = action.payload
      state[id].isLoading = true
    },
    removeFromBasketSuccess(
      state,
      action: PayloadAction<RemoveFromBasketSuccessPayload>
    ) {
      const { id = INVALID_ID } = action.payload
      state[id].wasSuccess = true
    },
    removeFromBasketFailure(
      state,
      action: PayloadAction<RemoveFromBasketFailurePayload>
    ) {
      const { message } = action.payload
      const { id = INVALID_ID } = action.payload
      state[id].wasError = true
      state[id].error = message
    },
    removeFromBasketFulfill(
      state,
      action: PayloadAction<RemoveFromBasketPayload>
    ) {
      const { id = INVALID_ID } = action.payload
      state[id].isLoading = false
    },
    // change item quantity reducers
    changeItemQuantityTrigger(
      state,
      action: PayloadAction<ChangeItemQuantityPayload>
    ) {
      const { sku = INVALID_SKU } = action.payload

      state[sku] = {
        isLoading: false,
        wasSuccess: false,
        wasError: false
      }
    },
    changeItemQuantityRequest(
      state,
      action: PayloadAction<ChangeItemQuantityPayload>
    ) {
      const { sku = INVALID_SKU } = action.payload
      state[sku].isLoading = true
    },
    changeItemQuantitySuccess(
      state,
      action: PayloadAction<ChangeItemQuantitySuccessPayload>
    ) {
      const { sku = INVALID_SKU } = action.payload
      state[sku].wasSuccess = true
    },
    changeItemQuantityFailure(
      state,
      action: PayloadAction<ChangeItemQuantityFailurePayload>
    ) {
      const { message, details } = action.payload
      const { sku = INVALID_SKU } = action.payload
      state[sku].wasError = true
      state[sku].error = message
      state[sku].errorInfo = details
    },
    changeItemQuantityFulfill(
      state,
      action: PayloadAction<ChangeItemQuantityPayload>
    ) {
      const { sku = INVALID_SKU } = action.payload
      state[sku].isLoading = false
    },
    clearItemsState(state) {
      for (const key in state) {
        delete state[key]
      }
    }
  }
})
