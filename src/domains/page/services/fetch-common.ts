import type { EntryCollection } from 'contentful'
import { createContentfulClient } from '~domains/contentful/helpers/client'
import { createLocalClient } from '~domains/contentful/helpers/contentful-api'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import fileSystem from 'fs'

import {
  Link,
  Menu,
  normalizeIcon,
  normalizeLink,
  normalizeMenu,
  normalizeOrganization,
  normalizeRichText
} from '~domains/contentful'
import {
  Common,
  ContentfulFooter,
  ContentfulFooterProviderBlock,
  ContentfulHeaderNavigationMenu,
  ContentfulOrganization,
  Footer,
  FooterProviderBlock
} from '../types'
import {
  logger,
  removeUndefinedPropertiesFromObject,
  transformLocaleToUppercase
} from '~helpers'
import { normalizeCampaignLabels } from '~domains/contentful/normalizers/translationInfoLabel'
import { TranslationInfoLabel } from '~generated-graphql'
import getConfig from 'next/config'
import { FeatureFlag } from '~config/constants/feature-flags'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

const { serverRuntimeConfig } = getConfig()
const webhookStorage =
  serverRuntimeConfig.cmsWebhookStorage ?? '/app/storage/json/'

const normalizeProviderBlocks = (
  items: ContentfulFooterProviderBlock[]
): FooterProviderBlock[] =>
  items?.map(item =>
    removeUndefinedPropertiesFromObject({
      title: item?.fields?.title,
      content: normalizeRichText(item?.fields?.content),
      icons: item?.fields?.icons
        ?.map(normalizeIcon)
        .filter((icon): icon is string => !!icon),
      links: item?.fields?.links
        ?.map(normalizeLink)
        .filter((link): link is Link => !!link)
    })
  )

const normalizeFooter = (
  response: EntryCollection<ContentfulFooter>
): Footer => {
  const fields = response?.items[0]?.fields

  return {
    importantLinks: normalizeMenu(fields.importantLinks),
    serviceContactLinks: normalizeMenu(fields.serviceContactLinks),
    providerBlocks: normalizeProviderBlocks(fields.providerBlocks),
    newsletterBlockTitle: fields?.newsletterBlockTitle ?? '',
    newsletterSellingPoints: fields?.newsletterSellingPoints ?? [],
    termsConditionsLinks: normalizeMenu(fields.termsConditionsLinks),
    copyright: normalizeRichText(fields.copyright),
    socialMediaLinks: normalizeProviderBlocks([fields?.socialMediaLinks])
  }
}

const normalizeHeaderNavigationMenu = (
  response: EntryCollection<ContentfulHeaderNavigationMenu>
): Menu | undefined => {
  const menu = response?.items?.[0]
  return normalizeMenu(menu)
}

export const fetchCommon = async (locale: string): Promise<Common> => {
  const isReplaceCdaMenuCallWithPreNormalizedJsonEnabled = await loadFeatureFlag(
    locale,
    FeatureFlag.CONTENTFUL_REPLACE_CDA_MENU_CALL_WITH_PRE_NORMALIZED_JSON
  )
  const client = createContentfulClient()
  const localClient = createLocalClient(client)

  const [
    footerResponse,
    headerNavigationRightResponse,
    campaignLabels,
    organizationData
  ] = await Promise.all([
    localClient.getContentfulEntries<ContentfulFooter>(
      ['pageFooter'],
      locale,
      6,
      0,
      1000,
      'id',
      'page-footer'
    ),
    localClient.getContentfulEntries<ContentfulHeaderNavigationMenu>(
      ['menu'],
      locale,
      4,
      0,
      1000,
      'id',
      'header-navigation-right'
    ),
    localClient.getContentfulEntries<TranslationInfoLabel>(
      ['translationInfoLabel'],
      locale,
      3
    ),
    localClient.getContentfulEntries<ContentfulOrganization>(
      ['organization'],
      locale,
      1
    )
  ])

  const getWebhookCachedHeaderNavigationLeft = (): Menu => {
    const normalizedLocale = transformLocaleToUppercase(locale)
    const filePath =
      webhookStorage +
      `menu_${normalizedLocale}_header-navigation-left-normalized.json`

    logger.debug(
      {
        webhooksEnabled: isReplaceCdaMenuCallWithPreNormalizedJsonEnabled,
        filePath: filePath
      },
      `Contentful CDA Webhooks are enabled`
    )

    let cachedHeaderNavigationLeft = null
    if (
      isReplaceCdaMenuCallWithPreNormalizedJsonEnabled &&
      fileSystem.existsSync(filePath)
    ) {
      try {
        cachedHeaderNavigationLeft = JSON.parse(
          fileSystem.readFileSync(filePath, 'utf8')
        )
      } catch (e) {
        logger.error(`Error reading ${filePath}`)
      }
    }

    return cachedHeaderNavigationLeft
  }

  //if the FF is on we get the menu from the webhook
  const webhookCachedHeaderNavigationLeft = isReplaceCdaMenuCallWithPreNormalizedJsonEnabled
    ? getWebhookCachedHeaderNavigationLeft()
    : null

  let headerNavigationLeft = null

  if (
    //if the FF is off or for some reason the menu from the webhook is null we are fetching the menu with normal Contentful API call
    !isReplaceCdaMenuCallWithPreNormalizedJsonEnabled ||
    webhookCachedHeaderNavigationLeft === null
  ) {
    const headerNavigationLeftResponse: EntryCollection<ContentfulHeaderNavigationMenu> = await localClient.getContentfulEntries<ContentfulHeaderNavigationMenu>(
      ['menu'],
      locale,
      8,
      0,
      1000,
      'id',
      'header-navigation-left'
    )
    headerNavigationLeft = normalizeHeaderNavigationMenu(
      headerNavigationLeftResponse
    )
  } else {
    headerNavigationLeft = webhookCachedHeaderNavigationLeft
  }

  return {
    footer: normalizeFooter(footerResponse),
    headerNavigationLeft,
    headerNavigationRight: normalizeHeaderNavigationMenu(
      headerNavigationRightResponse
    ),
    campaignLabels: normalizeCampaignLabels(campaignLabels),
    organization: normalizeOrganization(organizationData)
  }
}
