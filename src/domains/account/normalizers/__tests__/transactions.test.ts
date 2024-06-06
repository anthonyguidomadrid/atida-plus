import { AtidaCashTransactionHistoryLedgerResponse } from '~domains/account/types'
import { mockedTransactionHistory } from '~domains/account/__mocks__/get-cash-transactions'
import {
  groupTransactionsHistoryByDate,
  normalizeTransactions
} from '../transactions'

describe(groupTransactionsHistoryByDate, () => {
  it('groups the transactions by date', () => {
    const groupedTransactions = groupTransactionsHistoryByDate(
      mockedTransactionHistory
    )

    expect(groupedTransactions).toMatchSnapshot()
  })

  it('does not error if passed empty object', () => {
    const groupedTransactions = groupTransactionsHistoryByDate(
      {} as AtidaCashTransactionHistoryLedgerResponse
    )
    expect(groupedTransactions).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = groupTransactionsHistoryByDate()
    expect(normalizedData).toEqual({})
  })
})

describe(normalizeTransactions, () => {
  it('transforms the grouped data into an array', () => {
    const normalizedData = normalizeTransactions(mockedTransactionHistory)

    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeTransactions(
      {} as AtidaCashTransactionHistoryLedgerResponse
    )
    expect(normalizedData).toEqual([])
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeTransactions()
    expect(normalizedData).toEqual([])
  })
})
