import { combineReducers } from '@reduxjs/toolkit'
import { contentSlice } from './content'

export const brandReducer = combineReducers({
  content: contentSlice.reducer
})

export const {
  trigger: getBrandTrigger,
  request: getBrandRequest,
  success: getBrandSuccess,
  failure: getBrandFailure,
  cancel: getBrandCancel,
  fulfill: getBrandFulfill
} = contentSlice.actions
