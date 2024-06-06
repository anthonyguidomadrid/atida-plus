import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectPrescription = (state: RootState) =>
  state.client.basket?.prescription

export const selectPrescriptionWasSuccess = createSelector(
  selectPrescription,
  state => state?.wasSuccess
)

export const selectPrescriptionWasError = createSelector(
  selectPrescription,
  state => state?.wasError
)

export const selectPrescriptionErrorMessage = createSelector(
  selectPrescription,
  state => state?.error
)

export const selectPrescriptionIsLoading = createSelector(
  selectPrescription,
  state => state?.isLoading
)
