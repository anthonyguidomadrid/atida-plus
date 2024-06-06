import {
  createBizumPaymentData,
  createBizumPaymentResponseData
} from '~domains/checkout/__mocks__/create-bizum-payment'
import { clearStateErrors } from '~domains/redux/actions'
import { createBizumPaymentSlice } from '../create-bizum-payment'

describe(createBizumPaymentSlice.name, () => {
  describe(createBizumPaymentSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createBizumPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createBizumPaymentSlice.actions.trigger(createBizumPaymentData)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createBizumPaymentSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createBizumPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createBizumPaymentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createBizumPaymentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and discards the payload when undefined', () => {
      expect(
        createBizumPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createBizumPaymentSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })

    it('sets wasSuccess to true and stores the payload', () => {
      expect(
        createBizumPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createBizumPaymentSlice.actions.success(
            createBizumPaymentResponseData
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: createBizumPaymentResponseData
      })
    })
  })

  describe(createBizumPaymentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createBizumPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createBizumPaymentSlice.actions.failure({
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

  describe(createBizumPaymentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createBizumPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createBizumPaymentSlice.actions.fulfill()
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
        createBizumPaymentSlice.reducer(
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

  describe(createBizumPaymentSlice.actions.clearDetails.toString(), () => {
    it('clears the details in the state', async () => {
      expect(
        createBizumPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            details: createBizumPaymentResponseData
          },
          createBizumPaymentSlice.actions.clearDetails()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
