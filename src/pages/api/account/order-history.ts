import type { NextApiRequest, NextApiResponse } from 'next'
import { orderHistory } from '~domains/account/services/order-history'
import { getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()]

    const { data, links: pageLinks } = await orderHistory({
      locale,
      accessToken: String(token),
      params: req.query
    })

    let totalPages = 0

    if (pageLinks?.last) {
      const { offset, limit } = pageLinks.last
        .split('?')[1]
        .split('&')
        .reduce(
          (memo, link) => {
            const [param, val] = link.split('=')

            if (param.match('offset')) {
              memo.offset = Number(val)
            } else {
              memo.limit = Number(val)
            }

            return memo
          },
          { offset: 0, limit: 0 }
        )

      /**
        We add 1 to calculate properly the number of pages:
          orders = 8
          offset = 5
          totalPages = 8 / 5 + 1 = 2  --->  show 2 pages with [5, 3] orders
      **/
      totalPages = offset / limit + 1
    }

    res.statusCode = 200
    res.json({ data, totalPages })
  } catch (error) {
    isApiError(error)
      ? handleApiError(res, error, 'account.order-history.unexpected-error')
      : handleUnknownError(
          req,
          res,
          error,
          'account.order-history.unexpected-error'
        )
  }
}
