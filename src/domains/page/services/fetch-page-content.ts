import getConfig from 'next/config'
import { CmsContentTypes } from '~config/content-types'
import compress from 'graphql-query-compress'

import {
  normalizeBrand,
  normalizeCategory,
  normalizeCategoryGrid,
  normalizeContentBlockWithImage,
  normalizeExponeaFeed,
  normalizeHeroBanner,
  normalizeSeo,
  normalizeStaticContentBlock,
  normalizeStaticHeaderBlock,
  normalizeUSPsCard,
  normalizeLinkBlock,
  normalizeVoucherCodes,
  normalizePromotion,
  normalizeContainerOfContentBlocks,
  normalizeGroupOfStaticContentBlocks,
  normalizeTopBrands,
  normalizeCampaignHeroBanner,
  normalizeSlider,
  normalizeCategoryCop,
  Promotion,
  normalizeStaticRecommendationBlock
} from '~domains/contentful'
import {
  getAvailableLocales,
  getEnabledLocales
} from '~domains/translated-routes'
import {
  CampaignHeroBannerFragment,
  Page,
  PageContentFragment,
  PageQuery,
  PageQueryVariables
} from '~generated-graphql'
import {
  createClient,
  getCountryTagFromLocale,
  logger,
  removeUndefinedPropertiesFromObject,
  transformLocaleToUppercase
} from '~helpers'
import {
  ContentBlock,
  PageContent,
  PageType,
  ReferencedContent
} from '../types'
import { PageNotFoundError } from '../helpers'
import { CmsPageTypes } from '~config/page-types'
import { cache } from '~helpers/server-only/redisClient'
import { promotionHasInvalidDates } from '~helpers/promotionValidDate'
import {
  checkIfContainerOfContentBlocks,
  checkIfSlider,
  checkIfSponsoredContent
} from '~domains/page/helpers/typeguards'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

const getPageType = <
  Page extends {
    pageType?: unknown
    referencedContent?: unknown
  }
>(
  page?: Page
): PageType => {
  switch (page?.pageType) {
    case CmsPageTypes.BRAND:
      return PageType.Brand
    case CmsPageTypes.CATEGORY:
      return PageType.POP
    case CmsPageTypes.CATEGORY_COP:
      return PageType.COP
    case CmsPageTypes.PROMOTION:
      return PageType.PromoDP
    default:
      return PageType.Content
  }
}

const getCorrespondingSlugFromLocale = (
  page: PageContentFragment | null | undefined,
  locale: string | undefined
): string | undefined => {
  const firstLocale = getEnabledLocales()[0]
  const secondLocale = getEnabledLocales()[1] ?? 'xx-XX'

  switch (locale) {
    case firstLocale:
      return page?.slugOne ?? undefined
    case secondLocale:
      return page?.slugTwo ?? undefined
    default:
      return undefined
  }
}

const normalizeAllSlugs = (
  page?: PageContentFragment
): { [key: string]: string | undefined } => {
  const firstLocale = getEnabledLocales()[0]
  const secondLocale = getEnabledLocales()[1] ?? 'xx-XX'

  return removeUndefinedPropertiesFromObject({
    [firstLocale]: page?.contentfulMetadata?.tags?.some(
      el => el?.id === getCountryTagFromLocale(firstLocale)
    )
      ? page?.slugOne ?? undefined
      : undefined,
    [secondLocale]: page?.contentfulMetadata?.tags?.some(
      el => el?.id === getCountryTagFromLocale(secondLocale)
    )
      ? page?.slugTwo ?? undefined
      : undefined
  })
}

const normalizeReferencedContent = (
  page?: PageContentFragment
): ReferencedContent | undefined => {
  switch (page?.referencedContent?.__typename) {
    case CmsPageTypes.BRAND:
      return normalizeBrand(page?.referencedContent)
    case CmsPageTypes.CATEGORY:
      return normalizeCategory(page?.referencedContent)
    case CmsPageTypes.PROMOTION:
      return normalizePromotion(page?.referencedContent)
    default:
      return undefined
  }
}

