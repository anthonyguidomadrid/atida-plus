import type { NextApiRequest, NextApiResponse } from 'next'
import { getBrainTreeToken } from '~domains/checkout/services/get-braintree-token'
import { getDefaultLocale } from '~domains/translated-routes'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()] ?? req.cookies[getGuestJWTName()]
    const data = req.body

    const result = await getBrainTreeToken(locale, data, String(token))
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(
        res,
        error,
        'checkout.get-braintree-token.unexpected-error'
      )
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'checkout.get-braintree-token.unexpected-error'
      )
    }
  }
}
