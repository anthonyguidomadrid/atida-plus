import type { NextApiRequest, NextApiResponse } from 'next'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { getDefaultLocale } from '~domains/translated-routes'
import { addCoupon } from '~domains/basket/services/add-coupon'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()] ?? req.cookies[getGuestJWTName()]
    const anonymousCustomerUniqueId = req.headers[
      'x-anonymous-customer-unique-id'
    ] as string
    const coupon = req.body.coupon
    const cartId = req.body.cartId
    const result = await addCoupon(locale, cartId, coupon, {
      anonymousCustomerUniqueId,
      token
    })
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(
          res,
          error,
          error.response.data.errors
            ? `spryker-${error.response.data.errors[0].detail}`
            : 'spryker-cart.error.code_cant_be_added'
        )
      : handleUnknownError(
          req,
          res,
          error,
          'spryker-cart.error.code_cant_be_added'
        )
  }
}
