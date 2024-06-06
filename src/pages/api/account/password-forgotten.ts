import type { NextApiRequest, NextApiResponse } from 'next'
import { passwordForgotten } from '~domains/account/services/password-forgotten'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const data = req.body
    const result = await passwordForgotten(locale.toString(), data)
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(
          res,
          error,
          'account.password-forgotten.unexpected-error'
        )
      : handleUnknownError(
          req,
          res,
          error,
          'account.password-forgotten.unexpected-error'
        )
  }
}
