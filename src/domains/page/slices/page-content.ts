import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { hasOwnProperty } from '~helpers'
import { hydrate } from '~domains/redux/actions'
import type { Common, PageContent } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type PageContentState = Partial<Common> & {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  errorCode?: number
  content?: PageContent
}

const initialState: PageContentState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const pageContentSlice = createSlice({
  name: 'page/page-content',
  initialState,
  reducers: {
    trigger(
      _state,
      _action: PayloadAction<{ slug: string; preview?: boolean }>
    ) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
      delete state.errorCode
    },
    success(state, action: PayloadAction<PageContent>) {
      const content = action.payload
      if (typeof content !== 'undefined') state.content = content
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string; code: number }>) {
      const { message, code } = action.payload
      state.wasError = true
      state.error = message
      state.errorCode = code
    },
    fulfill(state) {
      state.isLoading = false
    }
  },
  extraReducers: builder => {
    builder.addCase(hydrate, (_state, action) => {
      if (
        typeof action.payload === 'object' &&
        hasOwnProperty(action.payload, 'page') &&
        typeof action.payload.page === 'object' &&
        hasOwnProperty(action.payload.page, 'page-content')
      ) {
        return action.payload.page['page-content'] as PageContentState
      }
    })
  }
})
