import { NextApiRequest, NextApiResponse } from 'next'
import { fetchPageRedirect } from '~domains/page/services/fetch-page-redirect'
import { defaultLocale } from '~domains/translated-routes'
import {
  handleContentfulError,
  handleUnknownError,
  isContentfulError
} from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? defaultLocale

  try {
    const result = await fetchPageRedirect(locale.toString())
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isContentfulError(error)
      ? handleContentfulError(req, res, error)
      : handleUnknownError(req, res, error)
  }
}
