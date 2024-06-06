import { useEffect } from 'react'
import {
  addFavouritesTrigger,
  removeFavouritesTrigger
} from '~domains/favourites'
import { useDispatch } from 'react-redux'

export const useHandleFavourites = (
  isLoggedIn: boolean,
  addToFavouritesIsLoading:
    | {
        sku: string
        isLoading: boolean
        isSaved: boolean
        wasSuccess: boolean
        wasError: boolean
      }[]
    | undefined,
  removeFromFavouritesIsLoading:
    | {
        sku: string
        isLoading: boolean
        isSaved: boolean
        wasSuccess: boolean
        wasError: boolean
      }[]
    | undefined
): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    addToFavouritesIsLoading?.length &&
      isLoggedIn &&
      addToFavouritesIsLoading.map(item => {
        if (
          !item?.wasSuccess &&
          !item.isLoading &&
          !item.wasError &&
          item.isSaved
        ) {
          dispatch(addFavouritesTrigger({ sku: item.sku }))
        }
      })
  }, [dispatch, addToFavouritesIsLoading, isLoggedIn])

  useEffect(() => {
    removeFromFavouritesIsLoading?.length &&
      isLoggedIn &&
      removeFromFavouritesIsLoading.map(item => {
        if (
          !item?.wasSuccess &&
          !item.isLoading &&
          !item.wasError &&
          item.isSaved
        ) {
          dispatch(removeFavouritesTrigger({ sku: item.sku }))
        }
      })
  }, [dispatch, removeFromFavouritesIsLoading, isLoggedIn])
}
