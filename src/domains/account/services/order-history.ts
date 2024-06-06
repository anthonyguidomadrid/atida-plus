import getConfig from 'next/config'
import { createClient } from '~helpers'
import {
  createElasticSearchClient,
  getElasticSearchProductIndex
} from '~domains/elasticsearch/helpers/client'
import {
  ElasticSearchProduct,
  normalizeElasticSearchProduct
} from '~domains/product'
import {
  OrderHistoryParams,
  OrderHistoryResponse,
  OrderItem,
  OrdersPayload
} from '../types'
import type { DateTimeFormat } from '~helpers'
if (typeof window !== 'undefined') {
  throw new Error('This file should not be called client-side')
}
export const orderHistory = async ({
  locale,
  accessToken,
  params
}: OrderHistoryParams): Promise<OrderHistoryResponse> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] }
  })
  const pageLimit = 5
  /**
    We substract 1 to calculate properly the pageOffset:
      page = 1
      pageOffset = (1 - 1) * 5 = 0   --->  get orders between positions 0 to 5
      page = 2
      pageOffset = (2 - 1) * 5 = 5   --->  get orders between positions 5 to 10
      page = 3
      pageOffset = (3 - 1) * 5 = 10  --->  get orders between positions 10 to 15
      ...
  **/
  const pageOffset = params?.page ? (params.page - 1) * pageLimit : 0
  const response = await client.get<OrdersPayload>('/orders', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      'page[limit]': pageLimit,
      'page[offset]': pageOffset,
      sort: params?.sort ?? '-created_at'
    }
  })
  const { data, links } = response.data
  if (data?.length === 0 || !data) {
    return { data, links }
  }
  const ordersWithItems = data.filter(item => item.attributes.items.length > 0)
  const ordersWithoutItems = data.filter(
    item => item.attributes.items.length === 0
  )

  if (ordersWithItems.length > 0) {
    const elasticClient = createElasticSearchClient()
    const elasticResponse = await elasticClient.mget<{
      docs: ElasticSearchProduct[]
    }>({
      index: getElasticSearchProductIndex(locale),
      body: {
        ids: Array.from(
          new Set(
            ordersWithItems.reduce<string[]>(
              (memo, item) =>
                memo.concat(item.attributes.items.map(i => i.sku)),
              []
            )
          )
        )
      }
    })
    const elasticData = ordersWithItems
      .reduce<OrderItem[]>(
        (memo, { attributes: { items } }) => [...memo, ...items],
        []
      )
      .map(item => {
        const doc = elasticResponse?.body?.docs?.find(
          doc => doc._id === item.sku
        )
        const isPromo = item.isPromo
        item.id = isPromo ? `${item.sku}-promotion` : item.sku
        doc && (doc.id = item.id)
        return normalizeElasticSearchProduct(
          locale,
          doc,
          undefined,
          undefined,
          isPromo
        )
      })
    const history = [...ordersWithItems, ...ordersWithoutItems]
      .map(oh => {
        if (!elasticData) return oh
        const {
          attributes: { items, ...otherAttributes },
          ...properties
        } = oh
        const itemsWithMetadata = items.map(item => {
          const { id } = item
          const { sku: elasticDataItemSku, ...elasticDataItem } =
            elasticData.find(eld => eld.id === id) ?? {}
          if (elasticDataItem) {
            return {
              ...item,
              metadata: elasticDataItem
            }
          }
          return item
        })
        return {
          ...properties,
          attributes: {
            items: itemsWithMetadata,
            ...otherAttributes
          }
        }
      })
      .reduce((memo, item) => {
        const dateTimeFormat: DateTimeFormat = {
          dateStyle: 'long'
        }
        const date = Intl.DateTimeFormat(locale, dateTimeFormat).format(
          new Date(item.attributes.createdAt)
        )
        const memoItems = memo.find(
          // @ts-ignore TODO: this needs typing, I don't understand it well enough
          m => m.date === date && Array.isArray(m.orderHistory)
        )
        if (memoItems) {
          // @ts-ignore TODO: this needs typing, I don't understand it well enough
          memoItems.orderHistory.push(item)
        } else {
          memo.push({
            // @ts-ignore TODO: this needs typing, I don't understand it well enough
            date,
            // @ts-ignore TODO: this needs typing, I don't understand it well enough
            unFormattedDate: item.attributes.createdAt,
            // @ts-ignore TODO: this needs typing, I don't understand it well enough
            orderHistory: [item]
          })
        }
        return memo
      }, [])

    return { data: history, links }
  }

  return {
    data: ordersWithoutItems.reduce((memo, item) => {
      const dateTimeFormat: DateTimeFormat = {
        dateStyle: 'long'
      }
      const date = Intl.DateTimeFormat(locale, dateTimeFormat).format(
        new Date(item.attributes.createdAt)
      )
      const memoItems = memo.find(
        // @ts-ignore TODO: this needs typing, I don't understand it well enough
        m => m.date === date && Array.isArray(m.orderHistory)
      )
      if (memoItems) {
        // @ts-ignore TODO: this needs typing, I don't understand it well enough
        memoItems.orderHistory.push(item)
      } else {
        memo.push({
          // @ts-ignore TODO: this needs typing, I don't understand it well enough
          date,
          // @ts-ignore TODO: this needs typing, I don't understand it well enough
          unFormattedDate: item.attributes.createdAt,
          // @ts-ignore TODO: this needs typing, I don't understand it well enough
          orderHistory: [item]
        })
      }
      return memo
    }, []),
    links
  }
}
