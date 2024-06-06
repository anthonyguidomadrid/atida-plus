import { orderDetailsSlice } from '../order-details'
import { orderDetailsResult } from '../../__mocks__/order-details'

describe(orderDetailsSlice.name, () => {
  describe(orderDetailsSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', async () => {
      expect(
        orderDetailsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          orderDetailsSlice.actions.trigger({})
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(orderDetailsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', async () => {
      expect(
        orderDetailsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          orderDetailsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(orderDetailsSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        orderDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          orderDetailsSlice.actions.success(orderDetailsResult)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        orderDetails: orderDetailsResult
      })
    })
  })

  describe(orderDetailsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        orderDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          orderDetailsSlice.actions.failure({
            message: 'An error has occurred'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error has occurred'
      })
    })
  })

  describe(orderDetailsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        orderDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          orderDetailsSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(orderDetailsSlice.actions.resetState.toString(), () => {
    it('resets the state', () => {
      expect(
        orderDetailsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: true,
            orderDetails: orderDetailsResult,
            error: 'An error has occurred'
          },
          orderDetailsSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
