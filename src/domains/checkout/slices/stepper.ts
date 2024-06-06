import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Stepper } from '../types'

const initialStepperState: Stepper = {
  activeStep: 0,
  reachedStep: 0,
  guestStep: 0,
  reachedGuestStep: 0,
  isPaymentStepActive: false
}

export const stepperSlice = createSlice({
  name: 'checkout/stepper',
  initialState: initialStepperState,
  reducers: {
    setActiveStep(state, action: PayloadAction<number>) {
      const newStep = action.payload

      state.activeStep = newStep

      // Increase reachedStep if it's lower than newStep
      if (newStep > state.reachedStep) {
        state.reachedStep = newStep
      }
    },
    resetActiveReachedSteps(state, _action: PayloadAction<void>) {
      state.activeStep = 0
      state.reachedStep = 0
      state.guestStep = 0
      state.reachedGuestStep = 0
      state.isPaymentStepActive = false
    },
    setGuestStep(state, action: PayloadAction<number>) {
      const newStep = action.payload
      state.guestStep = newStep

      if (newStep > state.reachedGuestStep) {
        state.reachedGuestStep = newStep
      }
    },
    setIsPaymentStepActive(state, action: PayloadAction<boolean>) {
      state.isPaymentStepActive = action.payload
    }
  }
})
