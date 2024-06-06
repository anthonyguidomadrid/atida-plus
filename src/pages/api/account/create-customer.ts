import type { NextApiRequest, NextApiResponse } from 'next'
import { createCustomerAccount } from '~domains/account/services/create-account'
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
    const data = req.body
    const result = await createCustomerAccount(
      locale.toString(),
      data,
      anonymousCustomerUniqueId as string
    )
    res.statusCode = 201
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      let errorMessage = ''
      switch (error?.response?.data?.errors?.[0]?.code) {
        case '400':
          errorMessage = 'account.create-customer.existing-email'
          break
        case '410':
          errorMessage = 'account.create-customer.failed-to-save'
          break
        case '419':
          errorMessage = 'account.password-validation.password-is-too-long'
          break
        default:
          errorMessage = 'account.create-customer.unexpected-error'
      }

      handleApiError(res, error, errorMessage)
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'account.create-customer.unexpected-error'
      )
    }
  }
}
