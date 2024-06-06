import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '~domains/redux'

const selectStaticRecommendation = (state: RootState, props: { id?: string }) =>
  state?.server?.staticRecommendation['static-recommendation']?.details?.find(
    item => item.key === props?.id
  )

export const selectStaticRecommendationProducts = createSelector(
  selectStaticRecommendation,
  products => products?.products
)
