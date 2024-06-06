import type { PayloadAction } from '@reduxjs/toolkit'
import {
  createDeviceDataTrigger,
  createDeviceDataRequest,
  createDeviceDataSuccess,
  createDeviceDataFailure,
  createDeviceDataFulfill
} from '../slices'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import { BraintreeDeviceData } from '../types'
import type { SagaIterator } from 'redux-saga'
import { getErrorMessage } from '~helpers/error'

function* doCreateDeviceData({ payload }: PayloadAction<BraintreeDeviceData>) {
  try {
    yield put(createDeviceDataRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    yield call(client.post, '/api/checkout/create-device-data', {
      ...payload
    })
    yield put(createDeviceDataSuccess())
  } catch (error) {
    logger.error(getErrorMessage(error))
    yield put(
      createDeviceDataFailure({
        message: getErrorMessage(error)
      })
    )
  } finally {
    yield put(createDeviceDataFulfill())
  }
}

export function* createDeviceDataSaga(): SagaIterator {
  yield all([takeLatest(createDeviceDataTrigger, doCreateDeviceData)])
}
