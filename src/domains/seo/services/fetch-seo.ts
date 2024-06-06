import {
  createClient,
  getCountryTagFromLocale,
  transformLocaleToUppercase
} from '~helpers'
import { SeoBlock, SeoFragment } from '~generated-graphql'
import getConfig from 'next/config'
import { normalizeSeo, Seo } from '~domains/contentful'
import { cache } from '~helpers/server-only/redisClient'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export type SeoBlockApiResponse = {
  data: {
    seoCollection: {
      items: Partial<Seo>[]
    }
  }
}

export const fetchSeoBlock = async (
  locale: string,
  slug: string
): Promise<Partial<Seo> | undefined> => {
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

  const seoBlockResponse = await client.post<SeoBlockApiResponse>('', {
    query: SeoBlock.loc?.source.body,
    variables: {
      locale: transformLocaleToUppercase(locale),
      tags: getCountryTagFromLocale(locale),
      slug
    }
  })

  return normalizeSeo(
    (seoBlockResponse?.data?.data?.seoCollection?.items[0] as SeoFragment) ??
      undefined
  )
}
