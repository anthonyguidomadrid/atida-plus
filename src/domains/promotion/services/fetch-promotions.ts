import {
  createClient,
  transformLocaleToUppercase,
  getCountryTagFromLocale,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { getAvailableLocales } from '~domains/translated-routes'
import {
  PromotionsQuery,
  Promotions,
  PromotionFragment
} from '~generated-graphql'
import getConfig from 'next/config'
import {
  normalizePromotion,
  normalizePromotionData,
  Promos,
  Promotion
} from '~domains/contentful/normalizers/promotion'
import {
  limitPromotions,
  skipPromotions
} from '~domains/promotion/slices/content'
import { cache } from '~helpers/server-only/redisClient'
import dayjs from 'dayjs'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchPromotions = async (
  locale?: string,
  skip?: string | string[],
  filters?: string[],
  preview = false
): Promise<Promos> => {
  const { serverRuntimeConfig } = getConfig()
  const shouldUseOrFormula = await loadFeatureFlag(
    locale,
    FeatureFlag.PROMOTION_OVERVIEW_PAGE_FILTERS_OR_FORMULA
  )
  const client = createClient({
    options: {
      baseURL: `${serverRuntimeConfig.cmsGraphQLHost}/spaces/${serverRuntimeConfig.cmsSpaceId}/environments/${serverRuntimeConfig.cmsEnvironmentId}`,
      headers: {
        Authorization: `Bearer ${serverRuntimeConfig.cmsToken}`
      },
      adapter: cache?.adapter
    },
    locale,
    interceptorOptions: {
      mode: 'contentful-graphql'
    }
  })

  const promotionsResponse = await client.post<{
    data: PromotionsQuery
  }>(
    '',
    removeUndefinedPropertiesFromObject({
      query: Promotions.loc?.source.body,
      variables: {
        limit: limitPromotions,
        skip: skip === undefined ? skipPromotions : parseInt(skip.toString()),
        allLocales: getAvailableLocales().map(transformLocaleToUppercase),
        locale: transformLocaleToUppercase(locale),
        where: {
          contentfulMetadata: {
            tags: {
              id_contains_all: getCountryTagFromLocale(locale)
            }
          },
          itemsToFilterBy_contains_some:
            // passing an empty array for _some results in confusing behaviour where no promos are returned!
            shouldUseOrFormula && filters && filters.length > 0
              ? filters
              : undefined,
          itemsToFilterBy_contains_all: shouldUseOrFormula
            ? undefined
            : filters,
          ...(!preview && {
            validFrom_exists: true,
            validTo_exists: true,
            validFrom_lt: dayjs().format(),
            validTo_gt: dayjs().format()
          })
        }
      }
    })
  )

  return normalizePromotionData({
    data: promotionsResponse?.data?.data?.promotionCollection ?? undefined,
    includes:
      promotionsResponse?.data?.data?.promotionCollection?.items &&
      promotionsResponse?.data?.data?.promotionCollection?.items
        .map(promotion => normalizePromotion(promotion as PromotionFragment))
        .filter((promotion): promotion is Promotion => !!promotion)
  })
}
