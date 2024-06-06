import {
  AtidaCashTransaction,
  AtidaCashTransactionHistoryLedgerResponse,
  AtidaCashTransactionsHistoryByDate
} from '../types'

export const groupTransactionsHistoryByDate = (
  atidaCashTransactionHistory?: AtidaCashTransactionHistoryLedgerResponse
) => {
  if (
    !atidaCashTransactionHistory ||
    Object.keys(atidaCashTransactionHistory).length === 0
  )
    return {}
  return atidaCashTransactionHistory.data.reduce(
    (
      groups: {
        [x: string]: AtidaCashTransaction[]
      },
      transaction: AtidaCashTransaction
    ) => {
      const date = transaction.transaction_date.split('T')[0]
      if (!groups[date]) groups[date] = []
      groups[date].push(transaction)
      return groups
    },
    {}
  )
}

export const normalizeTransactions = (
  transactions?: AtidaCashTransactionHistoryLedgerResponse
): AtidaCashTransactionsHistoryByDate => {
  if (!transactions || Object.keys(transactions).length === 0) return []
  const groupedMockedTransactionHistory = groupTransactionsHistoryByDate(
    transactions
  )

  return Object.keys(groupedMockedTransactionHistory).map(date => {
    return { date, transactions: groupedMockedTransactionHistory[date] }
  })
}
