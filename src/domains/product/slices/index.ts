import { combineReducers } from '@reduxjs/toolkit'

import { contentSlice } from './content'
import { viewToggleSlice } from './view-toggle'

export const productReducer = combineReducers({
  content: contentSlice.reducer,
  viewToggle: viewToggleSlice.reducer
})

export const {
  trigger: contentTrigger,
  request: contentRequest,
  success: contentSuccess,
  failure: contentFailure,
  fulfill: contentFulfill,
  setShowLabels: setShowLabels,
  setClearData: setClearData
} = contentSlice.actions

export const { toggleView } = viewToggleSlice.actions
