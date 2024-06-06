import { combineReducers } from '@reduxjs/toolkit'
import { getFavouritesSlice } from './get-favourites'
import { addFavouritesSlice } from './add-favourites'
import { removeFavouritesSlice } from './remove-favourites'

export const favouritesReducer = combineReducers({
  get: getFavouritesSlice.reducer,
  add: addFavouritesSlice.reducer,
  remove: removeFavouritesSlice.reducer
})

export const {
  trigger: getFavouritesTrigger,
  forceRefresh: forceRefreshTrigger,
  request: getFavouritesRequest,
  success: getFavouritesSuccess,
  failure: getFavouritesFailure,
  fulfill: getFavouritesFulfill,
  getProductsTrigger: getFavouritesProductsTrigger,
  getProductsSuccess: getFavouritesProductsSuccess,
  getProductsFailure: getFavouritesProductsFailure,
  resetProducts: resetProducts,
  addItem: getFavouritesAddItem,
  removeItem: getFavouritesRemoveItem
} = getFavouritesSlice.actions

export const {
  save: addFavouritesSave,
  trigger: addFavouritesTrigger,
  request: addFavouritesRequest,
  success: addFavouritesSuccess,
  failure: addFavouritesFailure,
  fulfill: addFavouritesFulfill,
  itemIsLoading: addItemIsLoading,
  itemIsSaved: addItemIsSaved,
  itemWasSuccess: addItemWasSuccess,
  itemWasError: addItemWasError
} = addFavouritesSlice.actions

export const {
  save: removeFavouritesSave,
  trigger: removeFavouritesTrigger,
  request: removeFavouritesRequest,
  success: removeFavouritesSuccess,
  failure: removeFavouritesFailure,
  fulfill: removeFavouritesFulfill,
  itemIsLoading: removeItemIsLoading,
  itemIsSaved: removeItemIsSaved,
  itemWasSuccess: removeItemWasSuccess,
  itemWasError: removeItemWasError
} = removeFavouritesSlice.actions
