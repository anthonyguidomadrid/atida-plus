import { combineReducers } from '@reduxjs/toolkit'
import { socialLoginSlice } from './login'
import { socialVerifySlice } from './verify'

export const socialReducer = combineReducers({
  login: socialLoginSlice.reducer,
  verify: socialVerifySlice.reducer
})

export const {
  trigger: socialLoginTrigger,
  request: socialLoginRequest,
  success: socialLoginSuccess,
  failure: socialLoginFailure,
  fulfill: socialLoginFulfill,
  resetErrors: socialLoginResetErrors,
  resetDetails: socialLoginResetDetails
} = socialLoginSlice.actions

export const {
  trigger: socialVerifyTrigger,
  request: socialVerifyRequest,
  success: socialVerifySuccess,
  failure: socialVerifyFailure,
  fulfill: socialVerifyFulfill,
  resetErrors: socialVerifyResetErrors
} = socialVerifySlice.actions
