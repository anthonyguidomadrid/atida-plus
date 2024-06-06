import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { hydrate } from '~domains/redux/actions'
import { PageRedirect } from '../types'

type PageRedirectState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  pageRedirect?: PageRedirect
}

const initialState: PageRedirectState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const pageRedirectSlice = createSlice({
  name: 'page/page-redirect',
  initialState,
  reducers: {
    trigger() {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<PageRedirect>) {
      const pageRedirect = action.payload
      if (typeof pageRedirect !== 'undefined') state.pageRedirect = pageRedirect
      state.wasSuccess = true
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    }
  },
  extraReducers: builder => {
    builder.addCase(hydrate, (_state, action) => {
      if (action.payload && action.payload.page) {
        return action.payload.page['page-redirect'] as PageRedirectState
      }
    })
  }
})
