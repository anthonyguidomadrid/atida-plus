import type { NextApiRequest, NextApiResponse } from 'next'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { cancelOrder } from '~domains/checkout/services/cancel-order'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()] ?? req.cookies[getGuestJWTName()]
    const data = { ...req.body }

    const result = await cancelOrder(locale.toString(), data, {
      token
    })
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(res, error, 'checkout.cancel-order.unexpected-error')
      : handleUnknownError(
          req,
          res,
          error,
          'checkout.cancel-order.unexpected-error'
        )
  }
}
