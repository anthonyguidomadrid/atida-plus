import { getOrderSlice } from '../get-order'
import { clearStateErrors } from '~domains/redux/actions'
import { sprykerOrderData } from '~domains/checkout/__mocks__/checkout-data'
import { SprykerOrderResponseData } from '~domains/checkout/types'

describe(getOrderSlice.name, () => {
  describe(getOrderSlice.actions.trigger.toString(), () => {
    it('does the trigger', () => {
      expect(
        getOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          getOrderSlice.actions.trigger({
            orderId: 'PT--279'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(getOrderSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        getOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          getOrderSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(getOrderSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and does not update the state with undefined payloads', () => {
      expect(
        getOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          getOrderSlice.actions.success(undefined)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
    it('sets wasSuccess to true and updates the state', () => {
      expect(
        getOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          getOrderSlice.actions.success(
            (sprykerOrderData as unknown) as Partial<SprykerOrderResponseData>
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: sprykerOrderData
      })
    })
  })

  describe(getOrderSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        getOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          getOrderSlice.actions.failure({
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

  describe(getOrderSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        getOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          getOrderSlice.actions.fulfill()
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
        getOrderSlice.reducer(
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

  describe(getOrderSlice.actions.resetState.toString(), () => {
    it('resets the state', () => {
      expect(
        getOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            details: sprykerOrderData as Partial<SprykerOrderResponseData>,
            error: 'An error has occurred'
          },
          getOrderSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
