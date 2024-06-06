import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeBasket } from '~domains/basket'
import { Basket, SprykerBasket } from '~domains/basket/types'
import { fetchProductsForBasket } from './fetch-products-for-basket'
import { addToBasket } from './add-to-basket'
import { fetchBasket } from './fetch-basket'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const addCoupon = async (
  locale: string,
  cartId: string | string[],
  coupon: string | string[],
  user: { anonymousCustomerUniqueId?: string; token?: string }
): Promise<Basket> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: {
      baseURL: serverRuntimeConfig.ecommerceHost[locale],
      headers: user.token
        ? {
            Authorization: `Bearer ${user.token}`
          }
        : undefined
    },
    addAnonymousCustomerUniqueId: !!user.token
      ? undefined
      : user.anonymousCustomerUniqueId
  })

  const requestUrl = !!user.token
    ? `/carts/${cartId}/vouchers`
    : `/guest-carts/${cartId}/vouchers`

  const response = await client.post<SprykerBasket>(requestUrl, {
    data: {
      type: 'vouchers',
      attributes: {
        code: coupon
      }
    }
  })

  let basket = normalizeBasket(response.data)
  const availablePromotionalItems = basket?.promotionalItems?.filter(
    item => item.quantity
  )

  const hasPromotionalItemOutOfStock =
    basket.promotionalItems &&
    !!basket.promotionalItems.find(item => item.quantity === 0 && item.isNew)

  if (availablePromotionalItems && availablePromotionalItems.length > 0) {
    await addToBasket(locale, availablePromotionalItems[0], user)
    basket = await fetchBasket(locale, user)
  }

  if (hasPromotionalItemOutOfStock) {
    basket.hasPromotionalItemOutOfStock = true
  }

  return fetchProductsForBasket(locale, basket)
}
