import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  verifyResetPasswordTokenTrigger,
  verifyResetPasswordTokenRequest,
  verifyResetPasswordTokenSuccess,
  verifyResetPasswordTokenFailure,
  verifyResetPasswordTokenFulfill
} from '../slices'

import {
  SprykerVerifyResetPasswordToken,
  VerifyResetPasswordTokenTriggerPayload
} from '../types'
import { getErrorMessage, getErrorStatus } from '~helpers/error'

function* doVerifyResetPasswordTokenSaga({
  payload
}: PayloadAction<VerifyResetPasswordTokenTriggerPayload>) {
  try {
    yield put(verifyResetPasswordTokenRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const response: AxiosResponse<SprykerVerifyResetPasswordToken> = yield call(
      client.get,
      `/api/account/verify-reset-password-token?token=${payload.resetPasswordToken}`
    )
    yield put(verifyResetPasswordTokenSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        verifyResetPasswordTokenFailure({
          message: errorMessages[0],
          status: getErrorStatus(error) || 500
        })
      )
    } else {
      yield put(
        verifyResetPasswordTokenFailure({
          message: errorMessages,
          status: getErrorStatus(error) || 500
        })
      )
    }
  } finally {
    yield put(verifyResetPasswordTokenFulfill())
  }
}

export function* verifyResetPasswordTokenSaga(): SagaIterator {
  yield takeLatest(
    verifyResetPasswordTokenTrigger,
    doVerifyResetPasswordTokenSaga
  )
}
