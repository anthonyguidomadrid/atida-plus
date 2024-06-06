import {
  createClient,
  transformLocaleToUppercase,
  getCountryTagFromLocale
} from '~helpers'
import getConfig from 'next/config'
import {
  createElasticSearchClient,
  getElasticSearchProductIndex
} from '~domains/elasticsearch/helpers/client'
import { normalizeElasticSearchProduct } from '../normalizers'
import {
  Product,
  ElasticSearchProduct,
  GetElasticSearchProductPayload,
  ChannelPrice
} from '../types'
import { cache } from '~helpers/server-only/redisClient'
import { ProductBrandQuery, ProductBrand } from '~generated-graphql'
import { getAvailableLocales } from '~domains/translated-routes'
import { AxiosResponse } from 'axios'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

const { serverRuntimeConfig } = getConfig()
const client = createElasticSearchClient()

const normalizeProductBrandResponse = (
  response: AxiosResponse<{
    data: ProductBrandQuery
  }>
): string =>
  response?.data?.data?.brandCollection?.items?.[0]?.linkedFrom?.pageCollection
    ?.items?.[0]?.slug ?? ''

const fetchProductBrand = async (locale: string, brand: string) => {
  const contentfulClient = createClient({
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
  const contentfulResponse = await contentfulClient.post<{
    data: ProductBrandQuery
  }>('', {
    query: ProductBrand.loc?.source.body,
    variables: {
      id: brand,
      allLocales: getAvailableLocales().map(transformLocaleToUppercase),
      locale: transformLocaleToUppercase(locale),
      tags: getCountryTagFromLocale(locale)
    }
  })

  return normalizeProductBrandResponse(contentfulResponse)
}

export const fetchProduct = async (
  locale: string,
  data: GetElasticSearchProductPayload
): Promise<Partial<Product>> => {
  const fetchSingleBrand = await loadFeatureFlag(
    locale,
    FeatureFlag.PRODUCT_PDP_FETCH_SINGLE_BRAND
  )
  // TODO: Remove when the price channels on products are ready to be used
  const mockedProductPriceChannels = (await loadFeatureFlag(
    locale,
    FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_PRODUCT_PRICE_CHANNEL
  )) as { channel_prices: ChannelPrice[] }

  const response = await client.get<ElasticSearchProduct>({
    index: getElasticSearchProductIndex(locale),
    id: data?.sku ?? ''
  })
  const product = normalizeElasticSearchProduct(
    locale,
    response.body,
    data?.sessionChannel,
    mockedProductPriceChannels?.channel_prices
  )

  if (fetchSingleBrand && product?.brand?.code) {
    const brandUrl = await fetchProductBrand(locale, product?.brand?.code)
    return { ...product, brandUrl }
  }

  return product
}
