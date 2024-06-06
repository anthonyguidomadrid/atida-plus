import { NextApiRequest, NextApiResponse } from 'next'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { getDefaultLocale } from '~domains/translated-routes'
import {
  handleApiError,
  handleCheckoutErrorCode,
  handleUnknownError,
  isApiError
} from '~helpers/error'
import { reOrder } from '~domains/checkout/services/re-order'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()] ?? req.cookies[getGuestJWTName()]
    const data = req.body

    const result = await reOrder(locale.toString(), data, {
      token
    })
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      let errorMessages: string[]
      switch (error?.response?.status) {
        case 404:
          errorMessages = handleCheckoutErrorCode(error, 'checkout.re-order')
          break
        default:
          errorMessages = ['checkout.re-order.unexpected-error']
          break
      }
      const errorMessage = errorMessages[0]

      handleApiError(res, error, errorMessage, {
        allErrors: errorMessages
      })
    } else {
      handleUnknownError(req, res, error, 'checkout.re-order.unexpected-error')
    }
  }
}
