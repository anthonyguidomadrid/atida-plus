import { combineReducers } from '@reduxjs/toolkit'
import { contentSlice } from './content'
import { itemStatesSlice } from './item-states'
import { couponSlice } from './coupon'
import { prescriptionSlice } from './prescription'

export const basketReducer = combineReducers({
  'item-states': itemStatesSlice.reducer,
  coupon: couponSlice.reducer,
  content: contentSlice.reducer,
  prescription: prescriptionSlice.reducer
})

export const {
  addToBasketTrigger,
  addToBasketRequest,
  addToBasketSuccess,
  addToBasketFailure,
  addToBasketFulfill,
  addSeveralToBasketTrigger
} = itemStatesSlice.actions

export const {
  removeFromBasketTrigger,
  removeFromBasketRequest,
  removeFromBasketSuccess,
  removeFromBasketFailure,
  removeFromBasketFulfill,
  changeItemQuantityTrigger,
  changeItemQuantityRequest,
  changeItemQuantitySuccess,
  changeItemQuantityFailure,
  changeItemQuantityFulfill,
  clearItemsState
} = itemStatesSlice.actions

export const {
  trigger: getBasketTrigger,
  request: getBasketRequest,
  success: getBasketSuccess,
  failure: getBasketFailure,
  cancel: getBasketCancel,
  fulfill: getBasketFulfill,
  reset: resetBasket,
  resetError: resetErrorBasket,
  triggerBasketModal: triggerBasketModal,
  handleProductQuantityAction: handleProductQuantityAction
} = contentSlice.actions

export const {
  addCouponTrigger,
  addCouponRequest,
  addCouponSuccess,
  addCouponFailure,
  addCouponFulfill,
  removeCouponTrigger,
  removeCouponRequest,
  removeCouponSuccess,
  removeCouponFailure,
  removeCouponFulfill,
  reset: resetCoupon
} = couponSlice.actions

export const {
  addPrescriptionToBasketTrigger,
  addPrescriptionToBasketRequest,
  addPrescriptionToBasketSuccess,
  addPrescriptionToBasketFailure,
  addPrescriptionToBasketFulfill,
  resetPrescriptionState
} = prescriptionSlice.actions
