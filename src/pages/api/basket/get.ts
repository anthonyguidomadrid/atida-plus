import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getGuestJWTName,
  getJWTCookieDomain,
  getJWTName
} from '~domains/account'
import { fetchBasket } from '~domains/basket/services/fetch-basket'
import {
  handleElasticsearchError,
  isElasticsearchResponseError
} from '~domains/elasticsearch'
import { logger } from '~helpers'
import {
  handleApiError,
  handleBasketErrorCode,
  isApiError,
  handleUnknownError
} from '~helpers/error'
import { decodeToken } from '~helpers/server-only/decode-token'
import { checkDisabledProducts } from '~helpers/server-only/checkDisabledProducts'
import { getEnabledLocales } from '~domains/translated-routes'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { getCookie, setCookies } from '~helpers/server-only/cookie'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.query.locale
  const guestToken = req.cookies[getGuestJWTName()]
  const token = req.cookies[getJWTName()] ?? guestToken
  const anonymousCustomerUniqueId = req.headers[
    'x-anonymous-customer-unique-id'
  ] as string

  if (!getEnabledLocales().includes(String(locale))) {
    res.statusCode = 400
    logger.error({
      request: req.url,
      locale: locale,
      name: 'Invalid locale',
      message: 'Invalid locale passed to basket/get endpoint'
    })
    res.json({
      type: 'Error',
      name: 'Invalid locale',
      message: 'error.invalid-locale'
    })
  }

  try {
    let result = await fetchBasket(String(locale), {
      anonymousCustomerUniqueId,
      token
    })

    result = await checkDisabledProducts(
      result,
      String(locale),
      anonymousCustomerUniqueId,
      String(token)
    )

    const availableChannels = (await loadFeatureFlag(
      locale as string,
      FeatureFlag.MULTICHANNEL_PRICES
    )) as Record<string, boolean>
    const { channel, sku } = result.priceChannel ?? {}
    if (
      channel &&
      sku &&
      availableChannels[channel] &&
      (!getCookie(req, getSessionChannelName()) ||
        getCookie(req, getSessionChannelName()) === '')
    ) {
      setCookies(
        res,
        [
          {
            name: getSessionChannelName(),
            value: { sku, channel }
          }
        ],
        {
          maxAge: COOKIES_EXPIRATION_TIME.oneYear,
          domain: getJWTCookieDomain(),
          httpOnly: false
        }
      )
    }

    res.statusCode = 200
    res.json({
      ...result,
      anonymousId: guestToken ? decodeToken(guestToken)?.anonymousId : ''
    })
  } catch (error) {
    let errorMessages: string[]
    if (isApiError(error)) {
      switch (error?.response?.status) {
        case 422:
          errorMessages = handleBasketErrorCode(error, 'basket.get-basket')
          break
        default:
          errorMessages = ['basket.get-basket.unexpected-error']
          break
      }

      const errorMessage =
        errorMessages.find(
          message => message === 'basket.get-basket.unavailable-product'
        ) ?? errorMessages[0]

      handleApiError(res, error, errorMessage, {
        allErrors: errorMessages
      })
    } else if (isElasticsearchResponseError(error)) {
      handleElasticsearchError(res, error, 'basket.get-basket.unexpected-error')
    } else {
      handleUnknownError(req, res, error)
    }
  }
}
