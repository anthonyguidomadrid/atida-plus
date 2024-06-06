import type { NextApiRequest, NextApiResponse } from 'next'

import { updateAddress } from '~domains/address/services/update-address'
import { getJWTName, getRefreshTokenName } from '~domains/account'
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
    const refreshToken = req.cookies[getRefreshTokenName()]
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]
    const data = req.body
    const result = await updateAddress(locale.toString(), data, {
      token,
      refreshToken
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
