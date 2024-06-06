import getConfig from 'next/config'
import { createClient } from '~helpers'
import {
  CustomerCheckResponse,
  SprykerCustomerCheckResponse,
  CustomerCheckTriggerPayload
} from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const customerCheck = async (
  locale: string,
  data: CustomerCheckTriggerPayload,
  anonymousCustomerUniqueId?: string
): Promise<CustomerCheckResponse> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] },
    addAnonymousCustomerUniqueId: anonymousCustomerUniqueId
  })

  const response = await client.get<SprykerCustomerCheckResponse>(
    `customer-check?email=${encodeURIComponent(data.email)}`
  )

  return { email: data.email, exists: response.data.data[0].attributes.exists }
}
