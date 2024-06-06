import getConfig from 'next/config'
import { createClient } from '~helpers'
import { normalizeCreatedOrder } from '../normalizers/create-order'
import type { CheckoutData, SprykerCheckout } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const setCreateOrder = async (
  locale: string,
  data: CheckoutData & {
    basketId: string
    segmentAnonymousUserId?: string
    clientID?: string
    invoiceRequired?: boolean
  },
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

  const response = await client.post<SprykerCheckout>('/checkout', {
    data: {
      type: 'checkout',
      attributes: {
        customer: data.customer,
        idCart: data.basketId,
        billingAddress: data.billingAddress,
        shippingAddress: data.deliveryAddress,
        shipment: {
          idShipmentMethod: Number(data.deliveryMethod)
        },
        ...(data?.taxReference && { taxReference: data?.taxReference }),
        payments: data.payments,
        segmentAnonymousUserId: data.segmentAnonymousUserId,
        clientID: data.clientID && data.clientID.slice(6, data.clientID.length),
        ...(data?.invoiceRequired && { invoiceRequired: data?.invoiceRequired })
      }
    }
  })

  return normalizeCreatedOrder(response.data)
}
