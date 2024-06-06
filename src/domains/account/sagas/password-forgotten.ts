import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'
import { StrictEffect } from '@redux-saga/types'

import { createClient, logger } from '~helpers'
import {
  passwordForgottenFailure,
  passwordForgottenFulfill,
  passwordForgottenRequest,
  passwordForgottenSuccess,
  passwordForgottenTrigger
} from '../slices'
import type { PasswordForgottenTriggerPayload } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doPasswordForgottenSaga({
  payload
}: PayloadAction<PasswordForgottenTriggerPayload>): Generator<
  StrictEffect,
  void,
  any
> {
  try {
    yield put(passwordForgottenRequest())
    const locale = yield getContext('locale')
    const client = createClient({ locale })

    yield call(client.post, '/api/account/password-forgotten', {
      email: payload.email
    })

    yield put(passwordForgottenSuccess(payload))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    Array.isArray(errorMessages)
      ? yield put(passwordForgottenFailure({ message: errorMessages[0] }))
      : yield put(passwordForgottenFailure({ message: errorMessages }))
  } finally {
    yield put(passwordForgottenFulfill())
  }
}

export function* passwordForgottenSaga(): SagaIterator {
  yield takeLatest(passwordForgottenTrigger, doPasswordForgottenSaga)
}
