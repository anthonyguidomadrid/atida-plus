import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { SprykerCustomer } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const updateTaxReference = async (
  locale: string,
  data: {
    customerReference: string
    taxReference: string
  },
  user: {
    token?: string
  }
): Promise<void> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: {
      baseURL: serverRuntimeConfig.ecommerceHost[locale],
      headers: user.token
        ? {
            Authorization: `Bearer ${user.token}`
          }
        : undefined
    }
  })

  await client.patch<SprykerCustomer>(`/customers/${data.customerReference}`, {
    data: {
      type: 'customers',
      attributes: {
        taxReference: data.taxReference
      }
    }
  })

  return
}
