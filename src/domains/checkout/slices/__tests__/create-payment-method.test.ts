import {
  createPaymentMethodData,
  paymentMethodTriggerData
} from '~domains/checkout/__mocks__/create-payment-method'
import { clearStateErrors } from '~domains/redux/actions'
import { createPaymentMethodSlice } from '../create-payment-method'

describe(createPaymentMethodSlice.name, () => {
  describe(createPaymentMethodSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createPaymentMethodSlice.actions.trigger(paymentMethodTriggerData)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createPaymentMethodSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createPaymentMethodSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createPaymentMethodSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createPaymentMethodSlice.actions.success(createPaymentMethodData)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: createPaymentMethodData
      })
    })

    it('tests the success case when methodRef is undefined', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createPaymentMethodSlice.actions.success({ methodRef: undefined })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createPaymentMethodSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createPaymentMethodSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(createPaymentMethodSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createPaymentMethodSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createPaymentMethodSlice.actions.setMethodCode.toString(), () => {
    it('sets state details', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createPaymentMethodSlice.actions.setMethodCode({
            methodCode: ''
          })
        )
      ).toEqual({
        isLoading: false,
        details: { methodCode: '' },
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createPaymentMethodSlice.actions.clearDetails.toString(), () => {
    it('clears state details', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createPaymentMethodSlice.actions.clearDetails()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createPaymentMethodSlice.actions.clearMethodCode.toString(), () => {
    it('clears method code', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: createPaymentMethodData
          },
          createPaymentMethodSlice.actions.clearMethodCode()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        details: createPaymentMethodData
      })
    })

    it('clears method code when details are undefined', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: undefined
          },
          createPaymentMethodSlice.actions.clearMethodCode()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        details: undefined
      })
    })
  })

  describe(createPaymentMethodSlice.actions.setError.toString(), () => {
    it('sets the state wasError to true when there is no action payload', () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true
          },
          createPaymentMethodSlice.actions.setError(undefined)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: true
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears the errors in the state', async () => {
      expect(
        createPaymentMethodSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error'
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
