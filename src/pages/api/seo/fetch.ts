import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchSeoBlock } from '~domains/seo/services/fetch-seo'
import { getDefaultLocale } from '~domains/translated-routes'
import { logger } from '~helpers'
import {
  handleContentfulError,
  isContentfulError,
  handleUnknownError
} from '~helpers/error'
import { PageNotFoundError } from '~domains/page'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  const slug = Array.isArray(req.query.slug)
    ? req.query.slug[0]
    : req.query.slug

  try {
    const result = await fetchSeoBlock(locale.toString(), String(slug))
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (
      error instanceof PageNotFoundError &&
      error?.name === 'seo-block.not-found-error'
    ) {
      res.statusCode = 404
      logger.error({
        request: req.url,
        name: 'SeoBlockNotFoundError',
        message: error.message
      })
      res.json({ type: 'Error', name: error.name })
    } else {
      isContentfulError(error)
        ? handleContentfulError(req, res, error)
        : handleUnknownError(req, res, error)
    }
  }
}
