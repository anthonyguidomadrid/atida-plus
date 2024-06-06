import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getJWTName,
  getRefreshTokenName,
  getCustomerTokenName,
  isTokenExpired,
  getJWTCookieDomain,
  getGuestJWTName,
  getGuestName,
  getGuestRefreshTokenName
} from '~domains/account'
import { login } from '~domains/account/services/login'
import { CustomerDecodedJWT } from '~domains/account/types'
import {
  handleApiError,
  isApiError,
  handleUnknownError,
  handleLoginErrorCode
} from '~helpers/error'
import { clearCookies, setCookies } from '~helpers/server-only/cookie'
import { decodeToken } from '~helpers/server-only/decode-token'
import { getIPAddressString } from '~helpers/server-only/getIPAddressString'
import { TranslationKeys } from '~config/constants/translation-keys'
import { getDefaultLocale } from '~domains/translated-routes'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const JWT_NAME = getJWTName()
  const REFRESH_JWT_NAME = getRefreshTokenName()
  const GUEST_REFRESH_TOKEN_NAME = getGuestRefreshTokenName()
  const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
  const GUEST_TOKEN_NAME = getGuestJWTName()
  const GUEST_NAME = getGuestName()
  const guestToken = req.cookies[GUEST_TOKEN_NAME]
  const locale = req.headers['accept-language'] ?? getDefaultLocale()

  const featureFlags = await loadFeatureFlags(locale, [
    FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
  ])
  const cookieTimeout =
    (featureFlags?.[FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT] as number) ??
    0

  try {
    const anonymousCustomerUniqueId = guestToken
      ? decodeToken(guestToken)?.anonymousId?.replace('anonymous:', '')
      : req.headers['x-anonymous-customer-unique-id']
    const data = req.body
    const ipAddressHeader = req.headers['cloudfront-viewer-address']
    const ipAddress = getIPAddressString(ipAddressHeader)

    const result = await login(
      locale.toString(),
      data,
      anonymousCustomerUniqueId as string,
      ipAddress
    )
    const token = result?.accessToken

    if (token) {
      const secureCookieOptions = {
        maxAge: cookieTimeout > 0 ? cookieTimeout : result?.expiresIn,
        domain: getJWTCookieDomain()
      }

      const { expires, ...decodedToken }: CustomerDecodedJWT = decodeToken(
        token
      )

      if (isTokenExpired(expires)) {
        throw new Error('customer.account.login.token-expired')
      }

      setCookies(
        res,
        [
          { name: JWT_NAME, value: token },
          { name: REFRESH_JWT_NAME, value: result?.refreshToken },
          {
            name: CUSTOMER_TOKEN_NAME,
            value: {
              'given-name': decodedToken.givenName,
              'has-previous-successful-order':
                decodedToken.hasPreviousSuccessfulOrder,
              ref: decodedToken.reference,
              last_used_payment_code: decodedToken.lastUsedPaymentMethod
            },
            options: {
              httpOnly: false,
              sameSite: 'lax' // Lax - if not set, the cookie will be deleted in Safari
            }
          },
          { name: GUEST_TOKEN_NAME, value: '', options: { maxAge: -1 } },
          {
            name: GUEST_REFRESH_TOKEN_NAME,
            value: '',
            options: { maxAge: -1 }
          },
          { name: GUEST_NAME, value: '', options: { maxAge: -1 } }
        ],
        secureCookieOptions
      )
    }

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    clearCookies(res, [JWT_NAME, REFRESH_JWT_NAME, CUSTOMER_TOKEN_NAME], {
      domain: getJWTCookieDomain()
    })

    const authError = {
      isLogin: true
    }

    isApiError(error)
      ? handleApiError(res, error, handleLoginErrorCode(error), authError)
      : handleUnknownError(
          req,
          res,
          error,
          TranslationKeys.Login.Default.content,
          authError
        )
  }
}
