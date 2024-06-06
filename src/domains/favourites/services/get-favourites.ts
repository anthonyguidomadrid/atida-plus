import getConfig from 'next/config'
import { createClient } from '~helpers'
import {
  GetFavouritesResponse,
  SprykerFavouritesResponse
} from '~domains/favourites/types'
import { normalizeGetFavourites } from '~domains/favourites/normalizers/get-favourites'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const getFavourites = async (
  locale: string,
  user: {
    token?: string
  }
): Promise<GetFavouritesResponse> => {
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

  const response = await client.get<SprykerFavouritesResponse>(`wishlists`)

  return normalizeGetFavourites(response.data)
}
