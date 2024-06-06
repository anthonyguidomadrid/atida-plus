import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { hydrate } from '~domains/redux/actions'
import { hasOwnProperty } from '~helpers'
import { Seo } from '~domains/contentful'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
type SeoBlockState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  errorCode?: number
  data?: Partial<Seo>
}

const initialState: SeoBlockState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const seoBlockSlice = createSlice({
  name: 'seo-block',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<{ locale?: string; slug: string }>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
      delete state.errorCode
    },
    success(state, action: PayloadAction<Partial<Seo>>) {
      const content = action.payload
      if (typeof content !== 'undefined') state.data = content
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
        hasOwnProperty(action.payload, 'seo') &&
        typeof action.payload.seo === 'object' &&
        hasOwnProperty(action.payload.seo, 'content')
      ) {
        return action.payload.seo['content'] as SeoBlockState
      }
    })
  }
})
