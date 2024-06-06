import { getCustomerTrigger } from '~domains/account'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  updateCustomerPersonalDetailsTrigger,
  updateCustomerPersonalDetailsRequest,
  updateCustomerPersonalDetailsSuccess,
  updateCustomerPersonalDetailsFailure,
  updateCustomerPersonalDetailsFulfill,
  updateCustomerPersonalDetailsHideNotificationTrigger,
  updateCustomerPersonalDetailsHideNotification
} from '../slices'
import { UpdateCustomerPersonalDetailsTriggerPayload } from '../types'
import Router from 'next/router'
import { getErrorMessage } from '~helpers/error'

function* doUpdateCustomerPersonalDetailsSaga({
  payload
}: PayloadAction<UpdateCustomerPersonalDetailsTriggerPayload>) {
  try {
    yield put(updateCustomerPersonalDetailsRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    yield call(
      client.patch,
      '/api/account/update-customer-personal-details',
      details
    )
    yield put(updateCustomerPersonalDetailsSuccess())
    yield put(getCustomerTrigger({ customerReference: payload.reference }))
    if (payload.redirect) {
      Router.push(payload.redirect)
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        updateCustomerPersonalDetailsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        updateCustomerPersonalDetailsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(updateCustomerPersonalDetailsFulfill())
  }
}

export function* updateCustomerPersonalDetailsSaga(): SagaIterator {
  yield all([
    takeLatest(
      updateCustomerPersonalDetailsTrigger,
      doUpdateCustomerPersonalDetailsSaga
    )
  ])
}

function* doUpdateCustomerPersonalDetailsNotificationSaga() {
  try {
    yield put(updateCustomerPersonalDetailsHideNotification())
  } catch (error) {
    logger.error(getErrorMessage(error))
  }
}

export function* updateCustomerPersonalDetailsNotificationSaga(): SagaIterator {
  yield all([
    takeLatest(
      updateCustomerPersonalDetailsHideNotificationTrigger,
      doUpdateCustomerPersonalDetailsNotificationSaga
    )
  ])
}
