import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes'
import { fetchRecommendations } from '~domains/exponea/services/fetch-recommendations'
import { getExponeaEtcName } from '~domains/exponea/helpers/get-exponea-etc-name'
import { handleUnknownError } from '~helpers/error'
import { getCookie } from '~helpers/server-only/cookie'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { SessionChannelType } from '~domains/basket/types'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const exponeaCookie = req.cookies[getExponeaEtcName()]
    const sessionChannelCookie = getCookie(req, getSessionChannelName())
    const sessionChannel =
      sessionChannelCookie !== ''
        ? (JSON.parse(sessionChannelCookie) as SessionChannelType)
        : undefined
    const data = { ...req.body, ...(sessionChannel && { sessionChannel }) }
    const response = await fetchRecommendations(locale, exponeaCookie, data)
    res.statusCode = 200
    res.json(response)
  } catch (error) {
    handleUnknownError(req, res, error, 'recommendations.unexpected-error')
  }
}
