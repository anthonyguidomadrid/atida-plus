import getConfig from 'next/config'

import { createClient } from '~helpers'

import type { Basket, SprykerBasket } from '../types'
import { normalizeBasket } from '../normalizers'
import { getBasketApiConfig } from '../helpers'
import { fetchProductsForBasket } from './fetch-products-for-basket'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const addPrescriptionToBasket = async (
  locale: string,
  user: {
    anonymousCustomerUniqueId?: string
    token?: string
  },
  prescriptionToken?: string | string[],
  cartId?: string
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
    ? `${apiConfig.cartUrl}/${cartId}/prescription-tokens?include=items,promotional-items,abstract-product,cart-rules,vouchers`
    : apiConfig.cartUrl
  const response = await client.post<SprykerBasket>(requestUrl, {
    data: {
      type: 'prescription-tokens',
      attributes: {
        tokens: Array.isArray(prescriptionToken)
          ? prescriptionToken
          : [prescriptionToken]
      }
    }
  })

  const basket = normalizeBasket(response.data)

  const productsInBasket = await fetchProductsForBasket(locale, basket)

  return productsInBasket
}
