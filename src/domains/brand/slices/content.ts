import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors, hydrate } from '~domains/redux/actions'
import { Brand, Brands } from '~domains/contentful/normalizers/brand'
import { hasOwnProperty } from '~helpers'

type ContentState = {
  data?: Brand[]
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: ContentState = {
  data: [],
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const contentSlice = createSlice({
  name: 'brand/content',
  initialState,
  reducers: {
    trigger() {
      // no-op, triggers saga
    },
    request(state) {
      state.isLoading = true
    },
    success(state, action: PayloadAction<Brands>) {
      state.wasSuccess = true
      state.data = action.payload?.items ?? []
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    cancel() {
      // no-op, triggered by saga when no need to re-fetch brands
    },
    fulfill(state) {
      state.isLoading = false
    }
  },
  extraReducers: builder => {
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })

    builder.addCase(hydrate, (_state, action) => {
      if (
        typeof action.payload === 'object' &&
        hasOwnProperty(action.payload, 'brand') &&
        typeof action.payload.brand === 'object' &&
        hasOwnProperty(action.payload.brand, 'content')
      ) {
        return action.payload.brand['content'] as ContentState
      }
    })
  }
})
