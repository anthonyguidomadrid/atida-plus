import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeToken } from '~domains/account/normalizers'
import { CustomerToken, SprykerCustomerToken } from '~domains/account'
import { SocialVerifyPayload } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const socialVerify = async (
  locale: string,
  data: SocialVerifyPayload,
  anonymousCustomerUniqueId?: string
): Promise<CustomerToken | undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] },
    addAnonymousCustomerUniqueId: anonymousCustomerUniqueId
  })

  const response = await client.post<SprykerCustomerToken>(
    `oauth-verification-${data.serviceType.toLowerCase()}`,
    {
      data: {
        type: `oauth-verification-${data.serviceType.toLowerCase()}`,
        attributes: {
          password: data.password,
          redirectUri: data.redirectUri,
          ...(data.serviceType === 'Apple'
            ? {
                refreshToken: data.refreshToken
              }
            : { accessToken: data.accessToken, expiresIn: data.expiresIn })
        }
      }
    }
  )

  return normalizeToken(response.data)
}
