import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectContent = (state: RootState) => state?.client?.basket.coupon

export const selectCouponData = createSelector(
  selectContent,
  content => content?.coupon
)

export const selectCouponCode = createSelector(
  selectContent,
  content => content?.coupon?.[0]?.code
)

export const selectCouponWasError = createSelector(
  selectContent,
  content => content?.wasError ?? false
)

export const selectCouponIsLoading = createSelector(
  selectContent,
  content => content?.isLoading ?? false
)

export const selectCouponError = createSelector(
  selectContent,
  content => content.error
)
