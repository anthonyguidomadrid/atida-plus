import {
  createAdyenPaymentData,
  createAdyenPaymentResponseData
} from '~domains/checkout/__mocks__/create-adyen-payment'
import { clearStateErrors } from '~domains/redux/actions'
import { createAdyenPaymentSlice } from '../create-adyen-payment'

describe(createAdyenPaymentSlice.name, () => {
  describe(createAdyenPaymentSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createAdyenPaymentSlice.actions.trigger(createAdyenPaymentData)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createAdyenPaymentSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createAdyenPaymentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createAdyenPaymentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and discards the payload when undefined', () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createAdyenPaymentSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })

    it('sets wasSuccess to true and stores the payload', () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createAdyenPaymentSlice.actions.success(
            createAdyenPaymentResponseData
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: createAdyenPaymentResponseData
      })
    })
  })

  describe(createAdyenPaymentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createAdyenPaymentSlice.actions.failure({
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

  describe(createAdyenPaymentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createAdyenPaymentSlice.actions.fulfill()
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
        createAdyenPaymentSlice.reducer(
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

  describe(createAdyenPaymentSlice.actions.resetState.toString(), () => {
    it('reset the state', async () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: createAdyenPaymentResponseData
          },
          createAdyenPaymentSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createAdyenPaymentSlice.actions.setError.toString(), () => {
    it('clears state.details and sets wasError to true', () => {
      expect(
        createAdyenPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: createAdyenPaymentResponseData
          },
          createAdyenPaymentSlice.actions.setError({ message: 'error-message' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: true,
        error: 'error-message'
      })
    })
  })
})
