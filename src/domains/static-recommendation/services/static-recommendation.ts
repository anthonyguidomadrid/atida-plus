import {
  ChannelPrice,
  ElasticSearchProduct,
  normalizeElasticSearchMinimalProduct,
  Product
} from '~domains/product'
import {
  createElasticSearchClient,
  getElasticSearchProductIndex
} from '~domains/elasticsearch/helpers/client'
import {
  FetchStaticRecommendation,
  FetchStaticRecommendationTriggerPayload
} from '../types'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchStaticRecommendation = async (
  locale: string,
  data: FetchStaticRecommendationTriggerPayload
): Promise<FetchStaticRecommendation[]> => {
  let skus: Partial<Product>[] = []

  data?.list?.map(value => {
    skus = [...skus, ...value.products]
  })

  skus = skus.filter((value, index, self) => self.indexOf(value) === index)

  try {
    // TODO: Remove when the price channels on products are ready to be used
    const mockedProductPriceChannels = (await loadFeatureFlag(
      locale,
      FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_PRODUCT_PRICE_CHANNEL
    )) as { channel_prices: ChannelPrice[] }
    const elasticSearchClient = createElasticSearchClient()
    const elasticSearchResponse = await elasticSearchClient.mget<{
      docs: ElasticSearchProduct[]
    }>({
      index: getElasticSearchProductIndex(locale),
      body: {
        ids: skus
      }
    })

    const items = elasticSearchResponse.body.docs.filter(doc => doc.found)

    const elasticData = data?.list?.reduce<FetchStaticRecommendation[]>(
      (previousValue, currentValue) => {
        const { products } = currentValue
        const filteredItems = items.filter(item =>
          (products as string[]).includes(item._id)
        )
        return [
          ...previousValue,
          {
            ...currentValue,
            products: filteredItems.map(item =>
              normalizeElasticSearchMinimalProduct(
                locale,
                item,
                data?.sessionChannel,
                mockedProductPriceChannels?.channel_prices
              )
            )
          }
        ]
      },
      []
    )

    return elasticData
  } catch (error) {
    return data.list
  }
}
