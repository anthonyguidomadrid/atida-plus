import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes'
import { getGuestFavouritesName, getJWTCookieDomain } from '~domains/account'
import { handleUnknownError } from '~helpers/error'
import { FavouritesItemsIds } from '~domains/favourites/types'
import { getGuestToken } from '~domains/basket/services/get-guest-token'
import { setCookies, getCookie } from '~helpers/server-only/cookie'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  const featureFlags = await loadFeatureFlags(locale, [
    FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
  ])

  try {
    const GUEST_TOKEN_NAME = getGuestFavouritesName()
    const cookieData = getCookie(req, GUEST_TOKEN_NAME)
    const data = { ...req.body }

    if (data.sku) {
      let values: FavouritesItemsIds = []
      try {
        values = cookieData ? JSON.parse(cookieData) : []
        !values.includes(data.sku) && values.push(data.sku)
      } catch {}
      const guestToken = await getGuestToken(locale.toString())
      const cookieTimeout =
        (featureFlags?.[
          FeatureFlag.ACCOUNT_COOKIE_EXPIRATION_TIMEOUT
        ] as number) ?? 0

      if (guestToken) {
        setCookies(
          res,
          [
            {
              name: GUEST_TOKEN_NAME,
              value: JSON.stringify(values)
            }
          ],
          {
            maxAge: cookieTimeout > 0 ? cookieTimeout : guestToken.expiresIn,
            domain: getJWTCookieDomain(),
            httpOnly: false
          }
        )
      }
    }

    res.statusCode = 200
    res.json({})
  } catch (error) {
    handleUnknownError(req, res, error, 'favourites.unexpected-error')
  }
}
