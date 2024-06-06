import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeBasket } from '~domains/basket'
import {
  Basket,
  SprykerBasketItem,
  SprykerBaskets
} from '~domains/basket/types'
import { getBasketApiConfig } from '~domains/basket/helpers'
import { fetchProductsForBasket } from './fetch-products-for-basket'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const removeCoupon = async (
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

  const apiConfig = getBasketApiConfig(user.token)
  const deleteRequestUrl = !!user.token
    ? `/carts/${cartId}/vouchers/${coupon}`
    : `/guest-carts/${cartId}/vouchers/${coupon}`

  await client.delete(deleteRequestUrl)

  const response = await client.get<SprykerBaskets>(apiConfig.cartUrl, {
    params: {
      include: `${apiConfig.cartItemsType},promotional-items`
    }
  })
  return fetchProductsForBasket(
    locale,
    normalizeBasket({
      data: response?.data?.data?.[0],
      included: response?.data?.data?.[0]?.relationships?.[
        apiConfig.cartItemsType
      ]?.data
        .map(({ id }) =>
          response?.data?.included?.find(
            includedItem => id === includedItem?.id
          )
        )
        .filter((item): item is SprykerBasketItem => !!item)
        .concat(
          ...response?.data?.included?.filter(
            ({ type }) => type === 'promotional-items'
          )
        )
    })
  )
}
