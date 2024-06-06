import type { NextApiRequest, NextApiResponse } from 'next'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { removeCoupon } from '~domains/basket/services/remove-coupon'
import { getDefaultLocale } from '~domains/translated-routes'
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
    const result = await removeCoupon(locale, cartId, coupon, {
      anonymousCustomerUniqueId,
      token
    })
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(res, error, 'spryker-cart.error.code_cant_be_removed')
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'spryker-cart.error.code_cant_be_removed'
      )
    }
  }
}
