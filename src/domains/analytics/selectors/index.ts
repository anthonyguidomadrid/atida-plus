import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectSegmentState = (state: RootState) =>
  state?.client?.analytics?.data?.isInitialised

export const selectIsSegmentInitialised = createSelector(
  selectSegmentState,
  data => data
)
