import {
  createAdyenPaymentData,
  createAdyenPaymentResponseData,
  atidaPaymentLoyaltyData
} from '~domains/checkout/__mocks__/create-adyen-payment'
import { clearStateErrors } from '~domains/redux/actions'
import { createMultiplePaymentsSlice } from '../create-multiple-payments'
import { PAYMENT_OPTIONS } from '~config/constants/payments'

describe(createMultiplePaymentsSlice.name, () => {
  describe(createMultiplePaymentsSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createMultiplePaymentsSlice.actions.trigger({
            [PAYMENT_OPTIONS.ADYEN]: {
              ...createAdyenPaymentData,
              origin_payment_ref: 'ref'
            },
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createMultiplePaymentsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createMultiplePaymentsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createMultiplePaymentsSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and discards the payload when undefined', () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createMultiplePaymentsSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })

    it('sets wasSuccess to true and stores the payload', () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createMultiplePaymentsSlice.actions.success({
            [PAYMENT_OPTIONS.ADYEN]: createAdyenPaymentResponseData,
            [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: {
          [PAYMENT_OPTIONS.ADYEN]: createAdyenPaymentResponseData,
          [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
        }
      })
    })
  })

  describe(createMultiplePaymentsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createMultiplePaymentsSlice.actions.failure({
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

  describe(createMultiplePaymentsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createMultiplePaymentsSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createMultiplePaymentsSlice.actions.resetState.toString(), () => {
    it('reset the state', async () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: {
              [PAYMENT_OPTIONS.ADYEN]: createAdyenPaymentResponseData,
              [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
            }
          },
          createMultiplePaymentsSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createMultiplePaymentsSlice.actions.setError.toString(), () => {
    it('clears state.details and sets wasError to true', () => {
      expect(
        createMultiplePaymentsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: {
              [PAYMENT_OPTIONS.ADYEN]: createAdyenPaymentResponseData,
              [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]: atidaPaymentLoyaltyData
            }
          },
          createMultiplePaymentsSlice.actions.setError()
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
        createMultiplePaymentsSlice.reducer(
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
