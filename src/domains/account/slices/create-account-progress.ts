import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CreateAccountProgress } from '../types'

const initialStepperState: CreateAccountProgress = {
  currentStep: 0
}

export const CreateAccountProgressSlice = createSlice({
  name: 'account/create-account-progress',
  initialState: initialStepperState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      const newStep = action.payload

      state.currentStep = newStep
    },
    resetCurrentStep(state, _action: PayloadAction<void>) {
      state.currentStep = 0
    }
  }
})
