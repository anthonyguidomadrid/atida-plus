import {
  checkoutData,
  checkoutDataWithBasketItems
} from '~domains/checkout/__mocks__/checkout-data'
import { clearStateErrors } from '~domains/redux/actions'
import { dataSlice } from '../data'

describe(dataSlice.name, () => {
  describe(dataSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.trigger({ deliveryMethod: '87' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(dataSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.request({})
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })

    it('Loading is false if atidaCash is passed ', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.request({
            payments: [
              {
                paymentSelection: 'atidaPaymentLoyalty',
                paymentMethodName: 'LoyaltySpend',
                paymentProviderName: 'AtidaPayment',
                amount: 10
              },
              {
                paymentSelection: 'atidaPaymentInternal',
                paymentMethodName: 'Internal',
                paymentProviderName: 'AtidaPayment'
              }
            ]
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })

    it('Loading is false if atidaCash is passed with amount 0', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.request({
            payments: [
              {
                paymentSelection: 'atidaPaymentLoyalty',
                paymentMethodName: 'LoyaltySpend',
                paymentProviderName: 'AtidaPayment',
                amount: 0
              },
              {
                paymentSelection: 'atidaPaymentInternal',
                paymentMethodName: 'Internal',
                paymentProviderName: 'AtidaPayment'
              }
            ]
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })

    it('Loading is true if shouldSetLoading is passed', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.request({
            shouldSetLoading: true
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(dataSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and populates checkout details', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.success(checkoutData)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: checkoutData
      })
    })

    it('sets wasSuccess to true, populates checkout details but omits the basket', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.success(checkoutDataWithBasketItems)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: checkoutData
      })
    })
  })

  describe(dataSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          dataSlice.actions.failure({
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

  describe(dataSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          dataSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(dataSlice.actions.clearDetails.toString(), () => {
    it('deletes state details', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            details: {}
          },
          dataSlice.actions.clearDetails()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(dataSlice.actions.clearError.toString(), () => {
    it('changes wasError to false and deletes state error', () => {
      expect(
        dataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'some error'
          },
          dataSlice.actions.clearError()
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
        dataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            error: 'Some error'
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
