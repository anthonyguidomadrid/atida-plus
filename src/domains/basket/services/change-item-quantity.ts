import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { ChangeItemQuantity, Basket, SprykerBasket } from '../types'
import { normalizeBasket } from '../normalizers'
import { getBasketApiConfig } from '../helpers'
import { fetchProductsForBasket } from './fetch-products-for-basket'
import { addToBasket } from './add-to-basket'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const changeItemQuantity = async (
  locale: string,
  item: ChangeItemQuantity & { basketId: string },
  user: {
    anonymousCustomerUniqueId?: string
    token?: string
  }
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
    addAnonymousCustomerUniqueId: user.token
      ? undefined
      : user.anonymousCustomerUniqueId
  })

  const apiConfig = getBasketApiConfig(user.token)

  const response = await client.patch<SprykerBasket>(
    `${apiConfig.cartUrl}/${item?.basketId}${apiConfig.cartItemsUrl}/${item?.id}`,
    {
      data: {
        type: apiConfig.cartItemsType,
        attributes: item
      }
    }
  )

  let basket = await normalizeBasket(response.data)

  if (
    basket?.promotionalItems &&
    basket?.items &&
    basket?.promotionalItems?.length > 0 &&
    !basket?.items?.find(
      basketItem =>
        basket?.promotionalItems &&
        basketItem?.sku === basket?.promotionalItems[0]?.sku &&
        basketItem?.isPromo
    )
  ) {
    // Handling available promotional items
    const availablePromotionalItems = basket.promotionalItems.filter(
      promoItem => promoItem.quantity > 0
    )
    if (
      availablePromotionalItems.length > 0 &&
      !availablePromotionalItems[0].userDeclined
    ) {
      const promotionalItem = availablePromotionalItems[0]
      basket = await addToBasket(locale, promotionalItem, user)
      const currentItem = basket.items?.find(
        cartItem => cartItem.sku === item.sku && !cartItem.isPromo
      )
      if (currentItem) {
        currentItem.hasPromotionalItemOnQuantityChange = true
        currentItem.gift = {
          sku: promotionalItem.sku,
          quantity: promotionalItem.quantity
        }
      }
    }
    // Handling out-of-stock promotional items
    const hasPromotionalItemOutOfStock =
      basket.promotionalItems &&
      !!basket.promotionalItems.find(item => item.quantity === 0 && item.isNew)

    if (hasPromotionalItemOutOfStock) {
      const currentItem = basket.items?.find(
        cartItem => cartItem.sku === item.sku
      )
      if (currentItem) {
        currentItem.hasPromotionalItemOutofStock = true
      }
    }
  }
  return fetchProductsForBasket(locale, basket)
}
