import { combineReducers } from '@reduxjs/toolkit'
import { fetchRecommendationsSlice } from '../slices/fetch-recommendations'
import { fetchAllRecommendationsSlice } from './fetch-all-recommendations'

export const recommendationsReducer = combineReducers({
  recommendations: fetchRecommendationsSlice.reducer,
  'all-recommendations': fetchAllRecommendationsSlice.reducer
})

export const {
  trigger: fetchRecommendationsTrigger,
  request: fetchRecommendationsRequest,
  success: fetchRecommendationsSuccess,
  failure: fetchRecommendationsFailure,
  fulfill: fetchRecommendationsFulfill
} = fetchRecommendationsSlice.actions

export const {
  trigger: fetchAllRecommendationsTrigger,
  request: fetchAllRecommendationsRequest,
  success: fetchAllRecommendationsSuccess,
  failure: fetchAllRecommendationsFailure,
  fulfill: fetchAllRecommendationsFulfill
} = fetchAllRecommendationsSlice.actions
