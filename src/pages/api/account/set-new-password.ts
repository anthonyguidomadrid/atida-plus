import type { NextApiRequest, NextApiResponse } from 'next'
import { setNewPassword } from '~domains/account/services/set-new-password'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const data = req.body
    const result = await setNewPassword(locale.toString(), data)
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    if (isApiError(error)) {
      let errorMessage = ''
      switch (error?.response?.data?.errors?.[0]?.code) {
        case '406':
          // TODO: fix inconsistent message naming
          errorMessage = 'account.reset-password.passwords-do-not-match'
          break
        case '407':
          errorMessage = 'account.set-new-password.password-change-failed'
          break
        case '408':
          errorMessage = 'account.set-new-password.invalid-password'
          break
        default:
          // TODO: fix inconsistent message naming
          errorMessage = 'account.create-customer.unexpected-error'
      }

      handleApiError(res, error, errorMessage)
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'account.set-new-password.unexpected-error'
      )
    }
  }
}
