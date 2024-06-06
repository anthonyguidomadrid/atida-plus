import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import {
  ExponeaFetchRecommendationsDataState,
  ExponeaRecommendationPayload,
  FetchRecommendationResponse
} from '~domains/exponea/types'

const initialState: ExponeaFetchRecommendationsDataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const fetchRecommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<ExponeaRecommendationPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<FetchRecommendationResponse>) {
      let updated = false
      const data = action.payload
      if (typeof data !== 'undefined') {
        if (typeof state.details !== 'undefined') {
          state.details.map(value => {
            if (value.recommendationId == data.recommendationId) {
              value.items = data.items
              value.isPersonalized = data.isPersonalized
              updated = true
            }
          })
          !updated && state.details.push(data)
        } else {
          state.details = [data]
        }
      }
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
    builder.addCase(clearStateErrors, (state, _action) => {
      state.wasError = false
      delete state.error
    })
  }
})
