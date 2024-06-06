import type { PayloadAction } from '@reduxjs/toolkit'
import Router from 'next/router'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  setNewPasswordTrigger,
  setNewPasswordRequest,
  setNewPasswordSuccess,
  setNewPasswordFailure,
  setNewPasswordFulfill
} from '../slices'

import { SetNewPasswordTriggerPayload } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doSetNewPasswordSaga({
  payload
}: PayloadAction<SetNewPasswordTriggerPayload>) {
  try {
    yield put(setNewPasswordRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { redirect, ...details } = payload
    yield call(client.patch, '/api/account/set-new-password', details)
    yield put(setNewPasswordSuccess())
    if (payload.redirect) {
      Router.push(payload.redirect)
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(setNewPasswordFailure({ message: errorMessages[0] }))
    } else {
      yield put(
        setNewPasswordFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(setNewPasswordFulfill())
  }
}

export function* setNewPasswordSaga(): SagaIterator {
  yield all([takeLatest(setNewPasswordTrigger, doSetNewPasswordSaga)])
}
