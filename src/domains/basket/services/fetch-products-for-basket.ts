import {
  createElasticSearchClient,
  getElasticSearchProductIndex
} from '~domains/elasticsearch/helpers/client'
import {
  ElasticSearchProduct,
  normalizeElasticSearchProduct
} from '~domains/product'
import { Basket, BasketWithProducts } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchProductsForBasket = async (
  locale: string,
  basket?: Basket
): Promise<BasketWithProducts> => {
  if (!basket || !basket?.items?.length) {
    return basket as BasketWithProducts
  }

  const client = createElasticSearchClient()
  const response = await client.mget<{ docs: ElasticSearchProduct[] }>({
    index: getElasticSearchProductIndex(locale),
    body: {
      ids: Array.from(new Set(basket.items.map(({ sku }) => sku)))
    }
  })

  const products = basket.items?.map(basketItem => {
    const doc = response?.body?.docs.find(doc => doc._id === basketItem.sku)
    const isPromo = basketItem?.isPromo
    const isFullyDiscounted = basketItem?.isFullyDiscounted
    doc && (doc.id = basketItem?.id)
    return normalizeElasticSearchProduct(
      locale,
      doc,
      undefined,
      undefined,
      isPromo,
      isFullyDiscounted
    )
  })

  return {
    ...basket,
    items: basket.items
      .map(item => ({
        ...item,
        product: products
          .filter(({ id }) => id === item.id)
          .map(({ sku, price, ...rest }) => rest)[0]
      }))
      .sort((a, b) => {
        if (a && b) {
          return (a?.product?.isOnDemand ?? 0) > (b?.product?.isOnDemand ?? 0)
            ? -1
            : 1
        }
        return 0
      })
  }
}
