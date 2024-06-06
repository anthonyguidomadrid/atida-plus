import { cashBalanceSlice } from '../cash-balance'

describe(cashBalanceSlice.name, () => {
  describe(cashBalanceSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        cashBalanceSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            amount: 0
          },
          cashBalanceSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        amount: 0
      })
    })
  })

  describe(cashBalanceSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        cashBalanceSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            amount: 0
          },
          cashBalanceSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        amount: 0
      })
    })
  })

  describe(cashBalanceSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        cashBalanceSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            amount: 0
          },
          cashBalanceSlice.actions.success({
            total: 7
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        amount: 7
      })
    })
  })

  describe(cashBalanceSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        cashBalanceSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            amount: 0
          },
          cashBalanceSlice.actions.failure({
            message: 'An error has occurred'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        amount: 0,
        error: 'An error has occurred'
      })
    })
  })

  describe(cashBalanceSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        cashBalanceSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            amount: 7
          },
          cashBalanceSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        amount: 7
      })
    })
  })
})
