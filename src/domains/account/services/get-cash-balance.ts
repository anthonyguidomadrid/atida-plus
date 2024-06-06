import getConfig from 'next/config'
import { createClient } from '~helpers'
import { CashBalanceResponse } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const getCashBalance = async (
  locale: string,
  accessToken: string
): Promise<CashBalanceResponse> => {
  const { serverRuntimeConfig } = getConfig()

  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ledgerBaseUrl }
  })

  const response = await client.get<CashBalanceResponse>(`/balance`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const balance = response.data

  if (!balance) {
    throw new Error('account.get-cash-balance.failed-to-retrieve-cash-balance')
  }

  return {
    ...balance
  }
}
