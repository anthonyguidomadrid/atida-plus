import { stepperSlice } from '../stepper'

describe(stepperSlice.name, () => {
  describe(stepperSlice.actions.setActiveStep.toString(), () => {
    it('successfully sets the next checkout step', async () => {
      expect(
        stepperSlice.reducer(
          {
            activeStep: 0,
            reachedStep: 0,
            guestStep: 0,
            reachedGuestStep: 0,
            isPaymentStepActive: false
          },
          stepperSlice.actions.setActiveStep(1)
        )
      ).toEqual({
        activeStep: 1,
        reachedStep: 1,
        guestStep: 0,
        reachedGuestStep: 0,
        isPaymentStepActive: false
      })
    })

    describe('successfully sets the previous checkout step', () => {
      it('while keeping the previous reached step', async () => {
        expect(
          stepperSlice.reducer(
            {
              activeStep: 1,
              reachedStep: 1,
              guestStep: 0,
              reachedGuestStep: 0,
              isPaymentStepActive: false
            },
            stepperSlice.actions.setActiveStep(0)
          )
        ).toEqual({
          activeStep: 0,
          reachedStep: 1,
          guestStep: 0,
          reachedGuestStep: 0,
          isPaymentStepActive: false
        })
      })

      it('and resets the checkout steps', async () => {
        expect(
          stepperSlice.reducer(
            {
              activeStep: 1,
              reachedStep: 1,
              guestStep: 1,
              reachedGuestStep: 1,
              isPaymentStepActive: false
            },
            stepperSlice.actions.resetActiveReachedSteps()
          )
        ).toEqual({
          activeStep: 0,
          reachedStep: 0,
          guestStep: 0,
          reachedGuestStep: 0,
          isPaymentStepActive: false
        })
      })
    })
  })
  describe(stepperSlice.actions.setGuestStep.toString(), () => {
    it('successfully sets the next checkout step for guests', async () => {
      expect(
        stepperSlice.reducer(
          {
            activeStep: 0,
            reachedStep: 0,
            guestStep: 0,
            reachedGuestStep: 0,
            isPaymentStepActive: false
          },
          stepperSlice.actions.setGuestStep(1)
        )
      ).toEqual({
        activeStep: 0,
        reachedStep: 0,
        guestStep: 1,
        reachedGuestStep: 1,
        isPaymentStepActive: false
      })
    })

    describe('successfully sets the previous checkout step for guests', () => {
      it('while keeping the previous reached step', async () => {
        expect(
          stepperSlice.reducer(
            {
              activeStep: 0,
              reachedStep: 0,
              guestStep: 1,
              reachedGuestStep: 1,
              isPaymentStepActive: false
            },
            stepperSlice.actions.setGuestStep(0)
          )
        ).toEqual({
          activeStep: 0,
          reachedStep: 0,
          guestStep: 0,
          reachedGuestStep: 1,
          isPaymentStepActive: false
        })
      })
    })

    describe('successfully sets the isPaymentStepActive to true', () => {
      it('while keeping the previous reached step', async () => {
        expect(
          stepperSlice.reducer(
            {
              activeStep: 1,
              reachedStep: 1,
              guestStep: 0,
              reachedGuestStep: 0,
              isPaymentStepActive: false
            },
            stepperSlice.actions.setIsPaymentStepActive(true)
          )
        ).toEqual({
          activeStep: 1,
          reachedStep: 1,
          guestStep: 0,
          reachedGuestStep: 0,
          isPaymentStepActive: true
        })
      })
    })
  })
})
