import type { NextApiRequest, NextApiResponse } from 'next'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { getDefaultLocale } from '~domains/translated-routes'
import { setCreateOrder } from '~domains/checkout/services/create-order'
import {
  handleApiError,
  handleCheckoutErrorCode,
  isApiError,
  handleUnknownError
} from '~helpers/error'
import { getAjsAnonymousIdName } from '~domains/exponea/helpers/get-ajs-anonymous-id-name'
import { getGAName } from '~domains/analytics/helpers/get-ga-name'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  try {
    const token = req.cookies[getJWTName()] ?? req.cookies[getGuestJWTName()]
    const segmentAnonymousUserId = req.cookies[getAjsAnonymousIdName()]
    const clientID = req.cookies[getGAName()]
    const data = { ...req.body, segmentAnonymousUserId, clientID }

    const result = await setCreateOrder(locale.toString(), data, {
      token
    })
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      let errorMessages: string[]
      switch (error?.response?.status) {
        case 422:
          errorMessages = handleCheckoutErrorCode(
            error,
            'checkout.create-order'
          )
          break
        default:
          errorMessages = ['checkout.create-order.unexpected-error']
          break
      }
      const errorMessage =
        errorMessages.find(
          message => message === 'checkout.create-order.unavailable-product'
        ) ?? errorMessages[0]

      handleApiError(res, error, errorMessage, {
        allErrors: errorMessages
      })
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'checkout.create-order.unexpected-error'
      )
    }
  }
}
