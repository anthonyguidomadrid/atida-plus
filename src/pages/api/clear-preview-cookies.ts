import type { NextApiRequest, NextApiResponse } from 'next'
import { getDefaultLocale } from '~domains/translated-routes/helpers/runtime'

export default function clearPreviewCookies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const locale = req.query.locale ?? getDefaultLocale()

  // Clears the preview mode cookies.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: `/${locale}` })
  res.end()
}
