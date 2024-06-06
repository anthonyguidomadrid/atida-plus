import { adyenPaymentMethodsSlice } from '../adyen-payment-methods'
import { clearStateErrors } from '~domains/redux/actions'
import { adyenPaymentMethodsResponse } from '~domains/checkout/__mocks__/adyen-payment-methods'

describe(adyenPaymentMethodsSlice.name, () => {
  describe(adyenPaymentMethodsSlice.actions.trigger.toString(), () => {
    it('does the trigger', () => {
      expect(
        adyenPaymentMethodsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentMethodsSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(adyenPaymentMethodsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        adyenPaymentMethodsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentMethodsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(adyenPaymentMethodsSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and updates the state', () => {
      expect(
        adyenPaymentMethodsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentMethodsSlice.actions.success(adyenPaymentMethodsResponse)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: adyenPaymentMethodsResponse
      })
    })

    it('sets wasSuccess to true and does not set state.details', () => {
      expect(
        adyenPaymentMethodsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentMethodsSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(adyenPaymentMethodsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        adyenPaymentMethodsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentMethodsSlice.actions.failure({
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

  describe(adyenPaymentMethodsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        adyenPaymentMethodsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          adyenPaymentMethodsSlice.actions.fulfill()
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
        adyenPaymentMethodsSlice.reducer(
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

  describe(adyenPaymentMethodsSlice.actions.resetState.toString(), () => {
    it('resets the state', () => {
      expect(
        adyenPaymentMethodsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            error: 'An error has occurred'
          },
          adyenPaymentMethodsSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
