import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectExpertSignature = (state: RootState) => state.server.expertSignature

export const selectExpert = createSelector(
  selectExpertSignature,
  expertSignature => expertSignature?.content?.experts?.[0]
)
