import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  cancelOrderTrigger,
  cancelOrderRequest,
  cancelOrderSuccess,
  cancelOrderFailure,
  cancelOrderFulfill
} from '../slices'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CancelOrderPayload } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doCancelOrder({ payload }: PayloadAction<CancelOrderPayload>) {
  try {
    yield put(cancelOrderRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    yield call(client.delete, '/api/checkout/cancel-order', {
      data: { ...payload }
    })

    yield put(cancelOrderSuccess())
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        cancelOrderFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        cancelOrderFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(cancelOrderFulfill())
  }
}

export function* cancelOrderSaga(): SagaIterator {
  yield all([takeLatest(cancelOrderTrigger, doCancelOrder)])
}
