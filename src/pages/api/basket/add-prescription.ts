import type { NextApiRequest, NextApiResponse } from 'next'
import { getJWTName } from '~domains/account'
import { addPrescriptionToBasket } from '~domains/basket/services/add-prescription-to-basket'
import {
  handleElasticsearchError,
  isElasticsearchResponseError
} from '~domains/elasticsearch'
import { getDefaultLocale } from '~domains/translated-routes'
import {
  handleApiError,
  isApiError,
  handleUnknownError,
  handleCheckoutErrorCode
} from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]
    const anonymousCustomerUniqueId = req.headers[
      'x-anonymous-customer-unique-id'
    ] as string
    const cartId = req.body.cartId
    const prescriptionToken = req.body.prescriptionToken

    const response = await addPrescriptionToBasket(
      locale.toString(),
      {
        anonymousCustomerUniqueId,
        token
      },
      prescriptionToken,
      cartId
    )
    res.statusCode = 200
    res.json(response)
  } catch (error) {
    if (isApiError(error)) {
      let errorMessages: string[]
      switch (error?.response?.status) {
        case 422:
          errorMessages = handleCheckoutErrorCode(
            error,
            'basket.add-prescription'
          )
          break
        default:
          errorMessages = ['basket.add-prescription.unexpected-error']
          break
      }
      const errorMessage = errorMessages[0]
      handleApiError(res, error, errorMessage, {
        allErrors: errorMessages
      })
    }
    if (isElasticsearchResponseError(error)) {
      handleElasticsearchError(
        res,
        error,
        'basket.add-prescription.unexpected-error'
      )
    }
    handleUnknownError(
      req,
      res,
      error,
      'basket.add-prescription.unexpected-error'
    )
  }
}
