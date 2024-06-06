import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { hasOwnProperty } from '~helpers'
import { hydrate } from '~domains/redux/actions'
import type { GetElasticSearchProductPayload, Product } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type ContentState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  data?: Product
  showLabels?: boolean
}

const initialState: ContentState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  showLabels: false
}

export const contentSlice = createSlice({
  name: 'product/content',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<GetElasticSearchProductPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<Product>) {
      const data = action.payload
      if (typeof data !== 'undefined') state.data = data
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
    setShowLabels(state, action) {
      state.showLabels = action.payload
    },
    setClearData(state) {
      delete state.data
    }
  },
  extraReducers: builder => {
    builder.addCase(hydrate, (_state, action) => {
      if (
        typeof action.payload === 'object' &&
        hasOwnProperty(action.payload, 'product') &&
        typeof action.payload.product === 'object' &&
        hasOwnProperty(action.payload.product, 'content')
      ) {
        return action.payload.product['content'] as ContentState
      }
    })
  }
})
