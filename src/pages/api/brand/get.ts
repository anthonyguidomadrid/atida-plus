import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchBrands } from '~domains/brand/services/fetch-brands'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const brands = await fetchBrands(locale)
    res.statusCode = 200
    res.json(brands)
  } catch (error) {
    handleUnknownError(req, res, error, 'promotions.unexpected-error')
  }
}
