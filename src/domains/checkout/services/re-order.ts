import getConfig from 'next/config'
import { createClient } from '~helpers'
import { Basket } from '~domains/basket/types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const reOrder = async (
  locale: string,
  data: {
    orderId: string
  },
  user: {
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
    }
  })

  const response = await client.post(`/orders/${data.orderId}/reorder`, {
    data: { type: 'reorder', attributes: {} }
  })
  return response.data
}
