import type { NextApiRequest, NextApiResponse } from 'next'
import { getCustomer } from '~domains/account/services/get-customer'
import { getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const data = req.query
    const token = req.cookies[getJWTName()]
    const result = await getCustomer(
      locale.toString(),
      String(data.customerRef),
      String(token)
    )
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(res, error, 'account.get-customer.error')
      : handleUnknownError(
          req,
          res,
          error,
          'account.get-customer.unexpected-error'
        )
  }
}
