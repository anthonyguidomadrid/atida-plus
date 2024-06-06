import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors, hydrate } from '~domains/redux/actions'
import { hasOwnProperty } from '~helpers'
import {
  FetchStaticRecommendation,
  FetchStaticRecommendationDataState,
  FetchStaticRecommendationTriggerPayload
} from '../types'

const initialState: FetchStaticRecommendationDataState = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const fetchStaticRecommendationSlice = createSlice({
  name: 'Static Recommendation',
  initialState,
  reducers: {
    trigger(
      _state,
      _action: PayloadAction<FetchStaticRecommendationTriggerPayload>
    ) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<FetchStaticRecommendation[]>) {
      state.details = action.payload
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
    builder.addCase(hydrate, (_state, action) => {
      if (
        typeof action.payload === 'object' &&
        hasOwnProperty(action.payload, 'staticRecommendation') &&
        typeof action.payload.staticRecommendation === 'object' &&
        hasOwnProperty(
          action.payload.staticRecommendation,
          'static-recommendation'
        )
      ) {
        return action.payload.staticRecommendation[
          'static-recommendation'
        ] as FetchStaticRecommendationDataState
      }
    })
  }
})
