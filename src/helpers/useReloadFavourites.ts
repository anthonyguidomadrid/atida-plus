import { useEffect } from 'react'
import { addFavouritesSave } from '~domains/favourites'
import { useDispatch } from 'react-redux'

export const useReloadFavourites = (
  isLoggedIn: boolean,
  isGuestFavouritesEnabled: boolean,
  guestFavouritesItems: string[],
  storedFavouritesItems: string[] | undefined,
  addToFavouritesIsLoading:
    | {
        sku: string
        isLoading: boolean
        isSaved: boolean
        wasSuccess: boolean
        wasError: boolean
      }[]
    | undefined,
  storedFavouritesItemsLoaded: boolean
): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    /* Save add to states on page reload when guest customer is enabled to make sure the customer didn't lose anything from Redux before calling the endpoint when logged in */
    if (
      !isLoggedIn &&
      isGuestFavouritesEnabled &&
      guestFavouritesItems?.length &&
      !addToFavouritesIsLoading?.length
    ) {
      guestFavouritesItems.map(sku => {
        dispatch(addFavouritesSave({ sku }))
      })
    }
    // If guestFavouritesItems is included in the dependency array it causes infinite loop on the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoggedIn, isGuestFavouritesEnabled, addToFavouritesIsLoading])

  useEffect(() => {
    /* Save add to states when page is refreshed for logged in user - example: social login redirect */
    if (
      isLoggedIn &&
      guestFavouritesItems?.length &&
      storedFavouritesItemsLoaded
    ) {
      const itemsToAdd = storedFavouritesItems?.length
        ? guestFavouritesItems.filter(
            sku => !storedFavouritesItems.includes(sku)
          )
        : guestFavouritesItems

      if (itemsToAdd?.length) {
        itemsToAdd.forEach(sku => {
          dispatch(addFavouritesSave({ sku }))
        })
      }
    }
    // If guestFavouritesItems is included in the dependency array it causes infinite loop on the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoggedIn, storedFavouritesItems, storedFavouritesItemsLoaded])
}
