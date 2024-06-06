import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  updateCustomerPasswordTrigger,
  updateCustomerPasswordRequest,
  updateCustomerPasswordSuccess,
  updateCustomerPasswordFailure,
  updateCustomerPasswordFulfill,
  updateCustomerPasswordHideNotificationTrigger,
  updateCustomerPasswordHideNotification
} from '../slices'
import { ChangePasswordPayload } from '../types'
import Router from 'next/router'
import { getErrorMessage } from '~helpers/error'

function* doUpdateCustomerPasswordSaga({
  payload
}: PayloadAction<ChangePasswordPayload>) {
  try {
    yield put(updateCustomerPasswordRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    yield call(client.patch, '/api/account/update-customer-password', details)
    yield put(updateCustomerPasswordSuccess())
    Router.push('/account/details')
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        updateCustomerPasswordFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        updateCustomerPasswordFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(updateCustomerPasswordFulfill())
  }
}

export function* updateCustomerPasswordsSaga(): SagaIterator {
  yield all([
    takeLatest(updateCustomerPasswordTrigger, doUpdateCustomerPasswordSaga)
  ])
}

function* doUpdatePasswordHideNotificationSaga() {
  try {
    yield put(updateCustomerPasswordHideNotification())
  } catch (error) {
    logger.error(getErrorMessage(error))
  }
}

export function* updatePasswordHideNotificationSaga(): SagaIterator {
  yield all([
    takeLatest(
      updateCustomerPasswordHideNotificationTrigger,
      doUpdatePasswordHideNotificationSaga
    )
  ])
}
