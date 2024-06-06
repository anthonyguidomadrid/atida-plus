import type { NextApiRequest, NextApiResponse } from 'next'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { adyenPaymentMethods } from '~domains/checkout/services/adyen-payment-methods'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const GUEST_TOKEN_NAME = getGuestJWTName()
    const token = req.cookies[getJWTName()] ?? req.cookies[GUEST_TOKEN_NAME]
    const data = req.body

    const result = await adyenPaymentMethods(locale, data, String(token))
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(
          res,
          error,
          'checkout.adyen-payment-methods.unexpected-error'
        )
      : handleUnknownError(
          req,
          res,
          error,
          'checkout.adyen-payment-methods.unexpected-error'
        )
  }
}
