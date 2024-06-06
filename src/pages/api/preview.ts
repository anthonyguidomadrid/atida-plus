import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchPageContent } from '~domains/page/services/fetch-page-content'
import getConfig from 'next/config'
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { serverRuntimeConfig } = getConfig()

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== serverRuntimeConfig.cmsPreviewToken ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const locale = req.query.locale
  //@ts-ignore
  const page = await fetchPageContent(locale, req.query.slug, true)
  if (!page) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  // We cannot pass the whole page because of contentful limitation on previewData
  res.setPreviewData({ slug: page.slug, locale })

  // Redirect to the path from the fetched page
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/${locale}/preview/${page.slug}`)
}
