import { CreateAccountProgressSlice } from '../create-account-progress'

describe(CreateAccountProgressSlice.name, () => {
  describe(CreateAccountProgressSlice.actions.setCurrentStep.toString(), () => {
    it('sets the current step', () => {
      expect(
        CreateAccountProgressSlice.reducer(
          {
            currentStep: 0
          },
          CreateAccountProgressSlice.actions.setCurrentStep(1)
        )
      ).toEqual({
        currentStep: 1
      })
    })
  })
  describe(CreateAccountProgressSlice.actions.setCurrentStep.toString(), () => {
    it('resets the current step', () => {
      expect(
        CreateAccountProgressSlice.reducer(
          {
            currentStep: 1
          },
          CreateAccountProgressSlice.actions.resetCurrentStep()
        )
      ).toEqual({
        currentStep: 0
      })
    })
  })
})
