import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

const selectFavourites = (state: RootState) => state?.client?.favourites

export const selectFavouriteProducts = createSelector(
  selectFavourites,
  favouriteProducts => favouriteProducts?.get?.favouritesList?.products
)
export const selectFavouritesItems = createSelector(
  selectFavourites,
  favouriteItems => favouriteItems?.get?.favouritesList?.items
)
export const selectForceRefresh = createSelector(
  selectFavourites,
  favouriteItems => favouriteItems?.get?.forceRefresh
)
export const selectAddFavouritesIsLoading = createSelector(
  selectFavourites,
  favouriteProducts => favouriteProducts?.add?.isLoading
)
export const selectFavouritesWasError = createSelector(
  selectFavourites,
  favouriteProducts => favouriteProducts?.get?.wasError
)
export const selectFavouritesWasSuccess = createSelector(
  selectFavourites,
  favouriteProducts => favouriteProducts?.get?.wasSuccess
)
export const selectFavouritesListId = createSelector(
  selectFavourites,
  favouriteProducts => favouriteProducts?.get?.favouritesList?.id
)
export const selectGetFavouritesItemsLoading = createSelector(
  selectFavourites,
  favouriteProducts => favouriteProducts?.get?.isLoading
)
export const selectGetFavouritesItemsLoaded = createSelector(
  selectFavourites,
  favouriteProducts =>
    favouriteProducts?.get?.wasSuccess &&
    !favouriteProducts?.get?.wasError &&
    !favouriteProducts?.get?.isLoading
)
export const selectGetFavouritesProductsLoaded = createSelector(
  selectFavourites,
  favouriteProducts =>
    favouriteProducts?.get?.wasProductsSuccess &&
    !favouriteProducts?.get?.wasProductsError &&
    !favouriteProducts?.get?.isProductsLoading
)
export const selectFavouritesProductsWasError = createSelector(
  selectFavourites,
  favouriteProducts => favouriteProducts?.get?.wasProductsError
)
export const selectFavouriteProductsCount = createSelector(
  selectFavouriteProducts,
  favouriteProducts => favouriteProducts?.filter(p => p?.enabled).length || 0
)

export const selectAddToFavouritesItems = createSelector(
  selectFavourites,
  addFavouriteProducts => addFavouriteProducts?.add?.items
)
export const selectRemoveFromFavouritesItems = createSelector(
  selectFavourites,
  removeFavouriteProducts => removeFavouriteProducts?.remove?.items
)
