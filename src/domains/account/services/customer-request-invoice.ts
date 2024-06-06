import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeCustomer } from '../normalizers'
import type { Customer, SprykerCustomer } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const invoiceRequire = async (
  locale: string,
  data: {
    customerReference: string
    invoiceRequired: string
  },
  user: {
    token?: string
  }
): Promise<Customer> => {
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

  const response = await client.patch<SprykerCustomer>(
    `/customers/${data.customerReference}`,
    {
      data: {
        type: 'customers',
        attributes: {
          invoiceRequired: data.invoiceRequired
        }
      }
    }
  )

  const customer = normalizeCustomer(response.data)
  if (!customer) {
    throw new Error('account.get-customer.failed-to-retrieve-customer-details')
  }

  return customer
}
