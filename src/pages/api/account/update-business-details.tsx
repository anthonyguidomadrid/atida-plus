import type { NextApiRequest, NextApiResponse } from 'next'

import { updateBusinessDetails } from '~domains/account/services/update-business-details'
import { getJWTName } from '~domains/account'
import {
  isApiError,
  handleUnknownError,
  handleUpdateCustomerApiError
} from '~helpers/error'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]
    const data = req.body
    const result = await updateBusinessDetails(
      locale.toString(),
      data,
      String(token)
    )

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
