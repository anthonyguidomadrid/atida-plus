import { combineReducers } from '@reduxjs/toolkit'
import { commonSlice } from './common'
import { pageContentSlice } from './page-content'
import { pageRedirectSlice } from './page-redirect'

export const pageReducer = combineReducers({
  common: commonSlice.reducer,
  'page-content': pageContentSlice.reducer,
  'page-redirect': pageRedirectSlice.reducer
})

export const {
  trigger: commonTrigger,
  request: commonRequest,
  success: commonSuccess,
  failure: commonFailure,
  fulfill: commonFulfill
} = commonSlice.actions

export const {
  trigger: pageContentTrigger,
  request: pageContentRequest,
  success: pageContentSuccess,
  failure: pageContentFailure,
  fulfill: pageContentFulfill
} = pageContentSlice.actions

export const {
  trigger: pageRedirectTrigger,
  request: pageRedirectRequest,
  success: pageRedirectSuccess,
  failure: pageRedirectFailure,
  fulfill: pageRedirectFulfill
} = pageRedirectSlice.actions
