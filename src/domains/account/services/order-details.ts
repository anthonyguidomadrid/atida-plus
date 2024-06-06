import getConfig from 'next/config'
import { createClient } from '~helpers'
import type {
  OrderDetailsParams,
  OrderDetailsPayload,
  OrderDetailsSingle
} from '../types'
import {
  createElasticSearchClient,
  getElasticSearchProductIndex
} from '~domains/elasticsearch/helpers/client'
import {
  ElasticSearchProduct,
  normalizeElasticSearchProduct
} from '~domains/product'

if (typeof window !== 'undefined') {
  throw new Error('This file should not be called client-side')
}

export const orderDetails = async ({
  locale,
  accessToken,
  orderId
}: OrderDetailsParams): Promise<OrderDetailsPayload> => {
  const { serverRuntimeConfig } = getConfig()

  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] }
  })

  const { data: order } = await client.get<{ data: OrderDetailsSingle }>(
    `/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  if (order.data.attributes.items.length > 0) {
    const elasticClient = createElasticSearchClient()
    const elasticResponse = await elasticClient.mget<{
      docs: ElasticSearchProduct[]
    }>({
      index: getElasticSearchProductIndex(locale),
      body: {
        ids: Array.from(
          new Set(order?.data?.attributes?.items?.map(({ sku }) => sku))
        )
      }
    })
    const elasticData = order?.data?.attributes?.items?.map(basketItem => {
      const isPromo = basketItem?.isPromo
      const isFullyDiscounted = basketItem?.isFullyDiscounted
      basketItem.id = isPromo ? `${basketItem.sku}-promotion` : basketItem.sku
      const doc = elasticResponse?.body?.docs?.find(
        doc => doc._id === basketItem.sku
      )
      doc && (doc.id = basketItem.id)

      return normalizeElasticSearchProduct(
        locale,
        doc,
        undefined,
        undefined,
        isPromo,
        isFullyDiscounted
      )
    })

    const orderDetailsData = order?.data
    const orderDetailsAttributes = orderDetailsData?.attributes
    const items = orderDetailsAttributes?.items

    const orderItems = items?.map(item => {
      if (!elasticData) return item

      const { id: elasticDataItemId, ...elasticDataItem } =
        elasticData.find(eld => eld.id === item.id) ?? {}

      if (!elasticDataItem) return item

      return {
        ...item,
        metadata: elasticDataItem
      }
    })

    return {
      ...orderDetailsData,
      attributes: {
        ...orderDetailsAttributes,
        items: orderItems
      }
    }
  }

  const orderDetailsData = order?.data
  const orderDetailsAttributes = orderDetailsData?.attributes

  return {
    ...orderDetailsData,
    attributes: {
      ...orderDetailsAttributes,
      items: []
    }
  }
}
