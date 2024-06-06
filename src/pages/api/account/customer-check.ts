import type { NextApiRequest, NextApiResponse } from 'next'
import { customerCheck } from '~domains/account/services/customer-check'
import { CustomerCheckTriggerPayload } from '~domains/account/types'
import { getDefaultLocale } from '~domains/translated-routes/helpers/runtime'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const anonymousCustomerUniqueId =
      req.headers['x-anonymous-customer-unique-id']
    const data = req.query

    const result = await customerCheck(
      locale.toString(),
      data as CustomerCheckTriggerPayload,
      anonymousCustomerUniqueId as string
    )

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      // If we recive a 404, it means we cannot find that email, so its a valid one
      if (error.response.status === 404) {
        const data = req.query
        res.statusCode = 200
        res.json({ email: data.email, exists: false })
      } else {
        handleApiError(res, error, 'account.customer-check.unexpected-error')
      }
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'account.customer-check.unexpected-error'
      )
    }
  }
}
