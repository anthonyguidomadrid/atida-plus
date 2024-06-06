import { removeUndefinedPropertiesFromObject } from '~helpers'
import { CustomerToken, SprykerCustomerToken } from '../types'

export const normalizeToken = (
  token?: SprykerCustomerToken
): CustomerToken | undefined =>
  token?.data?.attributes
    ? removeUndefinedPropertiesFromObject({
        accessToken: token?.data?.attributes?.accessToken,
        refreshToken: token?.data?.attributes?.refreshToken,
        expiresIn:
          token?.data?.attributes?.expiresIn ??
          token?.data?.attributes?.expires ??
          1,
        messages: token?.data?.attributes?.messages,
        social: removeUndefinedPropertiesFromObject({
          needsVerification: token.data.type === 'social-access-tokens',
          isNew: token?.data?.attributes?.isNew,
          firstName: token?.data?.attributes?.firstName,
          email: token?.data?.attributes?.email
        })
      })
    : undefined
