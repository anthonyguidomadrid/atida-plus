import { combineReducers } from '@reduxjs/toolkit'
import { expertSignatureSlice } from './expert-signature'

export const expertSignatureReducer = combineReducers({
  content: expertSignatureSlice.reducer
})

export const {
  trigger: expertSignatureTrigger,
  request: expertSignatureRequest,
  success: expertSignatureSuccess,
  failure: expertSignatureFailure,
  fulfill: expertSignatureFulfill
} = expertSignatureSlice.actions
