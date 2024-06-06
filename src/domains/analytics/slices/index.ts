import { combineReducers } from '@reduxjs/toolkit'
import { isSegmentInitialisedSlice } from './is-segment-initialised'

export const analyticsReducer = combineReducers({
  data: isSegmentInitialisedSlice.reducer
})

export const { setAsInitialised } = isSegmentInitialisedSlice.actions
