import getConfig from 'next/config'
import { createClient } from '~helpers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const removeFavourites = async (
  locale: string,
  user: {
    token?: string
  },
  data: { sku: string; favouritesListId: string }
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

  await client.delete(
    `wishlists/${data.favouritesListId}/wishlist-items/${data.sku}`
  )
}
