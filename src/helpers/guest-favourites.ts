import { cookieStorageMechanism } from '~helpers/storage'
import { getGuestFavouritesName } from '~domains/account'
import { FavouritesItemsIds } from '~domains/favourites/types'

export const getGuestFavouritesItems = () => {
  const guestFavouritesCookie = cookieStorageMechanism().get(
    getGuestFavouritesName()
  )

  let guestFavouritesItems: FavouritesItemsIds = []

  try {
    guestFavouritesItems = guestFavouritesCookie
      ? JSON.parse(guestFavouritesCookie)
      : []
  } catch {}

  return guestFavouritesItems
}
