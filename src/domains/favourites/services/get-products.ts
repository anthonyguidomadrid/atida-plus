import { FeatureFlag } from '~config/constants/feature-flags'
import {
  createElasticSearchClient,
  getElasticSearchProductIndex
} from '~domains/elasticsearch/helpers/client'
import {
  ChannelPrice,
  ElasticSearchProduct,
  normalizeElasticSearchProduct
} from '~domains/product'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { FavouritesWithProducts, FavouritesItemsIdsPayload } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const getProducts = async (
  locale: string,
  data?: FavouritesItemsIdsPayload
): Promise<FavouritesWithProducts> => {
  if (!data?.skus?.length) {
    return data as FavouritesWithProducts
  }
  // TODO: Remove when the price channels on products are ready to be used
  const mockedProductPriceChannels = (await loadFeatureFlag(
    locale,
    FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_PRODUCT_PRICE_CHANNEL
  )) as { channel_prices: ChannelPrice[] }

  const client = createElasticSearchClient()
  const response = await client.mget<{ docs: ElasticSearchProduct[] }>({
    index: getElasticSearchProductIndex(locale),
    body: {
      ids: data.skus.map(item => item)
    }
  })

  const products = response?.body?.docs?.map(doc =>
    normalizeElasticSearchProduct(
      locale,
      doc,
      data.sessionChannel,
      mockedProductPriceChannels?.channel_prices
    )
  )

  return products?.length ? products : []
}
