import type { NextApiRequest, NextApiResponse } from 'next'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  CustomerDecodedJWT,
  getCustomerTokenName,
  getGuestJWTName,
  getGuestName,
  getGuestRefreshTokenName,
  getJWTCookieDomain,
  getJWTName,
  getRefreshTokenName,
  isTokenExpired
} from '~domains/account'
import { socialLogin } from '~domains/social/services/login'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { clearCookies, setCookies } from '~helpers/server-only/cookie'
import { decodeToken } from '~helpers/server-only/decode-token'
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
    const result = await socialLogin(
      locale,
      data,
      anonymousCustomerUniqueId as string
    )

    const needsVerification = result?.social?.needsVerification
    const token = result?.accessToken

    if (token && !needsVerification) {
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
              last_used_payment_code: decodedToken.lastUsedPaymentMethod,
              is_social: true,
              social_platform: data.serviceType
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
    isApiError(error) && error?.response?.data?.errors
      ? handleApiError(
          res,
          error,
          error?.response?.data?.errors[0]?.code === '006'
            ? 'account.social.sign-up'
            : 'account.social.login'
        )
      : handleUnknownError(
          req,
          res,
          error,
          'account.get-customer.unexpected-error'
        )
  }
}
