import type { NextApiRequest, NextApiResponse } from 'next'

import { createNewAddress } from '~domains/account/services/create-new-address'
import {
  getCustomerTokenName,
  getJWTCookieDomain,
  getJWTName,
  getRefreshTokenName,
  isTokenExpired
} from '~domains/account'
import { CustomerDecodedJWT } from '~domains/account/types'
import { setCookies } from '~helpers/server-only/cookie'
import { decodeToken } from '~helpers/server-only/decode-token'
import {
  isApiError,
  handleUnknownError,
  handleUpdateCustomerApiError
} from '~helpers/error'
import { getDefaultLocale } from '~domains/translated-routes'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const JWT_NAME = getJWTName()
    const REFRESH_JWT_NAME = getRefreshTokenName()
    const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
    const refreshToken = req.cookies[getRefreshTokenName()]
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]
    const data = req.body
    const result = await createNewAddress(locale.toString(), data, {
      token,
      refreshToken
    })

    const featureFlags = await loadFeatureFlags(locale, [
      FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
    ])
    const cookieTimeout =
      (featureFlags?.[
        FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
      ] as number) ?? 0

    if (data?.firstName || data?.lastName) {
      const newToken = result?.JWT

      if (newToken) {
        const secureCookieOptions = {
          maxAge: cookieTimeout > 0 ? cookieTimeout : result?.expiresIn,
          domain: getJWTCookieDomain()
        }

        const { expires, ...decodedToken }: CustomerDecodedJWT = decodeToken(
          newToken
        )

        if (isTokenExpired(expires)) {
          throw new Error('customer.account.login.token-expired')
        }

        setCookies(
          res,
          [
            { name: JWT_NAME, value: newToken },
            { name: REFRESH_JWT_NAME, value: result?.refreshToken },
            {
              name: CUSTOMER_TOKEN_NAME,
              value: {
                'given-name': decodedToken.givenName,
                ref: decodedToken.reference
              },
              options: {
                httpOnly: false,
                sameSite: 'strict'
              }
            }
          ],
          secureCookieOptions
        )
      }
    }

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleUpdateCustomerApiError(res, error)
      : handleUnknownError(
          req,
          res,
          error,
          'account.update-customer.unexpected-error'
        )
  }
}
