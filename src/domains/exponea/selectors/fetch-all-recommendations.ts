import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectRecommendations = (state: RootState, props: { type?: string }) =>
  state?.client?.exponea['all-recommendations'].content?.filter(
    item => item.items[0]?.type === props?.type
  ) || []

export const selectRecommendationIdFromCollection = createSelector(
  selectRecommendations,
  recommendedProducts => recommendedProducts[0]?.items[0]?.id
)

export const selectRecommendationTitleFromCollection = createSelector(
  selectRecommendations,
  recommendedProducts => recommendedProducts[0]?.items[0]?.title
)

export const selectRecommendationIsSliderFromCollection = createSelector(
  selectRecommendations,
  recommendedProducts => recommendedProducts[0]?.items[0]?.isSlider
)

export const selectRecommendationItemsQuantityFromCollection = createSelector(
  selectRecommendations,
  recommendedProducts => recommendedProducts[0]?.items[0]?.quantity
)

export const selectRecommendationFromCollection = createSelector(
  selectRecommendations,
  recommendedProducts => recommendedProducts[0]?.items[0]
)
