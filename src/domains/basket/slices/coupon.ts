import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import { BasketCoupon, BasketWithProducts } from '~domains/basket/types'

type ContentState = {
  coupon?: BasketCoupon[]
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: ContentState = {
  coupon: [],
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const couponSlice = createSlice({
  name: 'basket/coupon',
  initialState,
  reducers: {
    addCouponTrigger(_state, _action: PayloadAction<string | string[]>) {
      // no-op, triggers saga
    },
    addCouponRequest(state) {
      state.isLoading = true
    },
    addCouponSuccess(state, action: PayloadAction<BasketWithProducts>) {
      state.wasSuccess = true
      state.wasError = false
      const { coupons } = action.payload
      state.coupon = coupons
    },
    addCouponFailure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    addCouponFulfill(state) {
      state.isLoading = false
    },
    reset(state) {
      state.isLoading = false
      state.wasError = false
      state.wasSuccess = false
      state.coupon = []
    },
    removeCouponTrigger(_state, _action: PayloadAction<string | string[]>) {
      // no-op, triggers saga
    },
    removeCouponRequest(state) {
      state.isLoading = true
    },
    removeCouponSuccess(state, action: PayloadAction<BasketWithProducts>) {
      state.wasSuccess = true
      const { coupons } = action.payload
      state.coupon = coupons
    },
    removeCouponFailure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    removeCouponFulfill(state) {
      state.isLoading = false
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
