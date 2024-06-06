import {
  createMBWayPaymentData,
  createMBWayPaymentResponseData
} from '~domains/checkout/__mocks__/create-mbway-payment'
import { clearStateErrors } from '~domains/redux/actions'
import { createMBWayPaymentSlice } from '../create-mbway-payment'

describe(createMBWayPaymentSlice.name, () => {
  describe(createMBWayPaymentSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createMBWayPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createMBWayPaymentSlice.actions.trigger(createMBWayPaymentData)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createMBWayPaymentSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createMBWayPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createMBWayPaymentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createMBWayPaymentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and discards the payload when undefined', () => {
      expect(
        createMBWayPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createMBWayPaymentSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })

    it('sets wasSuccess to true and stores the payload', () => {
      expect(
        createMBWayPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createMBWayPaymentSlice.actions.success(
            createMBWayPaymentResponseData
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: createMBWayPaymentResponseData
      })
    })
  })

  describe(createMBWayPaymentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createMBWayPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createMBWayPaymentSlice.actions.failure({
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

  describe(createMBWayPaymentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createMBWayPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createMBWayPaymentSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears the errors in the state', async () => {
      expect(
        createMBWayPaymentSlice.reducer(
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

  describe(createMBWayPaymentSlice.actions.clearDetails.toString(), () => {
    it('clears the details in the state', async () => {
      expect(
        createMBWayPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: createMBWayPaymentResponseData
          },
          createMBWayPaymentSlice.actions.clearDetails()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
