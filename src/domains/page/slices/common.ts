import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { hasOwnProperty } from '~helpers'
import { hydrate } from '~domains/redux/actions'
import type { Common } from '../types'

// TODO: maybe extract loading/success/error to common type that can be re-used across slices for consistency
export type CommonState = Partial<Common> & {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

const initialState: CommonState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const commonSlice = createSlice({
  name: 'page/common',
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
    success(state, action: PayloadAction<Common>) {
      const {
        footer,
        headerNavigationLeft,
        headerNavigationRight,
        organization,
        campaignLabels
      } = action.payload
      if (typeof footer !== 'undefined') state.footer = footer
      if (typeof headerNavigationLeft !== 'undefined')
        state.headerNavigationLeft = headerNavigationLeft
      if (typeof headerNavigationRight !== 'undefined')
        state.headerNavigationRight = headerNavigationRight
      if (typeof organization !== 'undefined') state.organization = organization
      if (typeof campaignLabels !== 'undefined')
        state.campaignLabels = campaignLabels

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
      if (
        typeof action.payload === 'object' &&
        hasOwnProperty(action.payload, 'page') &&
        typeof action.payload.page === 'object' &&
        hasOwnProperty(action.payload.page, 'common')
      ) {
        return action.payload.page.common as CommonState
      }
    })
  }
})
