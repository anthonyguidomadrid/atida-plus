import { mockedTransactionHistoryBayDateArray } from '~domains/account/__mocks__/get-cash-transactions'
import { cashTransactionsSlice } from '../cash-transactions'

describe(cashTransactionsSlice.name, () => {
  describe(cashTransactionsSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        cashTransactionsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            transactions: []
          },
          cashTransactionsSlice.actions.trigger({ limit: '8', offset: '0' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        transactions: []
      })
    })
  })

  describe(cashTransactionsSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        cashTransactionsSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            transactions: []
          },
          cashTransactionsSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        transactions: []
      })
    })
  })

  describe(cashTransactionsSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        cashTransactionsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            transactions: []
          },
          cashTransactionsSlice.actions.success(
            mockedTransactionHistoryBayDateArray
          )
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        transactions: mockedTransactionHistoryBayDateArray.transactions,
        totalPages: mockedTransactionHistoryBayDateArray.totalPages
      })
    })
  })

  describe(cashTransactionsSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        cashTransactionsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            transactions: []
          },
          cashTransactionsSlice.actions.failure({
            message: 'An error has occurred'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        transactions: [],
        error: 'An error has occurred'
      })
    })
  })

  describe(cashTransactionsSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        cashTransactionsSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            transactions: []
          },
          cashTransactionsSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        transactions: []
      })
    })
  })
})
