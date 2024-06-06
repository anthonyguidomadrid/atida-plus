import { SprykerUpdatedJWTAndRefreshTokens } from '~domains/account'
import getConfig from 'next/config'
import { createClient } from '~helpers'
import { UpdatedJWTAndRefreshTokens } from '~domains/account/types'
import { normalizeUpdatedJWTAndRefreshTokens } from '~domains/account/normalizers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const authenticationRefreshToken = async (
  locale: string,
  user: {
    refreshToken?: string
  }
): Promise<UpdatedJWTAndRefreshTokens> => {
  const { serverRuntimeConfig } = getConfig()

  const client = createClient({
    locale,
    options: {
      baseURL:
        serverRuntimeConfig.ecommerceHost[
          locale.split(',')?.[0]?.toLocaleLowerCase?.()
        ]
    }
  })

  const response = await client.post<SprykerUpdatedJWTAndRefreshTokens>(
    '/refresh-tokens',
    {
      data: {
        type: 'refresh-tokens',
        attributes: {
          refreshToken: user.refreshToken
        }
      }
    }
  )

  return normalizeUpdatedJWTAndRefreshTokens(response.data)
}
