import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchPageContent } from '~domains/page/services/fetch-page-content'
import { getDefaultLocale } from '~domains/translated-routes'
import { logger } from '~helpers'
import { PageNotFoundError } from '~domains/page'
import {
  handleContentfulError,
  isContentfulError,
  handleUnknownError
} from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  const slug = Array.isArray(req.query.slug) ? req.query.slug.join('/') : '/'

  try {
    const result = await fetchPageContent(locale.toString(), slug)
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (
      error instanceof PageNotFoundError &&
      error?.name === 'page.not-found-error'
    ) {
      res.statusCode = 404
      logger.error({
        request: req.url,
        name: 'PageNotFoundError',
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