const normalizePageContent = (
  pageCollection?: ReadonlyArray<PageContentFragment | null>,
  locale?: string
): PageContent => {
  const page = pageCollection?.[0]
  let sponsoredContentPosition = 0

  return removeUndefinedPropertiesFromObject({
    type: getPageType(page ?? undefined),
    title: page?.title ?? null,
    slug: getCorrespondingSlugFromLocale(page, locale) ?? '',
    allSlugs: normalizeAllSlugs(page ?? undefined),
    isCampaignPage: page?.isCampaignPage ?? false,
    referencedContent: normalizeReferencedContent(page ?? undefined),
    heroHeader:
      page?.heroHeader?.__typename === CmsContentTypes.HERO_BANNER
        ? normalizeHeroBanner(page?.heroHeader ?? undefined)
        : normalizeCampaignHeroBanner(
            (page?.heroHeader as CampaignHeroBannerFragment) ?? undefined
          ),
    brand: normalizeBrand(
      page?.referencedContent?.__typename === CmsPageTypes.BRAND
        ? page?.referencedContent
        : undefined
    ),
    category: normalizeCategory(
      page?.referencedContent?.__typename === CmsPageTypes.CATEGORY
        ? page?.referencedContent
        : undefined
    ),
    promotion: normalizePromotion(
      page?.referencedContent?.__typename === CmsPageTypes.PROMOTION
        ? page?.referencedContent
        : undefined
    ),
    categoryCop: normalizeCategoryCop(
      page?.referencedContent?.__typename === CmsPageTypes.CATEGORY_COP
        ? page?.referencedContent
        : undefined
    ),
    contentBlocks:
      page?.contentBlocksCollection?.items
        ?.map(contentBlock => {
          switch (contentBlock?.__typename) {
            case CmsContentTypes.SLIDER:
              return normalizeSlider(contentBlock)
            case CmsContentTypes.HERO_BANNER:
              return normalizeHeroBanner(contentBlock)
            case CmsContentTypes.CATEGORY_GRID:
              return normalizeCategoryGrid(contentBlock)
            case CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE:
              return normalizeContentBlockWithImage(contentBlock)
            case CmsContentTypes.USPS_CARD:
              return normalizeUSPsCard(contentBlock)
            case CmsContentTypes.PROMOTION:
              return normalizePromotion(contentBlock)
            case CmsContentTypes.STATIC_CONTENT_BLOCK:
              return normalizeStaticContentBlock(contentBlock)
            case CmsContentTypes.STATIC_HEADER_BLOCK:
              return normalizeStaticHeaderBlock(contentBlock)
            case CmsContentTypes.STATIC_RECOMMENDATION_BLOCK:
              return normalizeStaticRecommendationBlock(contentBlock)
            case CmsContentTypes.EXPONEA_RECOMMENDATION:
              return normalizeExponeaFeed(contentBlock)
            case CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS:
              return normalizeContainerOfContentBlocks(contentBlock)
            case CmsContentTypes.GROUP_OF_STATIC_CONTENT_BLOCKS:
              return normalizeGroupOfStaticContentBlocks(contentBlock)
            case CmsContentTypes.TOP_BRANDS:
              return normalizeTopBrands(contentBlock)
            case CmsContentTypes.CAMPAIGN_HERO_BANNER:
              return normalizeCampaignHeroBanner(contentBlock)
            case CmsContentTypes.LINK_BLOCK:
              return normalizeLinkBlock(contentBlock)
            case CmsContentTypes.VOUCHER_CODES:
              return normalizeVoucherCodes(contentBlock)
            default:
              return null
          }
        })
        ?.filter((contentBlock): contentBlock is ContentBlock => {
          if (contentBlock?.contentType === CmsContentTypes.PROMOTION) {
            return !promotionHasInvalidDates(contentBlock as Promotion)
          }
          if (
            contentBlock?.contentType ===
            CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS
          ) {
            const blocks = contentBlock?.blocks?.filter(block => {
              return !(
                block.contentType === CmsContentTypes.PROMOTION &&
                promotionHasInvalidDates(block as Promotion)
              )
            })
            return !!(blocks && blocks.length > 0)
          }
          return true
        })
        ?.filter((contentBlock): contentBlock is ContentBlock => !!contentBlock)
        ?.map(contentBlock => {
          if (
            checkIfSponsoredContent(contentBlock) &&
            contentBlock.isSponsoredContent
          ) {
            sponsoredContentPosition += 1
            return {
              ...contentBlock,
              sponsoredContentPosition
            }
          } else if (checkIfContainerOfContentBlocks(contentBlock)) {
            contentBlock.blocks?.forEach(block => {
              if (block.isSponsoredContent) {
                sponsoredContentPosition += 1
                block.sponsoredContentPosition = sponsoredContentPosition
              }
            })

            return contentBlock
          } else if (checkIfSlider(contentBlock)) {
            contentBlock.contentBlocks.forEach(block => {
              if (block.isSponsoredContent) {
                sponsoredContentPosition += 1
                block.sponsoredContentPosition = sponsoredContentPosition
              }
            })

            return contentBlock
          }

          return contentBlock
        }) ?? [],
    seo: normalizeSeo(page?.seo ?? undefined)
  })
}

