import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { CreateCustomerRequest, Customer, SprykerCustomer } from '../types'
import { normalizeCustomer } from '../normalizers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const createCustomerAccount = async (
  locale: string,
  data: CreateCustomerRequest,
  anonymousCustomerUniqueId?: string
): Promise<Customer | undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] },
    addAnonymousCustomerUniqueId: anonymousCustomerUniqueId
  })

  const response = await client.post<SprykerCustomer>('/customers', {
    data: {
      type: 'customers',
      attributes: data
    }
  })

  return normalizeCustomer(response.data)
}
