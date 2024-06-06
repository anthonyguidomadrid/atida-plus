import { combineReducers } from '@reduxjs/toolkit'
import { fetchStaticRecommendationSlice } from '../slices/static-recommendation'

export const recommendationsReducer = combineReducers({
  'static-recommendation': fetchStaticRecommendationSlice.reducer
})

export const {
  trigger: fetchStaticRecommendationTrigger,
  request: fetchStaticRecommendationRequest,
  success: fetchStaticRecommendationSuccess,
  failure: fetchStaticRecommendationFailure,
  fulfill: fetchStaticRecommendationFulfill
} = fetchStaticRecommendationSlice.actions
