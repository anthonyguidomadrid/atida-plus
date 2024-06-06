import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes'
import { fetchPageFilter } from '~domains/page-filter/services/fetch-page-filter'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const slug = req.query.slug as string

    const pageFilter = fetchPageFilter(slug, locale)

    res.statusCode = 200
    res.json(pageFilter)
  } catch (error) {
    handleUnknownError(req, res, error, 'promotions.unexpected-error')
  }
}
