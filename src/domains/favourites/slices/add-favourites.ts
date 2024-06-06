import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type DataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  items?: {
    sku: string
    isLoading: boolean
    isSaved: boolean
    wasSuccess: boolean
    wasError: boolean
  }[]
}

const initialState: DataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  items: []
}

export const addFavouritesSlice = createSlice({
  name: 'favourites/add',
  initialState,
  reducers: {
    save(_state, _action: PayloadAction<{ sku: string }>) {
      const data = _action.payload
      if (_state.items) {
        !_state.items.some(item => item.sku === data.sku) &&
          _state.items.push({
            sku: data.sku,
            isLoading: true,
            isSaved: false,
            wasSuccess: false,
            wasError: false
          })

        _state.items.map(item => {
          if (item.sku === data.sku) {
            item.wasSuccess = false
          }
        })
      }
    },
    trigger(_state, _action: PayloadAction<{ sku: string }>) {
      const data = _action.payload
      _state.items &&
        !_state.items.some(item => item.sku === data.sku) &&
        _state.items.push({
          sku: data.sku,
          isLoading: false,
          isSaved: true,
          wasSuccess: false,
          wasError: false
        })
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state) {
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    itemIsLoading(
      state,
      action: PayloadAction<{
        sku: string
        isLoading: boolean
      }>
    ) {
      const data = action.payload
      state.items &&
        state.items.forEach(item => {
          if (item.sku === data.sku) {
            item.isLoading = data.isLoading
          }
        })
    },
    itemIsSaved(
      state,
      action: PayloadAction<{
        sku: string
        isSaved: boolean
      }>
    ) {
      const data = action.payload
      state.items &&
        state.items.forEach(item => {
          if (item.sku === data.sku) {
            item.isSaved = data.isSaved
          }
        })
    },
    itemWasSuccess(
      state,
      action: PayloadAction<{
        sku: string
        wasSuccess: boolean
      }>
    ) {
      const data = action.payload
      state.items &&
        state.items.forEach(item => {
          if (item.sku === data.sku) {
            item.wasSuccess = data.wasSuccess
          }
        })
    },
    itemWasError(
      state,
      action: PayloadAction<{
        sku: string
        wasError: boolean
      }>
    ) {
      const data = action.payload
      state.items &&
        state.items.forEach(item => {
          if (item.sku === data.sku) {
            item.wasError = data.wasError
          }
        })
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
