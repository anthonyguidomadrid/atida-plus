import type { NextApiRequest, NextApiResponse } from 'next'
import {
  handleElasticsearchError,
  isElasticsearchResponseError
} from '~domains/elasticsearch'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import getConfig from 'next/config'
import {
  getCountrySelectorHeaderDataName,
  getGuestJWTName,
  getGuestName,
  getGuestRefreshTokenName,
  getJWTCookieDomain,
  getJWTName
} from '~domains/account'
import { addToBasket } from '~domains/basket/services/add-to-basket'
import { getGuestToken } from '~domains/basket/services/get-guest-token'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { setCookies } from '~helpers/server-only/cookie'
import { AddToBasketItem } from '~domains/basket/types'
import Analytics from 'analytics-node'
import { decodeToken } from '~helpers/server-only/decode-token'
import { addMultipleToBasket } from '~domains/basket/services/add-multiple-to-basket'

export type AddMultippleToBasket = { sku: string; quantity: string }[]

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { serverRuntimeConfig } = getConfig()
  const { products } = req.query
  const locale =
    JSON.parse(req.cookies[getCountrySelectorHeaderDataName()] ?? '{}')
      .selectedCountry ??
    req.headers['accept-language']?.split(',')[0]?.toLocaleLowerCase() ??
    getDefaultLocale()
  const targetURL = `${serverRuntimeConfig.host}/${
    locale || getDefaultLocale()
  }/basket`
  const cookieExpiration = (await loadFeatureFlag(
    locale,
    FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
  )) as number
  const addMultipleEndpointIsEnabled = await loadFeatureFlag(
    locale,
    FeatureFlag.BASKET_ADD_MULTIPLE_ITEMS
  )
  const availableChannels = (await loadFeatureFlag(
    locale,
    FeatureFlag.MULTICHANNEL_PRICES
  )) as Record<string, boolean>
  if (Object.keys(availableChannels).length === 0) {
    res.redirect(307, targetURL)
    return
  }
  try {
    const TOKEN_NAME = getJWTName()
    const GUEST_TOKEN_NAME = getGuestJWTName()
    const GUEST_REFRESH_TOKEN_NAME = getGuestRefreshTokenName()
    const GUEST_NAME = getGuestName()
    const anonymousCustomerUniqueId = req.headers[
      'x-anonymous-customer-unique-id'
    ] as string
    const segmentWriteKey = serverRuntimeConfig.segmentWriteKey
    const analytics = new Analytics(segmentWriteKey)
    const cookieTimeout = cookieExpiration ?? 0
    const secureCookieOptions = {
      maxAge: cookieTimeout > 0 ? cookieTimeout : 100,
      domain: getJWTCookieDomain()
    }
    const channel = req.query.channel
    const shouldAddChannel = availableChannels[channel as string]
    let token = req.cookies[TOKEN_NAME] ?? req.cookies[GUEST_TOKEN_NAME]
    let userId

    if (!token) {
      try {
        const response = await getGuestToken(locale.toString())
        if (response) {
          userId = decodeToken(response.accessToken).anonymousId
          setCookies(
            res,
            [
              {
                name: GUEST_TOKEN_NAME,
                value: response.accessToken
              },
              { name: GUEST_REFRESH_TOKEN_NAME, value: response?.refreshToken },
              {
                name: GUEST_NAME,
                value: {
                  guestId: userId
                }
              }
            ],
            secureCookieOptions
          )
          token = response.accessToken
        }
      } catch (e) {}
    } else {
      userId = decodeToken(token).reference
    }

    let productsAndQty: string[]
    const payload = [] as AddMultippleToBasket

    if (typeof products === 'string') {
      productsAndQty = products.split('_')
      productsAndQty.map(item => {
        if (typeof item === 'string') {
          const sku = item.split('-')[0]
          const quantity = item.split('-')[1]
          if (sku) payload.push({ sku, quantity: quantity ?? 1 })
        }
      })
    }

    if (!addMultipleEndpointIsEnabled) {
      for (const product of payload) {
        const item = {
          sku: product.sku,
          quantity: +product.quantity
        } as AddToBasketItem
        try {
          await addToBasket(locale.toString(), item, {
            anonymousCustomerUniqueId,
            token
          })
          analytics.track({
            anonymousId: userId,
            event: 'Product Added',
            properties: {
              sku: item.sku,
              quantity: item.quantity
            }
          })
        } catch (e) {}
      }
    } else {
      const items = [] as AddToBasketItem[]
      payload.map(product => {
        const item = {
          sku: product.sku,
          quantity: +product.quantity,
          ...(shouldAddChannel && { price_channel: channel as string })
        } as AddToBasketItem
        items.push(item)
      })
      try {
        await addMultipleToBasket(locale.toString(), items, {
          anonymousCustomerUniqueId,
          token
        })
        analytics.track({
          anonymousId: userId,
          event: 'Multiple Products Added',
          properties: {
            items
          }
        })
      } catch (e) {}
    }
    res.redirect(307, targetURL)
    return
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
