import type { PayloadAction } from '@reduxjs/toolkit'
import { createClient, logger } from '~helpers'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import {
  reOrderFailure,
  reOrderFulfill,
  reOrderRequest,
  reOrderSuccess,
  reOrderTrigger
} from '../slices'
import { getErrorMessage } from '~helpers/error'
import { reOrderPayload } from '../types'

function* doReOrder({ payload }: PayloadAction<reOrderPayload>) {
  try {
    yield put(reOrderRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    yield call(client.post, '/api/checkout/re-order', payload)
    yield put(reOrderSuccess())
  } catch (error) {
    logger.error(getErrorMessage(error))
    const errorMessages = getErrorMessage(error)
    if (Array.isArray(errorMessages)) {
      yield put(
        reOrderFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(reOrderFailure({ message: errorMessages }))
    }
  } finally {
    yield put(reOrderFulfill())
  }
}

export function* reOrderSaga(): SagaIterator {
  yield all([takeLatest(reOrderTrigger, doReOrder)])
}
