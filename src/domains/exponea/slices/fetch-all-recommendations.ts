import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors } from '~domains/redux/actions'
import {
  ExponeaAllRecommendationsTriggerPayload,
  ExponeaFetchAllRecommendationsDataState,
  FetchAllRecommendationsResponse
} from '~domains/exponea/types'

const initialState: ExponeaFetchAllRecommendationsDataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const fetchAllRecommendationsSlice = createSlice({
  name: 'all-recommendations',
  initialState,
  reducers: {
    trigger(
      _state,
      _action: PayloadAction<ExponeaAllRecommendationsTriggerPayload>
    ) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<FetchAllRecommendationsResponse>) {
      let updated = false
      const data = action.payload

      if (typeof data !== 'undefined') {
        if (typeof state.content !== 'undefined') {
          state.content.map(value => {
            if (value.items[0].id == data.items[0].id) {
              value.items = data.items
              updated = true
            }
          })
          !updated && state.content.push(data)
        } else {
          state.content = [data]
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
