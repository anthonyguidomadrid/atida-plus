import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SocialLoginAndSignUpServiceTypes } from '~components/atoms/SocialLoginAndSignUp'
import { CustomerToken } from '~domains/account'
import { SocialLoginPayload, SocialLoginResponse } from '../types'

type SocialLoginProps = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  details?: Omit<CustomerToken, 'social'> &
    CustomerToken['social'] & {
      serviceType: SocialLoginAndSignUpServiceTypes
      redirectUri: string
    }
  error?: string
}

const initialState: SocialLoginProps = {
  isLoading: false,
  wasSuccess: false,
  wasError: false
}

export const socialLoginSlice = createSlice({
  name: 'social/login',
  initialState,
  reducers: {
    trigger(_state, _action: PayloadAction<SocialLoginPayload>) {
      // no-op, used for triggering saga
    },
    request(state) {
      state.isLoading = true
      state.wasSuccess = false
      state.wasError = false
      delete state.error
    },
    success(state, action: PayloadAction<SocialLoginResponse>) {
      state.wasSuccess = true
      if (action?.payload) {
        const { social, ...data } = action?.payload
        state.details = { ...data, ...action?.payload.social }
      }
    },
    failure(state, action: PayloadAction<{ message: string }>) {
      const { message } = action.payload
      state.wasError = true
      state.error = message
    },
    fulfill(state) {
      state.isLoading = false
    },
    resetErrors(state) {
      state.isLoading = false
      state.wasError = false
      state.wasSuccess = false
      delete state.error
    },
    resetDetails(state) {
      delete state.details
    }
  }
})
