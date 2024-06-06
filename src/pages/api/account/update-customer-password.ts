import type { NextApiRequest, NextApiResponse } from 'next'
import { getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { updateCustomerPassword } from '~domains/account/services/update-customer-password'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]
    const data = req.body
    const result = await updateCustomerPassword(locale.toString(), data, {
      token
    })

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      let errorMessage: string
      switch (error?.response?.status) {
        case 400:
          errorMessage = 'account.update-password.wrong-password'
          break
        case 403:
          errorMessage = 'account.update-password.unauthorized-request'
          break
        case 404:
          errorMessage = 'account.update-password.customer-not-found'
          break
        case 406:
          errorMessage = 'account.update-password.invalid-password'
          break
        case 422:
          errorMessage = 'account.update-password.wrong-confirm-password'
          if (
            (error.response.data.errors?.filter(error => error.code === '901')
              .length ?? 0) > 1
          ) {
            errorMessage = 'account.password-validation.password-is-too-long'
          }
          break
        default:
          errorMessage = 'account.update-password.unexpected-error'
      }

      handleApiError(res, error, errorMessage)
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'account.update-password.unexpected-error'
      )
    }
  }
}
