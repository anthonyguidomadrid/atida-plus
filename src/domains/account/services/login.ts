import getConfig from 'next/config'
import { createClient } from '~helpers'
import type {
  CustomerAuthentication,
  CustomerToken,
  SprykerCustomerToken
} from '../types'
import { normalizeToken } from '../normalizers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const login = async (
  locale: string,
  data: CustomerAuthentication,
  anonymousCustomerUniqueId?: string,
  ipAddress?: string
): Promise<CustomerToken | undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: {
      baseURL: serverRuntimeConfig.ecommerceHost[locale]
    },
    addAnonymousCustomerUniqueId: anonymousCustomerUniqueId
  })

  const response = await client.post<SprykerCustomerToken>('/access-tokens', {
    data: {
      type: 'access-tokens',
      attributes: {
        username: data.email,
        password: data.password,
        ...(ipAddress && { clientIp: ipAddress })
      }
    }
  })

  return normalizeToken(response.data)
}
