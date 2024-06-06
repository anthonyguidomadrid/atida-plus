import getConfig from 'next/config'
import { createClient } from '~helpers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const addFavourites = async (
  locale: string,
  user: {
    token?: string
  },
  data: { sku: string }
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
    }
  })

  await client.post('add-to-wishlist', {
    data: {
      type: 'add-to-wishlist',
      attributes: { items: [{ sku: data.sku, isNew: true }] }
    }
  })
}
