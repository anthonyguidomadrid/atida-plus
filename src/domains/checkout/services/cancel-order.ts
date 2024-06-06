import getConfig from 'next/config'
import { createClient } from '~helpers'
import { CancelOrderPayload } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const cancelOrder = (
  locale: string,
  data: CancelOrderPayload,
  user: {
    token?: string
  }
): void => {
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

  client.delete(`/orders/${data.orderId}`)
}
