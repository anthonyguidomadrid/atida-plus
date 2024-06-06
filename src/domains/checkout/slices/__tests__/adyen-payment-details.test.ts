import { adyenPaymentDetailsSlice } from '../adyen-payment-details'
import { clearStateErrors } from '~domains/redux/actions'
import {
  adyenPaymentDetailsPayload,
  adyenPaymentDetailsResponseData
} from '~domains/checkout/__mocks__/adyen-payment-details'

describe(adyenPaymentDetailsSlice.name, () => {
  describe(adyenPaymentDetailsSlice.actions.trigger.toString(), () => {
    it('does the trigger', () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentDetailsSlice.actions.trigger(adyenPaymentDetailsPayload)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(adyenPaymentDetailsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentDetailsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(adyenPaymentDetailsSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and updates the state', () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentDetailsSlice.actions.success(
            adyenPaymentDetailsResponseData
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: adyenPaymentDetailsResponseData
      })
    })

    it('sets wasSuccess to true and does not set state.details', () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentDetailsSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(adyenPaymentDetailsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          adyenPaymentDetailsSlice.actions.failure({
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

  describe(adyenPaymentDetailsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          adyenPaymentDetailsSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(adyenPaymentDetailsSlice.actions.resetState.toString(), () => {
    it('reset the state', () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: true,
            details: adyenPaymentDetailsResponseData,
            error: 'Some error'
          },
          adyenPaymentDetailsSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears the errors in the state', async () => {
      expect(
        adyenPaymentDetailsSlice.reducer(
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
