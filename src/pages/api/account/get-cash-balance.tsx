import { NextApiResponse, NextApiRequest } from 'next/types'
import { getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { getCashBalance } from '~domains/account/services/get-cash-balance'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]

    const result = await getCashBalance(locale.toString(), String(token))
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(
          res,
          error,
          'account.get-cash-balance.failed-to-retrieve-cash-balance'
        )
      : handleUnknownError(
          req,
          res,
          error,
          'account.get-cash-balance.unexpected-error'
        )
  }
}
