import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectStepper = (state: RootState) => state?.client?.checkout?.stepper

export const selectActiveStep = createSelector(
  selectStepper,
  data => data?.activeStep
)

export const selectReachedStep = createSelector(
  selectStepper,
  data => data?.reachedStep
)

export const selectGuestStep = createSelector(
  selectStepper,
  data => data?.guestStep
)

export const selectReachedGuestStep = createSelector(
  selectStepper,
  data => data?.reachedGuestStep
)

export const selectIsPaymentStepActive = createSelector(
  selectStepper,
  data => data?.isPaymentStepActive
)