export const fetchPageContent = async (
  locale: string,
  slug: string,
  preview = false
): Promise<PageContent> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    options: {
      baseURL: `${serverRuntimeConfig.cmsGraphQLHost}/spaces/${serverRuntimeConfig.cmsSpaceId}/environments/${serverRuntimeConfig.cmsEnvironmentId}`,
      headers: {
        Authorization: `Bearer ${
          preview
            ? serverRuntimeConfig.cmsPreviewToken
            : serverRuntimeConfig.cmsToken
        }`
      },
      // enables default cache in redis of 5 minutes for request
      adapter: cache?.adapter
    },
    locale,
    interceptorOptions: {
      mode: 'contentful-graphql'
    }
  })
  const variables: PageQueryVariables = {
    locale: transformLocaleToUppercase(locale),
    preview,
    slug: slug.trim(),
    allLocales: getAvailableLocales().map(transformLocaleToUppercase),
    tags: getCountryTagFromLocale(locale)
  }

  const querySizeNotCompressed = Buffer.byteLength(
    Page.loc?.source.body as string
  )

  logger.debug(
    `Query size before compression: ${querySizeNotCompressed} bytes.`
  )

  const query = compress(Page.loc?.source.body || '')

  const querySizeCompressed = Buffer.byteLength(query)

  querySizeCompressed <= 7800
    ? logger.debug(
        `Query size after compression: ${querySizeCompressed} bytes.`
      )
    : logger.error(
        `Query size after compression too hight: ${querySizeCompressed} bytes. (It must be less than 8000 bytes)`
      )

  client.interceptors.response.use(config => {
    const queryCost = config.headers
      ? config.headers['x-contentful-graphql-query-cost']
      : 'unknown'

    queryCost <= 11000
      ? logger.debug(`Query cost: ${queryCost}`)
      : logger.error(
          `Query cost too high: ${queryCost}. (It must be less than 12000)`
        )

    return config
  })

  const contentfulResponse = await client.post<{ data: PageQuery }>('', {
    query,
    variables
  })

  if (contentfulResponse.data.data.pageCollection?.items.length === 0) {
    throw new PageNotFoundError(`Page for slug ${slug} not found in Contentful`)
  }

  return normalizePageContent(
    contentfulResponse?.data?.data?.pageCollection?.items,
    locale
  )
}
