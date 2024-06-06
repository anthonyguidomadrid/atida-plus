import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeBasket } from '../normalizers'
import type {
  RemoveBasketItem,
  Basket,
  SprykerBaskets,
  SprykerBasketItem
} from '../types'
import { getBasketApiConfig } from '../helpers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const removeFromBasket = async (
  locale: string,
  item: RemoveBasketItem & { basketId: string },
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

  await client.delete(
    `${apiConfig.cartUrl}/${item?.basketId}${apiConfig.cartItemsUrl}/${item?.id}`
  )

  const response = await client.get<SprykerBaskets>(apiConfig.cartUrl, {
    params: {
      include: `${apiConfig.cartItemsType},promotional-items`
    }
  })

  return normalizeBasket({
    data: response?.data?.data?.[0],
    included: response?.data?.data?.[0]?.relationships?.[
      apiConfig.cartItemsType
    ]?.data
      .map(({ id }) =>
        response?.data?.included?.find(includedItem => id === includedItem?.id)
      )
      .filter((item): item is SprykerBasketItem => !!item)
      .concat(
        ...response?.data?.included?.filter(
          ({ type }) => type === 'promotional-items'
        )
      )
  })
}
