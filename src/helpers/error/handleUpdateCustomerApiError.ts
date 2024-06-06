import { NextApiResponse } from 'next'

import { handleApiError, ApiError } from '~helpers/error'

export const handleUpdateCustomerApiError = (
  res: NextApiResponse,
  error: ApiError
): void => {
  let errorMessage: string
  switch (error?.response?.data?.errors?.[0]?.code) {
    case '400':
      errorMessage = 'account.update-customer.customer-is-not-specified'
      break
    case '403':
      errorMessage = 'account.update-customer.unauthorized-request'
      break
    case '404':
      errorMessage = 'account.update-customer.customer-not-found'
      break
    case '406':
      errorMessage = 'account.update-customer.invalid-token'
      break
    case '440':
      errorMessage = 'account.update-customer.access-token-expired'
      break
    default:
      errorMessage = 'account.update-customer.unexpected-error'
  }

  handleApiError(res, error, errorMessage)
}
