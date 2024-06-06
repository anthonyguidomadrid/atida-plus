import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes'
import { removeFavourites } from '~domains/favourites/services/remove-favourites'
import { getJWTName } from '~domains/account'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]
    const data = { ...req.body }
    const favourites = await removeFavourites(locale, { token: token }, data)
    res.statusCode = 200
    res.json(favourites)
  } catch (error) {
    handleUnknownError(req, res, error, 'favourites.unexpected-error')
  }
}
