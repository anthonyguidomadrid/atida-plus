import type { NextApiRequest, NextApiResponse } from 'next'
import { orderDetails } from '~domains/account/services/order-details'
import {
  getJWTName,
  getGuestJWTName,
  getJWTCookieDomain,
  getGuestRefreshTokenName
} from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { clearCookies } from '~helpers/server-only/cookie'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()] ?? req.cookies[getGuestJWTName()]

    const { orderId, isCheckoutComplete } = req.query

    const data = await orderDetails({
      locale,
      accessToken: String(token),
      orderId: String(orderId)
    })

    res.statusCode = 200
    isCheckoutComplete &&
      clearCookies(res, [getGuestJWTName(), getGuestRefreshTokenName()], {
        domain: getJWTCookieDomain()
      })
    res.json(data)
  } catch (error) {
    isApiError(error)
      ? handleApiError(res, error, 'account.order-details.unexpected-error')
      : handleUnknownError(
          req,
          res,
          error,
          'account.order-details.unexpected-error'
        )
  }
}
