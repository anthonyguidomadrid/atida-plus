import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

export const selectCashBalance = (state: RootState) =>
  state?.client?.account?.['cash-balance']

export const selectCashBalanceAmount = createSelector(
  selectCashBalance,
  cashBalance => cashBalance?.amount
)

export const selectIsLoading = createSelector(
  selectCashBalance,
  cashBalance => cashBalance?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectCashBalance,
  cashBalance => cashBalance?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectCashBalance,
  cashBalance => cashBalance?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectCashBalance,
  cashBalance => cashBalance?.error
)
