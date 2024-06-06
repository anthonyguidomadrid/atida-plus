import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeCustomer } from '../normalizers'
import {
  CustomerAddress,
  CustomerWithAddresses,
  SprykerCustomer
} from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const getCustomer = async (
  locale: string,
  customerReference: string,
  accessToken: string
): Promise<CustomerWithAddresses> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] }
  })
  const response = await client.get<SprykerCustomer>(
    `/customers/${customerReference}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  const customer = normalizeCustomer(response.data)

  // TODO: needs test to ensure when attributes not present that this error is thrown
  if (!customer) {
    throw new Error('account.get-customer.failed-to-retrieve-customer-details')
  }

  return {
    ...customer,
    addresses:
      response.data?.data?.relationships?.addresses?.data
        ?.map(({ id }) => {
          const addressData = response?.data?.included?.find(
            address => id === address.id
          )
          return { ...addressData?.attributes, id: addressData?.id }
        })
        ?.filter((address): address is CustomerAddress => !!address) ?? []
  }
}
