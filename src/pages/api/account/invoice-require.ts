import type { NextApiRequest, NextApiResponse } from 'next'
import { getJWTName } from '~domains/account'
import {
  isApiError,
  handleUnknownError,
  handleUpdateCustomerApiError
} from '~helpers/error'
import { getDefaultLocale } from '~domains/translated-routes'
import { invoiceRequire } from '~domains/account/services/customer-request-invoice'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]
    const data = req.body
    const result = await invoiceRequire(locale.toString(), data, {
      token
    })

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleUpdateCustomerApiError(res, error)
      : handleUnknownError(
          req,
          res,
          error,
          'account.update-customer.unexpected-error'
        )
  }
}
