import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes'
import { getProducts } from '~domains/favourites/services/get-products'
import { handleUnknownError } from '~helpers/error'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { getCookie } from '~helpers/server-only/cookie'
import { SessionChannelType } from '~domains/basket/types'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const sessionChannelCookie = getCookie(req, getSessionChannelName())
    const sessionChannel =
      sessionChannelCookie !== ''
        ? (JSON.parse(sessionChannelCookie) as SessionChannelType)
        : undefined
    const data = { ...req.body, ...(sessionChannel && { sessionChannel }) }
    const favourites = await getProducts(locale, data)
    res.statusCode = 200
    res.json(favourites)
  } catch (error) {
    handleUnknownError(req, res, error, 'favourites.unexpected-error')
  }
}
