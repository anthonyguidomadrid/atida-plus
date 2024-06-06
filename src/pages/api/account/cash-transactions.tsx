import { NextApiResponse, NextApiRequest } from 'next/types'
import { getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { getCashTransactions } from '~domains/account/services/get-cash-transactions'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const accessToken = req.cookies[getJWTName()] ?? ''

    const response = await getCashTransactions({
      locale,
      params: req.query,
      accessToken
    })
    res.statusCode = 200
    res.json(response)
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
