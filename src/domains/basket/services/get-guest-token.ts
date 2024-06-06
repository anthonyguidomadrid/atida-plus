import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeToken } from '~domains/account/normalizers/token'
import { CustomerToken, SprykerCustomerToken } from '~domains/account'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const getGuestToken = async (
  locale: string
): Promise<CustomerToken | undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] }
  })

  const response = await paymentClient.post<SprykerCustomerToken>(
    '/guest-tokens',
    {
      data: {
        type: 'guest-tokens',
        attributes: {}
      }
    }
  )

  return normalizeToken(response.data)
}
