import type { NextApiRequest, NextApiResponse } from 'next'
import { validateAddress } from '~domains/address/services/validate-address'
import { ValidateAddressTriggerPayload } from '~domains/address/types'
import { getDefaultLocale } from '~domains/translated-routes'
import { logger } from '~helpers'
import {
  handleApiError,
  isApiError,
  getErrorMessage,
  getErrorStack
} from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const data = req.query
    const result = await validateAddress(
      locale.toString(),
      data as ValidateAddressTriggerPayload
    )
    res.statusCode = 201
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      let errorMessage: string
      switch (error?.response?.data?.errors?.[0]?.code) {
        case '400':
          errorMessage = 'account.validate-address.failed-validation'
          break
        case '429':
          errorMessage = 'account.validate-address.rate-limit-exceeded'
          break
        case '503':
          errorMessage = 'account.validate-error.temporary-server-error'
          break
        default:
          errorMessage = 'account.validate-address.unexpected-error'
      }
      handleApiError(res, error, errorMessage)
    } else {
      res.statusCode = 500
      logger.error({
        request: req.url,
        name: 'UnknownError',
        message: getErrorMessage(error),
        stack: getErrorStack(error)
      })
      res.json({
        type: 'Error',
        name: 'UnknownError',
        message: 'account.validate-address.unexpected-error'
      })
    }
  }
}
