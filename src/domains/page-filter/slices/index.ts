import { combineReducers } from '@reduxjs/toolkit'
import { contentSlice } from './content'

export const pageFilterReducer = combineReducers({
  content: contentSlice.reducer
})

export const {
  trigger: getPageFilterTrigger,
  request: getPageFilterRequest,
  success: getPageFilterSuccess,
  failure: getPageFilterFailure,
  cancel: getPageFilterCancel,
  fulfill: getPageFilterFulfill,
  reset: resetPageFilter
} = contentSlice.actions
