import getConfig from 'next/config'
import { normalizeBasket } from '~domains/basket'
import { fetchProductsForBasket } from '~domains/basket/services/fetch-products-for-basket'
import { SprykerBasketItem } from '~domains/basket/types'
import { createClient } from '~helpers'
import { normalizeCheckoutData } from '../normalizers/checkout-data'
import type {
  CheckoutData,
  SprykerCheckoutData,
  SprykerIncludedBasket
} from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const setCheckoutData = async (
  locale: string,
  data: CheckoutData,
  user: {
    token?: string
  }
): Promise<CheckoutData> => {
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
    }
  })

  const response = await client.post<SprykerCheckoutData>('/checkout-data', {
    data: {
      type: 'checkout-data',
      attributes: {
        ...(data?.taxReference && { taxReference: data?.taxReference }),
        customer: data.customer,
        billingAddress: data.billingAddress,
        shippingAddress: data.deliveryAddress,
        shipment: data.deliveryMethod
          ? {
              idShipmentMethod: Number(data.deliveryMethod)
            }
          : null,
        paymentMethod: data?.paymentMethods,
        payments: data?.payments
      }
    }
  })

  return {
    ...normalizeCheckoutData(response.data, data),
    basket: await fetchProductsForBasket(
      locale,
      normalizeBasket({
        data: response.data.included.find(
          (item): item is SprykerIncludedBasket => item.type === 'carts'
        ),
        included: response.data.included.filter(
          (item): item is SprykerBasketItem => item.type === 'items'
        )
      })
    )
  }
}
