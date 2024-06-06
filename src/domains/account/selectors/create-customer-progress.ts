import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectCreateAccountProgress = (state: RootState) =>
  state?.client?.account?.['create-account-progress']

export const selectCurrentStep = createSelector(
  selectCreateAccountProgress,
  data => data?.currentStep
)
