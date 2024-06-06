import getConfig from 'next/config'
import { BasketWithProducts } from '~domains/basket/types'
import { createClient } from '~helpers'
import { normalizeGetOrder } from '../normalizers/get-order'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const getOrder = async (
  locale: string,
  data: { orderId: string },
  user: {
    token?: string
  }
): Promise<Partial<BasketWithProducts> | undefined> => {
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

  const response = await client.get(`/orders/${data.orderId}`)
  return normalizeGetOrder(response.data)
}
