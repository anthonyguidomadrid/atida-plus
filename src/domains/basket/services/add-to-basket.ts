import getConfig from 'next/config'
import { createClient, removeUndefinedPropertiesFromObject } from '~helpers'
import { normalizeBasket } from '../normalizers'
import type { AddToBasketItem, Basket, SprykerBasket } from '../types'
import { fetchProductsForBasket } from './fetch-products-for-basket'
import { getBasketApiConfig } from '../helpers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const addToBasket = async (
  locale: string,
  item: AddToBasketItem,
  user: {
    anonymousCustomerUniqueId?: string
    token?: string
  },
  parentItemSku?: string
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

  const requestUrl = user.token
    ? `${apiConfig.cartUrl}/${apiConfig.cartItemsUrl}/?include=promotional-items,abstract-product,cart-rules,vouchers`
    : apiConfig.cartItemsUrl

  const response = await client.post<SprykerBasket>(requestUrl, {
    data: {
      type: apiConfig.cartItemsType,
      attributes: item
    }
  })

  const basket = normalizeBasket(response.data)
  if (
    basket?.promotionalItems &&
    basket?.promotionalItems?.length > 0 &&
    basket?.items &&
    !basket?.items?.find(
      item =>
        basket?.promotionalItems &&
        item?.sku === basket?.promotionalItems[0]?.sku &&
        item?.isPromo
    )
  ) {
    const availablePromotionalItems = basket.promotionalItems.filter(
      item => item.quantity > 0
    )

    if (
      availablePromotionalItems.length > 0 &&
      !availablePromotionalItems[0].userDeclined
    ) {
      return addToBasket(
        locale,
        availablePromotionalItems[0],
        user,
        parentItemSku ? parentItemSku : item?.sku
      )
    }
  }
  const productsInBasket = await fetchProductsForBasket(locale, basket)

  let parentItem = basket.items?.find(item => item.sku === parentItemSku)
  let currentItem = basket.items?.find(cartItem => cartItem.sku === item.sku)
  const currentProduct = productsInBasket.items.find(
    product => product.sku === item.sku
  )

  const hasPromotionalItemOutOfStock =
    basket.promotionalItems &&
    !!basket.promotionalItems.find(item => item.quantity === 0 && item.isNew)
  if (parentItemSku && parentItem) {
    parentItem = {
      ...parentItem,
      hasPromotionalItem: currentProduct?.product?.notForSaleType !== 'sample',
      gift: {
        sku: item.sku,
        quantity: item.quantity
      }
    }
    currentItem = {
      ...currentItem,
      family: currentProduct?.product?.family,
      notForSaleType: currentProduct?.product.notForSaleType
    }
  }

  if (hasPromotionalItemOutOfStock && currentItem) {
    parentItem
      ? (parentItem = { ...parentItem, hasPromotionalItemOutofStock: true })
      : (currentItem = { ...currentItem, hasPromotionalItemOutofStock: true })
  }

  return {
    ...productsInBasket,
    items: productsInBasket?.items?.map(item => {
      if (item.sku === parentItem?.sku) {
        return removeUndefinedPropertiesFromObject({
          ...item,
          hasPromotionalItem: !!parentItem?.hasPromotionalItem,
          gift: parentItem?.gift,
          hasPromotionalItemOutofStock: !!parentItem?.hasPromotionalItemOutofStock
        })
      }
      if (item.sku === currentItem?.sku) {
        return removeUndefinedPropertiesFromObject({
          ...item,
          hasPromotionalItem: !!currentItem?.hasPromotionalItem,
          hasPromotionalItemOutofStock: !!currentItem?.hasPromotionalItemOutofStock,
          family: currentProduct?.product?.family,
          notForSaleType: currentProduct?.product.notForSaleType
        })
      }

      return item
    })
  }
}
