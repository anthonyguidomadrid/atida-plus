import {
  createSIBSMultibancoPaymentData,
  createSIBSMultibancoPaymentResponseData
} from '~domains/checkout/__mocks__/create-sibs-multibanco-payment'
import { clearStateErrors } from '~domains/redux/actions'
import { createSIBSMultibancoPaymentSlice } from '../create-sibs-multibanco-payment'

describe(createSIBSMultibancoPaymentSlice.name, () => {
  describe(createSIBSMultibancoPaymentSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createSIBSMultibancoPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createSIBSMultibancoPaymentSlice.actions.trigger(
            createSIBSMultibancoPaymentData
          )
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createSIBSMultibancoPaymentSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createSIBSMultibancoPaymentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createSIBSMultibancoPaymentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createSIBSMultibancoPaymentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and discards the payload when undefined', () => {
      expect(
        createSIBSMultibancoPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createSIBSMultibancoPaymentSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })

    it('sets wasSuccess to true and stores the payload', () => {
      expect(
        createSIBSMultibancoPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createSIBSMultibancoPaymentSlice.actions.success(
            createSIBSMultibancoPaymentResponseData
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: createSIBSMultibancoPaymentResponseData
      })
    })
  })

  describe(createSIBSMultibancoPaymentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createSIBSMultibancoPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createSIBSMultibancoPaymentSlice.actions.failure({
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

  describe(createSIBSMultibancoPaymentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createSIBSMultibancoPaymentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createSIBSMultibancoPaymentSlice.actions.fulfill()
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
        createSIBSMultibancoPaymentSlice.reducer(
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

  describe(
    createSIBSMultibancoPaymentSlice.actions.clearDetails.toString(),
    () => {
      it('clears the details in the state', async () => {
        expect(
          createSIBSMultibancoPaymentSlice.reducer(
            {
              isLoading: false,
              wasSuccess: false,
              wasError: false,
              details: createSIBSMultibancoPaymentResponseData
            },
            createSIBSMultibancoPaymentSlice.actions.clearDetails()
          )
        ).toEqual({
          isLoading: false,
          wasSuccess: false,
          wasError: false
        })
      })
    }
  )
})
