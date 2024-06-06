import { combineReducers } from '@reduxjs/toolkit'
import { seoBlockSlice } from './fetch-seo'

export const seoBlockReducer = combineReducers({
  content: seoBlockSlice.reducer
})

export const {
  trigger: seoBlockTrigger,
  request: seoBlockRequest,
  success: seoBlockSuccess,
  failure: seoBlockFailure,
  fulfill: seoBlockFulfill
} = seoBlockSlice.actions
