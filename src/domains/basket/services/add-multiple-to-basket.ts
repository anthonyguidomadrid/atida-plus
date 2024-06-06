import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { AddToBasketItem, SprykerBasket } from '../types'
import { getBasketApiConfig } from '../helpers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const addMultipleToBasket = async (
  locale: string,
  items: AddToBasketItem[],
  user: {
    anonymousCustomerUniqueId?: string
    token?: string
  }
): Promise<void> => {
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

  const requestUrl = `${apiConfig.cartUrl}${apiConfig.multipleCartItemsUrl}/?include=promotional-items,abstract-product,cart-rules,vouchers`

  await client.post<SprykerBasket>(requestUrl, {
    data: {
      type: apiConfig.multipleCartItemsType,
      attributes: items
    }
  })
}
