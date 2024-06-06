import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes'
import { getGuestFavouritesName, getJWTCookieDomain } from '~domains/account'
import { handleUnknownError } from '~helpers/error'
import { FavouritesItemsIds } from '~domains/favourites/types'
import { getGuestToken } from '~domains/basket/services/get-guest-token'
import { setCookies, getCookie } from '~helpers/server-only/cookie'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const GUEST_TOKEN_NAME = getGuestFavouritesName()
    const cookieData = getCookie(req, GUEST_TOKEN_NAME)
    const data = { ...req.body }

    if (data.sku) {
      let values: FavouritesItemsIds = []
      let itemsToUpdate: FavouritesItemsIds = []
      try {
        values = cookieData ? JSON.parse(cookieData) : []
        if (values?.length > 0) {
          itemsToUpdate = values.filter(sku => sku !== data.sku)
        }
      } catch {}

      const guestToken = await getGuestToken(locale.toString())
      if (guestToken) {
        setCookies(
          res,
          [
            {
              name: GUEST_TOKEN_NAME,
              value: JSON.stringify(itemsToUpdate)
            }
          ],
          {
            maxAge: guestToken.expiresIn,
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
