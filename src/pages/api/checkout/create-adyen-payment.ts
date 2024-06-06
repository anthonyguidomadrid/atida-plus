import type { NextApiRequest, NextApiResponse } from 'next'
import { createAdyenPayment } from '~domains/checkout/services/create-adyen-payment'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { getIPAddressString } from '~helpers/server-only/getIPAddressString'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const GUEST_TOKEN_NAME = getGuestJWTName()
    const token = req.cookies[getJWTName()] ?? req.cookies[GUEST_TOKEN_NAME]
    const data = req.body
    const ipAddressHeader = req.headers['cloudfront-viewer-address']
    const ipAddress = getIPAddressString(ipAddressHeader)

    const result = await createAdyenPayment(
      locale,
      {
        ...data,
        shopperIP: ipAddress,
        shopperInteraction: 'ContAuth',
        recurringProcessingModel: 'CardOnFile',
        shopperReference: data.customer.customer_reference
      },
      String(token)
    )
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(res, error, 'checkout.payment.unexpected-error')
      : handleUnknownError(req, res, error, 'checkout.payment.unexpected-error')
  }
}
