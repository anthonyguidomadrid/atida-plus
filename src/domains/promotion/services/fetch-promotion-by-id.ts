import {
  normalizePromotion,
  normalizePromotionData,
  Promos,
  Promotion
} from '~domains/contentful'
import getConfig from 'next/config'
import {
  createClient,
  getCountryTagFromLocale,
  removeUndefinedPropertiesFromObject,
  transformLocaleToUppercase
} from '~helpers'
import { cache } from '~helpers/server-only/redisClient'
import {
  PromotionById,
  PromotionByIdQuery,
  PromotionFragment
} from '~generated-graphql'
import {
  limitPromotions,
  skipPromotions
} from '~domains/promotion/slices/content'
import { getAvailableLocales } from '~domains/translated-routes'

export const fetchPromotionById = async (
  locale?: string,
  skip?: string | string[],
  id?: string
): Promise<Promos> => {
  const { serverRuntimeConfig } = getConfig()
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

  const promotionResponse = await client.post<{ data: PromotionByIdQuery }>(
    '',
    removeUndefinedPropertiesFromObject({
      query: PromotionById.loc?.source.body,
      variables: {
        limit: limitPromotions,
        skip: skip === undefined ? skipPromotions : parseInt(skip.toString()),
        allLocales: getAvailableLocales().map(transformLocaleToUppercase),
        locale: transformLocaleToUppercase(locale),
        tags: getCountryTagFromLocale(locale),
        id
      }
    })
  )

  return normalizePromotionData({
    data: promotionResponse?.data?.data?.promotionCollection ?? undefined,
    includes:
      promotionResponse?.data?.data?.promotionCollection?.items &&
      promotionResponse?.data?.data?.promotionCollection?.items
        .map(promotion => normalizePromotion(promotion as PromotionFragment))
        .filter((promotion): promotion is Promotion => !!promotion)
  })
}
