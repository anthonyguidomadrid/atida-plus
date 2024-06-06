import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  updateBusinessDetailsTrigger,
  updateBusinessDetailsRequest,
  updateBusinessDetailsSuccess,
  updateBusinessDetailsFailure,
  updateBusinessDetailsFulfill,
  getCustomerTrigger
} from '../slices'
import { UpdateBusinessDetailsTriggerPayload } from '../types'
import Router from 'next/router'
import { getErrorMessage } from '~helpers/error'

function* doUpdateBusinessDetailsSaga({
  payload
}: PayloadAction<UpdateBusinessDetailsTriggerPayload>) {
  try {
    yield put(updateBusinessDetailsRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale })
    const { ...details } = payload
    yield call(client.patch, '/api/account/update-business-details', details)
    yield put(updateBusinessDetailsSuccess())
    yield put(getCustomerTrigger({ customerReference: payload.reference }))
    if (payload.redirect) {
      Router.push(payload.redirect)
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        updateBusinessDetailsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        updateBusinessDetailsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(updateBusinessDetailsFulfill())
  }
}

export function* updateBusinessDetailsSaga(): SagaIterator {
  yield all([
    takeLatest(updateBusinessDetailsTrigger, doUpdateBusinessDetailsSaga)
  ])
}
