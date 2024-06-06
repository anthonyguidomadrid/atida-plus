import { createClient, hasOwnProperty, logger } from '~helpers'
import getConfig from 'next/config'
import { sha256 } from 'js-sha256'
import {
  ChannelPrice,
  ElasticSearchProduct,
  normalizeElasticSearchProduct
} from '~domains/product'
import {
  createElasticSearchClient,
  getElasticSearchProductIndex
} from '~domains/elasticsearch/helpers/client'
import {
  ExponeaRecommendationResponse,
  ExponeaResult,
  FetchRecommendationResponse,
  SuccessfulExponeaResult
} from '~domains/exponea/types'
import { getDefaultCustomer } from '~domains/exponea/helpers/get-default-customer'
import { getDefaultRecommendation } from '~domains/exponea/helpers/get-default-recommendation'
import { DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY } from '~config/constants/recommendations'
import { SessionChannelType } from '~domains/basket/types'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

const responseHasRecommendations = (
  result: ExponeaResult
): result is SuccessfulExponeaResult => hasOwnProperty(result, 'value')

export const fetchRecommendations = async (
  locale: string,
  cookie?: string,
  data?: {
    email?: string
    recommendationId?: string
    productId?: string
    categoryId?: string
    itemsQuantity?: number
    sessionChannel?: SessionChannelType
  }
): Promise<FetchRecommendationResponse> => {
  const { serverRuntimeConfig } = getConfig()

  const projectToken = serverRuntimeConfig.exponea.projectToken[locale]
  const apiKey = serverRuntimeConfig.exponea.apiKey[locale]
  const apiSecret = serverRuntimeConfig.exponea.apiSecret[locale]

  if (!projectToken) {
    logger.warn(`Exponea project token not available for locale: ${locale}`)
  }

  if (!apiKey) {
    logger.warn(`Exponea API key not available for locale: ${locale}`)
  }

  if (!apiSecret) {
    logger.warn(`Exponea API secret not available for locale: ${locale}`)
  }

  const auth = Buffer.from(`${apiKey}:${apiSecret}`, 'binary').toString(
    'base64'
  )

  const client = createClient({
    options: {
      headers: {
        Authorization: `Basic ${auth}`
      }
    },
    locale
  })

  const logPayload = {
    recommendationId: data?.recommendationId,
    categoryId: data?.categoryId,
    productId: data?.productId
  }

  const itemsQuantity =
    data?.itemsQuantity || DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY

  try {
    const exponeaResponse = await client.post<ExponeaRecommendationResponse>(
      `https://api.exponea.com/data/v2/projects/${projectToken}/customers/attributes`,
      {
        customer_ids: {
          email_id: data?.email
            ? sha256(data?.email.trim().toLowerCase())
            : cookie
            ? undefined
            : getDefaultCustomer(), // Identification for default recommendations when no cookie/email available
          cookie: cookie?.replace(/['"]+/g, '') ?? undefined
        },
        attributes: [
          {
            type: 'recommendation',
            // Default recommendation if the passed doesn't exist
            id: data?.recommendationId ?? getDefaultRecommendation(locale),
            fillWithRandom: true,
            size: itemsQuantity,
            catalogAttributesWhitelist: ['item_id', 'product_id'],
            items: data?.productId && { [`${data?.productId}`]: 1 },
            catalogFilter: data?.categoryId && [
              {
                property: 'web_category',
                constraint: {
                  type: 'string',
                  operator: 'contains',
                  operands: [{ type: 'constant', value: data?.categoryId }]
                }
              }
            ]
          }
        ]
      },
      { timeout: serverRuntimeConfig.exponea.timeout, baseURL: '' }
    )

    const result = exponeaResponse.data.results[0] as ExponeaResult
    const exponeaProducts = responseHasRecommendations(result)
      ? result.value
      : []

    const recommendedProducts = exponeaProducts.map(({ item_id }) => item_id)

    const isPersonalized =
      exponeaProducts.filter(
        ({ recommendation_source, engine_name }) =>
          recommendation_source === 'model_personalized' ||
          engine_name === 'Custom' // Used when we create manual selection recommendation in Exponea
      ).length > 0

    if (recommendedProducts.length === 0) {
      const error = !responseHasRecommendations(result) ? result.error : null

      if (error) {
        logger.error(
          { error, ...logPayload },
          `Exponea did not return any recommendations for ID: ${data?.recommendationId}`
        )
      } else {
        logger.info(
          logPayload,
          `Exponea did not return any recommendations for ID: ${data?.recommendationId} but did not return an error`
        )
      }

      return {
        recommendationId: data?.recommendationId,
        items: []
      }
    }

    const elasticSearchClient = createElasticSearchClient()
    const elasticSearchResponse = await elasticSearchClient.mget<{
      docs: ElasticSearchProduct[]
    }>({
      index: getElasticSearchProductIndex(locale),
      body: {
        ids: recommendedProducts
      }
    })

    const onlyFound = elasticSearchResponse.body.docs.filter(doc => doc.found)
    const items =
      onlyFound.length < 4
        ? []
        : onlyFound.length >= 4 && onlyFound.length < 6
        ? onlyFound.slice(0, 4)
        : onlyFound.length >= 6 && onlyFound.length < 8
        ? onlyFound.slice(0, 6)
        : onlyFound.length >= 8 && onlyFound.length < 12
        ? onlyFound.slice(0, 8)
        : onlyFound.slice(0, 12)

    // TODO: Remove when the prices channel on products are ready to be used
    const mockedProductPriceChannels = (await loadFeatureFlag(
      locale,
      FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_PRODUCT_PRICE_CHANNEL
    )) as { channel_prices: ChannelPrice[] }
    return {
      recommendationId: data?.recommendationId,
      isPersonalized,
      items: items.map(doc =>
        normalizeElasticSearchProduct(
          locale,
          doc,
          data?.sessionChannel,
          mockedProductPriceChannels?.channel_prices
        )
      )
    }
  } catch (error) {
    return {
      recommendationId: data?.recommendationId,
      items: []
    }
  }
}
