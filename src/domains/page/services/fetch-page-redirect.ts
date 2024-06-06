import { createContentfulClient } from '~domains/contentful/helpers/client'
import { createLocalClient } from '~domains/contentful/helpers/contentful-api'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { normalizePageRedirects } from '~domains/contentful/normalizers/page-redirect'
import { FeatureFlag } from '~config/constants/feature-flags'
import { ContentfulPageRedirect } from '../types'
import getConfig from 'next/config'
import { logger, transformLocaleToUppercase } from '~helpers'
import fileSystem from 'fs'
const { serverRuntimeConfig } = getConfig()
const webhookStorage =
  serverRuntimeConfig.cmsWebhookStorage ?? '/app/storage/json/'

export const fetchPageRedirect = async (locale: string) => {
  const isReplaceCdaPageRedirectsNormalizedJsonEnabled = await loadFeatureFlag(
    locale,
    FeatureFlag.CONTENTFUL_REPLACE_CDA_PAGE_REDIRECTS_NORMALIZED_JSON
  )
  const client = createContentfulClient()
  const localClient = createLocalClient(client)
  let pageRedirects = null

  if (isReplaceCdaPageRedirectsNormalizedJsonEnabled) {
    const normalizedLocale = transformLocaleToUppercase(locale)
    const filePath =
      webhookStorage + `page_redirects_301_${normalizedLocale}_normalized.json`

    logger.debug(
      {
        webhooksEnabled: true,
        filePath: filePath
      },
      `Contentful CDA Webhooks are enabled`
    )

    try {
      if (fileSystem.existsSync(filePath)) {
        pageRedirects = JSON.parse(fileSystem.readFileSync(filePath, 'utf8'))
      }
    } catch (e) {
      logger.error(`Error reading ${filePath}`)
    }
  }

  if (pageRedirects === null) {
    const [pageRedirectResponse] = await Promise.all([
      localClient.getContentfulEntries<ContentfulPageRedirect>(
        ['pageRedirect'],
        locale,
        2
      )
    ])

    pageRedirects = normalizePageRedirects(pageRedirectResponse)
  }

  return pageRedirects
}
