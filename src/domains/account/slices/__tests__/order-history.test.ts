import { orderHistorySlice } from '../order-history'

describe(orderHistorySlice.name, () => {
  describe(orderHistorySlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', async () => {
      expect(
        orderHistorySlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          orderHistorySlice.actions.trigger({})
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(orderHistorySlice.actions.request.toString(), () => {
    it('sets isLoading to true', async () => {
      expect(
        orderHistorySlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          orderHistorySlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(orderHistorySlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        orderHistorySlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          orderHistorySlice.actions.success({
            data: [],
            totalPages: 50
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        orderHistory: [],
        totalPages: 50
      })
    })
  })

  describe(orderHistorySlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        orderHistorySlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          orderHistorySlice.actions.failure({
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

  describe(orderHistorySlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        orderHistorySlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          orderHistorySlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(orderHistorySlice.actions.clearDetails.toString(), () => {
    it('clears the details', () => {
      expect(
        orderHistorySlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            orderHistory: [],
            totalPages: 3
          },
          orderHistorySlice.actions.clearDetails()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
