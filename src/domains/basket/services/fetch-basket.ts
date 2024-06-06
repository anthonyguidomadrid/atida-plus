import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeBasket } from '../normalizers'
import type {
  BasketWithProducts,
  SessionChannelType,
  SprykerBasketItem,
  SprykerBaskets
} from '../types'
import { fetchProductsForBasket } from './fetch-products-for-basket'
import { getBasketApiConfig } from '../helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchBasket = async (
  locale: string,
  user: {
    anonymousCustomerUniqueId?: string
    token?: string
  }
): Promise<BasketWithProducts> => {
  const useMockedData = (await loadFeatureFlag(
    locale,
    FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_BASKET
  )) as SessionChannelType

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

  const requestUrl = `${apiConfig.cartUrl}?include=items,cart-rules,vouchers`

  const response = await client.get<SprykerBaskets>(requestUrl, {
    params: {
      include: `${apiConfig.cartItemsType},promotional-items`
    }
  })

  return fetchProductsForBasket(
    locale,
    normalizeBasket(
      {
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
      },
      useMockedData
    )
  )
}
