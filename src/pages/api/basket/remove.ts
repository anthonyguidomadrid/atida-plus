import type { NextApiRequest, NextApiResponse } from 'next'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { removeFromBasket } from '~domains/basket/services/remove-from-basket'
import {
  handleElasticsearchError,
  isElasticsearchResponseError
} from '~domains/elasticsearch'
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
    const data = req.body

    const result = await removeFromBasket(locale.toString(), data, {
      anonymousCustomerUniqueId,
      token
    })

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      handleApiError(res, error, 'basket.remove-from-basket.unexpected-error')
    } else if (isElasticsearchResponseError(error)) {
      handleElasticsearchError(
        res,
        error,
        'basket.remove-from-basket.unexpected-error'
      )
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'basket.remove-from-basket.unexpected-error'
      )
    }
  }
}
