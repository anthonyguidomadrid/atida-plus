import { SessionChannelType } from '~domains/basket/types'
import { Product } from '~domains/product/types'

export type SprykerFavouritesResponse = {
  data: {
    type: string
    id: string
    attributes: {
      name: string
      numberOfItems: number
      createdAt: string
      updatedAt: string
    }
    links: {
      self: string
    }
    relationships: {
      'wishlist-items': {
        data: {
          type: string
          id: string
        }[]
      }
    }
  }[]
  links: { self: string }
  included: {
    type: string
    id: string
    attributes: { sku: string }
    links: { self: string }
  }[]
}

export type GetFavouritesResponse = {
  id?: string
  items?: string[]
  products?: FavouritesWithProducts
}

export type FavouritesItemsIdsPayload = {
  skus: FavouritesItemsIds
  sessionChannel?: SessionChannelType
}

export type FavouritesItemsIds = string[]

export type FavouritesWithProducts = Partial<Product>[] | undefined

export type favouritesProductState = {
  sku: string
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
}
