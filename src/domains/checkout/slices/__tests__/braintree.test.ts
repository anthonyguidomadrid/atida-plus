import { braintreeData } from '~domains/checkout/__mocks__/braintree-data'
import { customerData } from '~domains/checkout/__mocks__/checkout'
import { clearStateErrors } from '~domains/redux'
import { braintreeSlice } from '../create-braintree-token'

describe(braintreeSlice.name, () => {
  describe(braintreeSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          braintreeSlice.actions.trigger({ customer: customerData })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(braintreeSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          braintreeSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(braintreeSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and does not update the state with undefined payloads', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          braintreeSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
    it('sets wasSuccess to true and updates the state', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          braintreeSlice.actions.success(braintreeData)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        token: braintreeData
      })
    })
  })

  describe(braintreeSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          braintreeSlice.actions.failure({
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

  describe(braintreeSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          braintreeSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(braintreeSlice.actions.error.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          braintreeSlice.actions.error({
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

  describe(clearStateErrors.toString(), () => {
    it('clears the errors in the state', async () => {
      expect(
        braintreeSlice.reducer(
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

  describe(braintreeSlice.actions.clearDetails.toString(), () => {
    it('clear the error in the state', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'some-error'
          },
          braintreeSlice.actions.clearDetails()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(braintreeSlice.actions.clearToken.toString(), () => {
    it('clear the token in the state', () => {
      expect(
        braintreeSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            token: {
              clientToken: 'some-token'
            }
          },
          braintreeSlice.actions.clearToken()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: true
      })
    })
  })
})
