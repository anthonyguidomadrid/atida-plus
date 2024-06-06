import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchCommon } from '~domains/page/services/fetch-common'
import { getDefaultLocale } from '~domains/translated-routes'
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

  try {
    const result = await fetchCommon(locale.toString())
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isContentfulError(error)
      ? handleContentfulError(req, res, error)
      : handleUnknownError(req, res, error)
  }
}
