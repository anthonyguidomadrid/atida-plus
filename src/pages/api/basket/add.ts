import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getGuestJWTName,
  getGuestRefreshTokenName,
  getJWTCookieDomain,
  getJWTName
} from '~domains/account'
import { addToBasket } from '~domains/basket/services/add-to-basket'
import { getGuestToken } from '~domains/basket/services/get-guest-token'
import {
  handleElasticsearchError,
  isElasticsearchResponseError
} from '~domains/elasticsearch'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { setCookies } from '~helpers/server-only/cookie'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  loadFeatureFlag,
  loadFeatureFlags
} from '~helpers/server-only/featureFlagClient'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { SessionChannelType } from '~domains/basket/types'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  const featureFlags = await loadFeatureFlags(locale, [
    FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
  ])
  try {
    const GUEST_TOKEN_NAME = getGuestJWTName()
    const GUEST_REFRESH_TOKEN_NAME = getGuestRefreshTokenName()
    let token = req.cookies[getJWTName()] ?? req.cookies[GUEST_TOKEN_NAME]
    const anonymousCustomerUniqueId = req.headers[
      'x-anonymous-customer-unique-id'
    ] as string
    const availableChannels = (await loadFeatureFlag(
      locale,
      FeatureFlag.MULTICHANNEL_PRICES
    )) as Record<string, boolean>
    const { channel, sku } = JSON.parse(
      req.cookies[getSessionChannelName()] ?? '{}'
    ) as SessionChannelType
    const sendChannel =
      sku === req?.body?.sku && availableChannels[channel ?? '']
    const data = {
      ...req.body,
      ...(sendChannel && { price_channel: channel })
    }

    if (!token) {
      const response = await getGuestToken(locale.toString())
      if (response) {
        const cookieTimeout =
          (featureFlags?.[
            FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
          ] as number) ?? 0
        const secureCookieOptions = {
          // Refresh token expiration
          maxAge: cookieTimeout > 0 ? cookieTimeout : response?.expiresIn,
          domain: getJWTCookieDomain()
        }
        setCookies(
          res,
          [
            {
              name: GUEST_TOKEN_NAME,
              value: response.accessToken
            },
            { name: GUEST_REFRESH_TOKEN_NAME, value: response?.refreshToken }
          ],
          secureCookieOptions
        )
        token = response.accessToken
      }
    }

    delete data.hasPreviousItems

    const result = await addToBasket(locale.toString(), data, {
      anonymousCustomerUniqueId,
      token
    })
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(res, error, 'basket.add-to-basket.unexpected-error')
    } else if (isElasticsearchResponseError(error)) {
      handleElasticsearchError(
        res,
        error,
        'basket.add-to-basket.unexpected-error'
      )
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'basket.add-to-basket.unexpected-error'
      )
    }
  }
}
