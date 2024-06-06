import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyResetPasswordToken } from '~domains/account/services/verify-reset-password-token'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const data = req.query
    const result = await verifyResetPasswordToken(
      locale.toString(),
      String(data.token)
    )
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    // TODO: fix inconsistent message naming - unexpected-error like others?
    isApiError(error)
      ? handleApiError(res, error, 'account.verify-reset-password-token.error')
      : handleUnknownError(
          req,
          res,
          error,
          'account.verify-reset-password-token.unexpected-error'
        )
  }
}
