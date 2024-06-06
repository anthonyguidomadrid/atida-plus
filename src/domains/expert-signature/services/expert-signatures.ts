import { createClient, logger, transformLocaleToUppercase } from '~helpers'
import { ExpertSignaturesCollectionQuery } from '~generated-graphql'
import getConfig from 'next/config'
import { cache } from '~helpers/server-only/redisClient'
import { ExpertSignatures, ExpertSignatureResponse } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchExpertSignatures = async (
  locale: string,
  categoryId: string
): Promise<ExpertSignatures> => {
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
      locale: transformLocaleToUppercase(locale),
      interceptorOptions: {
        mode: 'contentful-graphql'
      }
    })
    const expertSignaturesResponse = await client.post<ExpertSignatureResponse>(
      '',
      {
        query: ExpertSignaturesCollectionQuery.loc?.source.body,
        variables: {
          locale: transformLocaleToUppercase(locale),
          categoryId
        }
      }
    )

    return expertSignaturesResponse?.data?.data?.expertSignatureCollection
      ?.items
      ? expertSignaturesResponse?.data?.data?.expertSignatureCollection
      : { items: [] }
  } catch (error) {
    logger.error(
      { error },
      `Unable to fetch the ExpertSignatures of contentful with categoryId ${categoryId}`
    )
    return {
      items: []
    }
  }
}
