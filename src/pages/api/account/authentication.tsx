import type { NextApiRequest, NextApiResponse } from 'next'

import { defaultLocale } from '~domains/translated-routes'
import {
  CustomerDecodedJWT,
  getCustomerTokenName,
  getGuestFavouritesName,
  getGuestJWTName,
  getGuestName,
  getGuestRefreshTokenName,
  getJWTCookieDomain,
  getJWTName,
  getRefreshTokenName,
  isTokenExpired,
  UpdatedJWTAndRefreshTokens
} from '~domains/account'
import {
  isApiError,
  handleUnknownError,
  handleUpdateCustomerApiError,
  ApiError
} from '~helpers/error'
import { authenticationRefreshToken } from '~domains/account/services/authentication-refresh-token'
import { decodeToken } from '~helpers/server-only/decode-token'
import { clearCookies, Cookie, setCookies } from '~helpers/server-only/cookie'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const JWT_NAME = getJWTName()
  const REFRESH_JWT_NAME = getRefreshTokenName()
  const CUSTOMER_NAME = getCustomerTokenName()
  const GUEST_JWT_NAME = getGuestJWTName()
  const GUEST_REFRESH_JWT_NAME = getGuestRefreshTokenName()
  const GUEST_NAME = getGuestName()
  const GUEST_FAVOURITES_NAME = getGuestFavouritesName()
  const cookieOption = {
    domain: getJWTCookieDomain()
  }
  const locale = req.headers['accept-language'] ?? defaultLocale

  const featureFlags = await loadFeatureFlags(locale, [
    FeatureFlag.ACCOUNT_ACCESS_TOKEN_REFRESH,
    FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
  ])

  try {
    const refreshToken = req.cookies[REFRESH_JWT_NAME]
    const guestRefreshToken = req.cookies[GUEST_REFRESH_JWT_NAME]
    const guestName = req.cookies[GUEST_NAME]
    let result: UpdatedJWTAndRefreshTokens = {}

    const isAccessTokenRefreshEnabled =
      featureFlags && featureFlags[FeatureFlag.ACCOUNT_ACCESS_TOKEN_REFRESH]
    const cookieTimeout =
      (featureFlags?.[
        FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
      ] as number) ?? 0

    if (!refreshToken && !guestRefreshToken) {
      const error = new Error('account.update-tokens.unauthorized-request')
      throw handleAuthenticationApiError(
        error,
        !!req.cookies[GUEST_JWT_NAME],
        '404'
      )
    }

    // Make sure this happens only when logged in and tokens are present
    if (isAccessTokenRefreshEnabled && (refreshToken || guestRefreshToken)) {
      // Access token is expired - refresh the token

      result = await authenticationRefreshToken(locale.toString(), {
        refreshToken: refreshToken ?? guestRefreshToken
      })

      const newToken = result?.JWT
      const newRefreshToken = result?.refreshToken
      const expiresIn = result?.expiresIn

      if (newToken) {
        const secureCookieOptions = {
          // Refresh token expiration
          maxAge: cookieTimeout > 0 ? cookieTimeout : expiresIn,
          domain: getJWTCookieDomain()
        }

        const {
          expires,
          anonymousId,
          givenName,
          reference
        }: CustomerDecodedJWT = decodeToken(newToken)

        if (isTokenExpired(expires)) {
          const error = new Error(
            'account.update-customer.access-token-expired'
          )
          throw handleAuthenticationApiError(
            error,
            !!req.cookies[GUEST_JWT_NAME],
            '440'
          )
        }

        const updatedCookies: Cookie[] = refreshToken
          ? [
              {
                name: JWT_NAME,
                value: newToken
              },
              {
                name: REFRESH_JWT_NAME,
                value: newRefreshToken
              },
              {
                name: CUSTOMER_NAME,
                value: {
                  'given-name': givenName,
                  ref: reference
                },
                options: {
                  httpOnly: false,
                  sameSite: 'strict'
                }
              },
              {
                name: GUEST_JWT_NAME,
                value: '',
                options: { maxAge: -1 }
              },
              {
                name: GUEST_REFRESH_JWT_NAME,
                value: '',
                options: { maxAge: -1 }
              },
              { name: GUEST_NAME, value: '', options: { maxAge: -1 } }
            ]
          : [
              {
                name: GUEST_JWT_NAME,
                value: newToken
              },
              {
                name: GUEST_REFRESH_JWT_NAME,
                value: newRefreshToken
              },
              ...(guestName
                ? [
                    {
                      name: GUEST_NAME,
                      value: {
                        guestId: anonymousId
                      },
                      options: {
                        httpOnly: false,
                        expires: new Date(
                          Date.now() + COOKIES_EXPIRATION_TIME.oneHour
                        )
                      }
                    }
                  ]
                : []),
              {
                name: JWT_NAME,
                value: '',
                options: { maxAge: -1 }
              },
              {
                name: REFRESH_JWT_NAME,
                value: '',
                options: { maxAge: -1 }
              },
              { name: CUSTOMER_NAME, value: '', options: { maxAge: -1 } }
            ]

        setCookies(res, updatedCookies, secureCookieOptions)
      }
    }

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    const authError = handleAuthenticationApiError(
      error as ApiError,
      !!req.cookies[GUEST_JWT_NAME],
      (error as ApiError)?.response?.data?.errors?.[0]?.code ?? '406'
    ) as ApiError

    clearCookies(
      res,
      [
        JWT_NAME,
        GUEST_JWT_NAME,
        REFRESH_JWT_NAME,
        CUSTOMER_NAME,
        GUEST_FAVOURITES_NAME,
        GUEST_REFRESH_JWT_NAME,
        GUEST_NAME
      ],
      cookieOption
    )

    isApiError(error)
      ? handleUpdateCustomerApiError(res, authError)
      : handleUnknownError(
          req,
          res,
          error,
          'account.authentication.unexpected-error'
        )
  }
}

const handleAuthenticationApiError = (
  error: Error | ApiError,
  isGuest: boolean,
  code: string
): Error | ApiError => {
  Object.assign(error, {
    response: {
      statusCode: parseInt(code),
      data: {
        errors: [{ code, isGuest }]
      }
    }
  })
  return error
}
