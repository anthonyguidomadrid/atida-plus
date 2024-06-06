import type { NextApiRequest, NextApiResponse } from 'next'

import { getDefaultLocale } from '~domains/translated-routes'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { createStripeMultibancoPayment } from '~domains/checkout/services/create-stripe-multibanco-payment'
import { StripeMultibancoPaymentData } from '~domains/checkout/types'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const GUEST_TOKEN_NAME = getGuestJWTName()
    const token = req.cookies[getJWTName()] ?? req.cookies[GUEST_TOKEN_NAME]
    const data: StripeMultibancoPaymentData = req.body
    const stripeMultibancoData = await createStripeMultibancoPayment(
      locale,
      data,
      String(token)
    )

    // TODO: investigate: could this be combined into /api/order-payments as it's the same service?
    res.statusCode = 200
    res.json(stripeMultibancoData)
  } catch (error) {
    isApiError(error)
      ? handleApiError(res, error, 'checkout.multibanco.unexpected-error')
      : handleUnknownError(
          req,
          res,
          error,
          'checkout.multibanco.unexpected-error'
        )
  }
}
