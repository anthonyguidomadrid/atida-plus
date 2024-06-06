import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors, hydrate } from '~domains/redux/actions'
import { Promos, Promotion } from '~domains/contentful/normalizers/promotion'
import { hasOwnProperty } from '~helpers'

export const skipPromotions = 50
export const limitPromotions = 50

type ContentState = {
  data?: Promotion[]
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  skipped?: number
  total?: number
  filters?: string[]
  id?: string
}

const initialState: ContentState = {
  data: [],
  isLoading: false,
  wasSuccess: false,
  wasError: false,
  skipped: 0,
  total: 0,
  filters: [],
  id: ''
}

export const contentSlice = createSlice({
  name: 'promotion/content',
  initialState,
  reducers: {
    trigger(
      state,
      action: PayloadAction<
        | { filters?: string[]; id?: string; skip?: string; preview?: boolean }
        | undefined
      >
    ) {
      if (action.payload?.filters && action.payload.skip === undefined) {
        // Reset data and skipped when filters have been activated: request only passes filters as param
        state.data = []
        state.skipped = 0
      }
      state.filters = action.payload?.filters ?? []
      state.id = action.payload?.id ?? ''
    },
    request(state) {
      state.isLoading = true
    },
    success(state, action: PayloadAction<Promos>) {
      state.wasSuccess = true
      state.total = action.payload.total
      action.payload.items?.forEach(item => {
        if (!state.data?.some(promo => promo.id === item.id)) {
          state.data?.push(item)
        }
      })
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
      state.data = undefined
      state.skipped = 0
      state.total = 0
      state.filters = []
    },
    updateSkip(state, action: PayloadAction<{ newSkipValue: number }>) {
      state.wasSuccess = true
      state.skipped = action.payload.newSkipValue
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
        hasOwnProperty(action.payload, 'promotion') &&
        typeof action.payload.promotion === 'object' &&
        hasOwnProperty(action.payload.promotion, 'content')
      ) {
        return action.payload.promotion['content'] as ContentState
      }
    })
  }
})
