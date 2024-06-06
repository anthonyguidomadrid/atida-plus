import { createClient, logger, transformLocaleToUppercase } from '~helpers'
import { ExponeaRecommendationsCollectionQuery } from '~generated-graphql'
import getConfig from 'next/config'
import {
  ContentfulFetchAllRecommendationsResponse,
  FetchAllRecommendationsResponse
} from '~domains/exponea/types'
import { cache } from '~helpers/server-only/redisClient'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchAllRecommendations = async (
  locale: string,
  type: string
): Promise<FetchAllRecommendationsResponse> => {
  try {
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

    const allRecommendationsResponse = await client.post<ContentfulFetchAllRecommendationsResponse>(
      '',
      {
        query: ExponeaRecommendationsCollectionQuery.loc?.source.body,
        variables: {
          locale: transformLocaleToUppercase(locale),
          type
        }
      }
    )
    return allRecommendationsResponse?.data?.data
      ?.exponeaRecommendationCollection?.items
      ? allRecommendationsResponse?.data?.data?.exponeaRecommendationCollection
      : {
          items: []
        }
  } catch (error) {
    logger.error(
      { error },
      `Unable to fetch the ExponeaRecommendationBlocks of contentful with type ${type}`
    )
    return {
      items: []
    }
  }
}
