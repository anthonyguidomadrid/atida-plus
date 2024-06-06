import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getCustomerTokenName,
  getGuestFavouritesName,
  getJWTCookieDomain,
  getJWTName,
  getRefreshTokenName
} from '~domains/account'
import { clearCookies } from '~helpers/server-only/cookie'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const JWT_NAME = getJWTName()
    const REFRESH_JWT_NAME = getRefreshTokenName()
    const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
    const GUEST_TOKEN_NAME = getGuestFavouritesName()

    const cookieOption = {
      domain: getJWTCookieDomain()
    }

    clearCookies(
      res,
      [JWT_NAME, REFRESH_JWT_NAME, CUSTOMER_TOKEN_NAME, GUEST_TOKEN_NAME],
      cookieOption
    )

    res.status(204).send({})
  } catch (error) {
    handleUnknownError(req, res, error, 'account.logout.unexpected-error')
  }
}
