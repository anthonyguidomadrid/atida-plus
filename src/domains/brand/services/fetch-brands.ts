import {
  createClient,
  transformLocaleToUppercase,
  getCountryTagFromLocale
} from '~helpers'
import { BrandPagesQuery, BrandPages } from '~generated-graphql'
import getConfig from 'next/config'
import {
  normalizeBrandPage,
  normalizeBrandData,
  Brand,
  Brands,
  ContentfulBrand,
  normalizeBrandRest
} from '~domains/contentful/normalizers/brand'
import { cache } from '~helpers/server-only/redisClient'
import { createContentfulClient } from '~domains/contentful/helpers/client'
import { createLocalClient } from '~domains/contentful/helpers/contentful-api'
import { ContentfulPage } from '~domains/page'
import { ContentfulClientApi } from 'contentful'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import {
  getDefaultLocale,
  getAvailableLocales
} from '~domains/translated-routes'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchBrands = async (locale?: string): Promise<Brands> => {
  const useCDA = await loadFeatureFlag(
    locale,
    FeatureFlag.CONTENTFUL_FETCH_BRANDS_WITH_CDA
  )

  if (useCDA) return fetchBrandsWithCDA(locale)

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

  const brandsResponse = await client.post<{ data: BrandPagesQuery }>('', {
    query: BrandPages.loc?.source.body,
    variables: {
      allLocales: getAvailableLocales().map(transformLocaleToUppercase),
      locale: transformLocaleToUppercase(locale),
      tags: getCountryTagFromLocale(locale)
    }
  })

  return normalizeBrandData({
    data: brandsResponse?.data?.data?.pageCollection ?? undefined,
    includes:
      brandsResponse?.data?.data?.pageCollection?.items &&
      brandsResponse?.data?.data?.pageCollection?.items
        .map(page => {
          if (page?.referencedContent?.__typename === 'Brand') {
            //@ts-ignore
            return normalizeBrandPage(page?.referencedContent, page?.slug)
          }
          return
        })
        .filter((page: unknown): page is Brand => !!page)
  })
}

const PAGE_SIZE = 500

const brandFetcher = async (
  locale: string,
  client: ContentfulClientApi,
  skip = 0
) =>
  createLocalClient(client).getContentfulEntries<ContentfulPage>(
    ['page'],
    locale,
    1,
    skip,
    PAGE_SIZE,
    'pageType[in]',
    'Brand'
  )

const fetchBrandsWithCDA = async (
  locale = getDefaultLocale()
): Promise<Brands> => {
  const client = createContentfulClient()
  const response = await brandFetcher(locale, client)
  let responses = [response]

  if (response.total > PAGE_SIZE) {
    const leftToFetch = response.total - PAGE_SIZE
    const remainingPages = Math.ceil(leftToFetch / PAGE_SIZE)
    const pageRequests = new Array(remainingPages)
      .fill(0)
      .map((_value, idx) => brandFetcher(locale, client, PAGE_SIZE * (idx + 1)))
    const pageResponses = await Promise.all(pageRequests)
    responses = [response, ...pageResponses]
  }

  const items = responses.reduce((acc, curr) => {
    const currentItems = curr?.items
      ? (curr?.items
          .map(i =>
            normalizeBrandRest(
              i.fields?.referencedContent as ContentfulBrand,
              i.fields?.slug
            )
          )
          .filter(item => item) as Partial<Brand>[])
      : []
    return [...acc, ...currentItems]
  }, [] as Brand[])

  return {
    total: response.total,
    items
  }
}
