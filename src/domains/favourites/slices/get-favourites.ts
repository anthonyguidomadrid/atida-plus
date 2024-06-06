import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import {
  GetFavouritesResponse,
  FavouritesWithProducts,
  FavouritesItemsIdsPayload
} from '~domains/favourites/types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  isProductsLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  wasProductsSuccess: boolean
  wasProductsError: boolean
  error?: string
  forceRefresh: boolean
  favouritesList?: GetFavouritesResponse
}

const initialState: DataState = {
  isLoading: false,
  isProductsLoading: false,
  wasSuccess: false,
  wasError: false,
  wasProductsSuccess: false,
  wasProductsError: false,
  forceRefresh: false,
  favouritesList: {}
}

export const getFavouritesSlice = createSlice({
  name: 'favourites/get',
  initialState,
  reducers: {
    trigger(_state) {
      // no-op, used for triggering saga
    },
    forceRefresh(state) {
      state.forceRefresh = true
    },
    request(state) {
      state.isLoading = true
      state.isProductsLoading = false
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<GetFavouritesResponse>) {
      const data = action.payload
      if (typeof data !== 'undefined') state.favouritesList = data
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
      state.isProductsLoading = false
      state.forceRefresh = false
    },
    getProductsTrigger(
      _state,
      _action: PayloadAction<FavouritesItemsIdsPayload>
    ) {
      const { skus } = _action.payload
      if (skus?.length) {
        _state.isLoading = false
        _state.isProductsLoading = true
        _state.wasProductsSuccess = false
        _state.wasProductsError = false
      }
    },
    getProductsSuccess(state, action: PayloadAction<FavouritesWithProducts>) {
      const data = action.payload
      if (typeof data !== 'undefined' && state.favouritesList) {
        state.favouritesList.products = data
        state.wasProductsSuccess = true
        state.wasProductsError = false
      }
    },
    getProductsFailure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasProductsError = true
      state.error = message
    },
    resetProducts(state) {
      state.wasProductsSuccess = false
      state.wasProductsError = false
      if (state?.favouritesList?.products)
        state.favouritesList.products = undefined
    },
    addItem(state, action: PayloadAction<{ sku: string }>) {
      const data = action.payload
      state.favouritesList && state?.favouritesList.items?.push(data.sku)
    },
    removeItem(state, action: PayloadAction<{ sku: string }>) {
      const data = action.payload
      if (
        typeof state.favouritesList !== 'undefined' &&
        typeof state.favouritesList.items !== 'undefined'
      ) {
        state.favouritesList.items = state?.favouritesList.items?.filter(
          (item: string) => item !== data.sku
        )
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
