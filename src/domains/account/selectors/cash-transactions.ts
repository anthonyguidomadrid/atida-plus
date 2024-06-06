import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

export const selectCashTransactions = (state: RootState) =>
  state?.client?.account?.['cash-transactions']

export const selectCashTransactionsByDate = createSelector(
  selectCashTransactions,
  cashTransactions => cashTransactions?.transactions
)

export const selectCashTransactionsTotalPages = createSelector(
  selectCashTransactions,
  cashTransactions => cashTransactions?.totalPages
)

export const selectIsLoading = createSelector(
  selectCashTransactions,
  cashTransactions => cashTransactions?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectCashTransactions,
  cashTransactions => cashTransactions?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectCashTransactions,
  cashTransactions => cashTransactions?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectCashTransactions,
  cashTransactions => cashTransactions?.error
)
