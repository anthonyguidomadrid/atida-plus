import { NextApiRequest, NextApiResponse } from 'next'

import { getDefaultLocale } from '~domains/translated-routes'
import { fetchMenuItemCollection } from '~domains/menu/services/fetch-menu-item-collection'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  const menuTitle = req.query.menuTitle

  try {
    const result = await fetchMenuItemCollection(locale, menuTitle as string)

    res.statusCode = 200
    res.json(result)
  } catch (error) {
    handleUnknownError(req, res, error, 'menu.unexpected-error')
  }
}
