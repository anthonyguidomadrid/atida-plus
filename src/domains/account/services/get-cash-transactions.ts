import getConfig from 'next/config'
import { FeatureFlag } from '~config/constants/feature-flags'
import { createClient } from '~helpers'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { normalizeTransactions } from '../normalizers/transactions'
import {
  AtidaCashTransactionHistoryLedgerResponse,
  AtidaCashTransactionRequestPayload,
  AtidaCashTransactionsHistory
} from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const getCashTransactions = async ({
  locale,
  params,
  accessToken
}: AtidaCashTransactionRequestPayload): Promise<AtidaCashTransactionsHistory> => {
  const useMockedData = (await loadFeatureFlag(
    locale,
    FeatureFlag.ACCOUNT_TRANSACTION_HISTORY_MOCKED_DATA
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  )) as any
  if (Object.keys(useMockedData).length > 0) {
    let totalPages = 0
    if (useMockedData.metadata.total && params?.limit) {
      totalPages = Math.ceil(useMockedData.metadata.total / +params.limit)
    }
    return {
      transactions: normalizeTransactions(useMockedData) ?? [],
      totalPages
    }
  }
  try {
    const { serverRuntimeConfig } = getConfig()

    const client = createClient({
      locale,
      options: { baseURL: serverRuntimeConfig.ledgerBaseUrl }
    })

    const response = await client.get<AtidaCashTransactionHistoryLedgerResponse>(
      `/ledger-data?limit=${params?.limit}&offset=${params?.offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    const transactions = response.data
    let totalPages = 0
    if (response.data.metadata.total && params?.limit) {
      totalPages = Math.ceil(response.data.metadata.total / +params.limit)
    }
    return {
      transactions: normalizeTransactions(transactions) ?? [],
      totalPages
    }
  } catch (error) {
    return {
      transactions: [],
      totalPages: 0
    }
  }
}
