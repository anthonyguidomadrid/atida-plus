import { combineReducers } from '@reduxjs/toolkit'
import { contentSlice } from './content'

export const promotionReducer = combineReducers({
  content: contentSlice.reducer
})

export const {
  trigger: getPromotionTrigger,
  request: getPromotionRequest,
  success: getPromotionSuccess,
  failure: getPromotionFailure,
  cancel: getPromotionCancel,
  fulfill: getPromotionFulfill,
  updateSkip: handleUpdateSkip,
  reset: resetPromotion
} = contentSlice.actions
