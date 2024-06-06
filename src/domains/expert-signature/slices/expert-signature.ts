import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { clearStateErrors, hydrate } from '~domains/redux/actions'
import { hasOwnProperty } from '~helpers'
import {
  ExpertSignatureState,
  ExpertSignatures,
  ExpertSignatureTrigger
} from '../types'

const initialState: ExpertSignatureState = {
  experts: [],
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const expertSignatureSlice = createSlice({
  name: 'expert-signature',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<ExpertSignatureTrigger>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
    },
    success(state, action: PayloadAction<ExpertSignatures>) {
      const data = action.payload
      state.wasSuccess = true
      if (typeof data !== 'undefined') {
        state.experts = action.payload?.items || []
      } else {
        state.experts = []
      }
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
        hasOwnProperty(action.payload, 'expertSignature') &&
        typeof action.payload.expertSignature === 'object' &&
        hasOwnProperty(action.payload.expertSignature, 'content')
      ) {
        return action.payload.expertSignature['content'] as ExpertSignatureState
      }
    })
  }
})
