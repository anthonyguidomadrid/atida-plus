import { createSlice } from '@reduxjs/toolkit'

const initialSegmentState = { isInitialised: false }

export const isSegmentInitialisedSlice = createSlice({
  name: 'isInitialised',
  initialState: initialSegmentState,
  reducers: {
    setAsInitialised(state) {
      state.isInitialised = true
    }
  }
})
