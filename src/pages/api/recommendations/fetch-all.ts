import type { NextApiRequest, NextApiResponse } from 'next'

import { getDefaultLocale } from '~domains/translated-routes'
import { fetchAllRecommendations } from '~domains/exponea/services/fetch-all-recommendations'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const data = req.body
    const response = await fetchAllRecommendations(locale, data.type)
    res.statusCode = 200
    res.json(response)
  } catch (error) {
    handleUnknownError(req, res, error, 'recommendations.unexpected-error')
  }
}
