import {
  createClient,
  transformLocaleToUppercase,
  getCountryTagFromLocale,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { PageFiltersQuery, PageFilters } from '~generated-graphql'
import getConfig from 'next/config'
import { cache } from '~helpers/server-only/redisClient'
import {
  normalizePageFilter,
  PageFilter
} from '~domains/contentful/normalizers/page-filter'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchPageFilter = async (
  slug: string,
  locale?: string
): Promise<PageFilter> => {
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

  const pageFiltersResponse = await client.post<{
    data: PageFiltersQuery
  }>(
    '',
    removeUndefinedPropertiesFromObject({
      query: PageFilters.loc?.source.body,
      variables: {
        locale: transformLocaleToUppercase(locale),
        tags: getCountryTagFromLocale(locale),
        slug
      }
    })
  )

  return normalizePageFilter(pageFiltersResponse?.data?.data)
}
