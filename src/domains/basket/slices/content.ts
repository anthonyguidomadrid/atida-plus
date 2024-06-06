import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { itemStatesSlice } from './item-states'
import { prescriptionSlice } from './prescription'
import { couponSlice } from './coupon'
import type {
  AddToBasketSuccessPayload,
  RemoveFromBasketSuccessPayload,
  ChangeItemQuantitySuccessPayload,
  BasketWithProducts,
  ChangeItemQuantityFailurePayload,
  ItemQuantityErrorDetails
} from '../types'
import { dataSlice as checkoutDataSlice } from '~domains/checkout/slices/data'
import { SetCheckoutDataPayload } from '~domains/checkout/types'
import { clearStateErrors } from '~domains/redux/actions'
import { Product } from '~domains/product'

type ContentState = {
  data?: BasketWithProducts
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  basketModalProduct?: Product
  quantityAction?: boolean
  quantityError?: ItemQuantityErrorDetails
}

const initialState: ContentState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const contentSlice = createSlice({
  name: 'basket/content',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<{ force?: boolean } | undefined>) {
      // no-op, triggers saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<BasketWithProducts>) {
      state.wasSuccess = true
      state.data = action.payload
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    cancel() {
      // no-op, triggered by saga when no need to re-fetch basket
    },
    fulfill(state) {
      state.isLoading = false
    },
    resetError(state) {
      state.wasError = false
    },
    reset(state) {
      state.isLoading = false
      state.wasError = false
      state.wasSuccess = false
      state.data = undefined
    },
    // TODO Rename later to something more relevant
    triggerBasketModal(state, action: PayloadAction<Product>) {
      state.basketModalProduct = action.payload
    },
    handleProductQuantityAction(state, action) {
      state.quantityAction = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(
        itemStatesSlice.actions.addToBasketSuccess,
        (state, action: PayloadAction<AddToBasketSuccessPayload>) => {
          state.wasSuccess = true
          state.data = action.payload.data
        }
      )
      .addCase(
        itemStatesSlice.actions.removeFromBasketSuccess,
        (state, action: PayloadAction<RemoveFromBasketSuccessPayload>) => {
          state.wasSuccess = true

          state.data = {
            ...state.data,
            ...action.payload.data,
            items:
              state.data?.items
                // remove the item that has been removed from the basket
                .filter(item =>
                  action.payload.data?.items?.find(({ id }) => id === item?.id)
                )
                .map(item => ({
                  ...item,
                  ...action.payload.data?.items?.filter(
                    ({ id }) => id === item?.id
                  )[0]
                })) ?? []
          }
        }
      )
      .addCase(
        itemStatesSlice.actions.changeItemQuantitySuccess,
        (state, action: PayloadAction<ChangeItemQuantitySuccessPayload>) => {
          state.wasSuccess = true

          state.data = {
            ...state.data,
            ...action.payload.data,
            items:
              state.data?.items
                // remove the item that has been removed from the basket
                .filter(item =>
                  action.payload.data?.items?.find(({ id }) => id === item?.id)
                )
                .map(item => ({
                  ...item,
                  ...action.payload.data?.items?.filter(
                    ({ id }) => id === item?.id
                  )[0]
                })) ?? []
          }
        }
      )
      .addCase(
        checkoutDataSlice.actions.success,
        (state, action: PayloadAction<SetCheckoutDataPayload>) => {
          state.data = action.payload.basket
          state.wasSuccess = true
        }
      )
      .addCase(clearStateErrors, (state, _action) => {
        state.wasError = false
        delete state.error
      })
      .addCase(
        couponSlice.actions.addCouponSuccess,
        (state, action: PayloadAction<BasketWithProducts>) => {
          state.wasSuccess = true
          state.data = action.payload
        }
      )
      .addCase(
        couponSlice.actions.removeCouponSuccess,
        (state, action: PayloadAction<BasketWithProducts>) => {
          state.wasSuccess = true
          state.data = action.payload
        }
      )
      .addCase(
        itemStatesSlice.actions.changeItemQuantityFailure,
        (state, action: PayloadAction<ChangeItemQuantityFailurePayload>) => {
          state.wasError = true
          state.quantityError = action.payload.details
        }
      )
      .addCase(
        prescriptionSlice.actions.addPrescriptionToBasketSuccess,
        (state, action: PayloadAction<BasketWithProducts>) => {
          state.wasSuccess = true
          state.data = action.payload
        }
      )
      .addCase(
        prescriptionSlice.actions.addPrescriptionToBasketFailure,
        (state, action: PayloadAction<{ message: string }>) => {
          state.wasError = true
          state.error = action.payload.message
        }
      )
  }
})
