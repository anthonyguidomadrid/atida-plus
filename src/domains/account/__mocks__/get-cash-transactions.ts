import { AtidaCashTransactionHistoryLedgerResponse } from '../types'

export const mockedTransactionHistory = {
  data: [
    {
      transaction_type: 'debit',
      amount: 200,
      transaction_date: '2022-10-04T14:20:22.029764445Z'
    },
    {
      transaction_type: 'credit',
      amount: 280,
      expiry_date: '2023-10-04T14:20:22.029764445Z',
      transaction_date: '2022-10-04T14:20:22.029764445Z'
    },
    {
      transaction_type: 'credit',
      amount: 280,
      expiry_date: '2023-07-23T14:20:22.029764445Z',
      transaction_date: '2022-07-23T14:20:22.029764445Z'
    },
    {
      transaction_type: 'debit',
      amount: 200,
      transaction_date: '2022-06-23T14:20:22.029764445Z'
    },
    {
      transaction_type: 'credit',
      amount: 280,
      expiry_date: '2023-06-23T14:20:22.029764445Z',
      transaction_date: '2022-06-23T14:20:22.029764445Z'
    },
    {
      transaction_type: 'credit',
      amount: 500,
      expiry_date: '2023-05-23T14:20:22.029764445Z',
      transaction_date: '2022-05-23T14:20:22.029764445Z'
    },
    {
      transaction_type: 'debit',
      amount: 280,
      expiry_date: '2023-04-23T14:20:22.029764445Z',
      transaction_date: '2022-04-23T14:20:22.029764445Z'
    },
    {
      transaction_type: 'credit',
      amount: 200,
      expiry_date: '2023-04-23T14:20:22.029764445Z',
      transaction_date: '2022-04-23T14:20:22.029764445Z'
    }
  ],
  metadata: {
    count: 8,
    total: 27
  }
} as AtidaCashTransactionHistoryLedgerResponse

export const mockedTransactionHistoryBayDateArray = {
  transactions: [
    {
      date: '2022-09-30',
      transactions: [
        {
          transaction_date: '2022-09-30T13:36:27.297Z',
          transaction_type: 'debit',
          amount: 200
        },
        {
          amount: 280,
          expiry_date: '2023-09-30T13:36:27.297Z',
          transaction_date: '2022-09-30T13:36:27.297Z',
          transaction_type: 'credit'
        },
        {
          transaction_type: 'debit',
          amount: 200,
          transaction_date: '2022-09-30T13:36:27.297Z'
        },
        {
          transaction_date: '2022-09-30T13:36:27.297Z',
          transaction_type: 'credit',
          amount: 180,
          expiry_date: '2023-09-30T13:36:27.297Z'
        },
        {
          amount: 100,
          transaction_date: '2022-09-30T13:36:27.297Z',
          transaction_type: 'debit'
        },
        {
          transaction_date: '2022-09-30T13:36:27.297Z',
          transaction_type: 'credit',
          amount: 670,
          expiry_date: '2023-09-30T13:36:27.297Z'
        }
      ]
    },
    {
      date: '2022-07-23',
      transactions: [
        {
          transaction_date: '2022-07-23T14:20:22.029764445Z',
          transaction_type: 'debit',
          amount: 200
        },
        {
          expiry_date: '2023-07-23T14:20:22.029764445Z',
          transaction_date: '2022-07-23T14:20:22.029764445Z',
          transaction_type: 'credit',
          amount: 280
        },
        {
          transaction_date: '2022-07-23T14:20:22.029764445Z',
          transaction_type: 'debit',
          amount: 200
        },
        {
          amount: 290,
          expiry_date: '2023-07-23T14:20:22.029764445Z',
          transaction_date: '2022-07-23T14:20:22.029764445Z',
          transaction_type: 'credit'
        }
      ]
    },
    {
      date: '2022-06-23',
      transactions: [
        {
          transaction_type: 'debit',
          amount: 200,
          transaction_date: '2022-06-23T14:20:22.029764445Z'
        },
        {
          expiry_date: '2023-06-23T14:20:22.029764445Z',
          transaction_date: '2022-06-23T14:20:22.029764445Z',
          transaction_type: 'credit',
          amount: 280
        }
      ]
    },
    {
      date: '2022-05-23',
      transactions: [
        {
          transaction_type: 'credit',
          amount: 500,
          expiry_date: '2023-05-23T14:20:22.029764445Z',
          transaction_date: '2022-05-23T14:20:22.029764445Z'
        }
      ]
    },
    {
      date: '2022-04-23',
      transactions: [
        {
          transaction_date: '2022-04-23T14:20:22.029764445Z',
          transaction_type: 'debit',
          amount: 280,
          expiry_date: '2023-04-23T14:20:22.029764445Z'
        },
        {
          transaction_type: 'credit',
          amount: 200,
          expiry_date: '2023-04-23T14:20:22.029764445Z',
          transaction_date: '2022-04-23T14:20:22.029764445Z'
        }
      ]
    }
  ],
  totalPages: 4
}
