import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectRecommendations = (state: RootState) => state?.client?.exponea

export const selectIsLoading = createSelector(
  selectRecommendations,
  recommendedProducts =>
    recommendedProducts?.recommendations?.isLoading ?? false
)

export const selectRecommendedProducts = createSelector(
  selectRecommendations,
  recommendedProducts => recommendedProducts?.recommendations?.details
)
