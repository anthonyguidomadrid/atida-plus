import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Filter, PageFilter } from '~domains/contentful/normalizers/page-filter'
import { clearStateErrors, hydrate } from '~domains/redux/actions'
import { hasOwnProperty } from '~helpers'

type ContentState = {
  filters?: Filter[]
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  slug?: string
}

const initialState: ContentState = {
  filters: [],
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const contentSlice = createSlice({
  name: 'page-filter',
  initialState,
  reducers: {
    trigger(state, action: PayloadAction<{ slug?: string } | undefined>) {
      state.slug = action?.payload?.slug
    },
    request(state) {
      state.isLoading = true
    },
    success(state, action: PayloadAction<PageFilter>) {
      state.filters = action.payload.items
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    cancel() {
      // no-op, triggered by saga when no need to re-fetch promotions
    },
    fulfill(state) {
      state.isLoading = false
    },
    reset(state) {
      state.isLoading = false
      state.wasError = false
      state.wasSuccess = false
      state.filters = undefined
      state.slug = undefined
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
        hasOwnProperty(action.payload, 'pageFilter') &&
        typeof action.payload.pageFilter === 'object' &&
        hasOwnProperty(action.payload.pageFilter, 'content')
      ) {
        return action.payload.pageFilter['content'] as ContentState
      }
    })
  }
})
