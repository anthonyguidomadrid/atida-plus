import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeToken } from '~domains/account/normalizers'
import { CustomerToken, SprykerCustomerToken } from '~domains/account'
import { SocialLoginPayload } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const socialLogin = async (
  locale: string,
  data: SocialLoginPayload,
  anonymousCustomerUniqueId?: string
): Promise<CustomerToken | undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] },
    addAnonymousCustomerUniqueId: anonymousCustomerUniqueId
  })

  const response = await client.post<SprykerCustomerToken>(
    `oauth-${data.serviceType.toLowerCase()}`,
    {
      data: {
        type: `oauth-${data.serviceType.toLowerCase()}`,
        attributes: {
          code: data.code,
          redirectUri: data.redirectUri,
          ...(data.firstName && { firstName: decodeURI(data.firstName) }),
          ...(data.lastName && { lastName: decodeURI(data.lastName) })
        }
      }
    }
  )
  return normalizeToken(response.data)
}
