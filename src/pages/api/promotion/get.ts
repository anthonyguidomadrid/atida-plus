import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes'
import { fetchPromotions } from '~domains/promotion/services/fetch-promotions'
import { fetchPromotionById } from '~domains/promotion/services/fetch-promotion-by-id'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const skip = req.query.skip
    const filters = req.query.filters?.length
      ? (req.query.filters as string).split(',')
      : undefined
    const id = req.query.id as string

    const promotion = id
      ? await fetchPromotionById(locale, skip, id)
      : await fetchPromotions(locale, skip, filters, req.preview)

    res.statusCode = 200
    res.json(promotion)
  } catch (error) {
    handleUnknownError(req, res, error, 'promotions.unexpected-error')
  }
}
