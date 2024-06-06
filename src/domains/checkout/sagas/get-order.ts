import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  getOrderTrigger,
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  getOrderFulfill
} from '../slices'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DoGetOrderPayload, SprykerOrderResponseData } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doGetOrder({ payload }: PayloadAction<DoGetOrderPayload>) {
  try {
    yield put(getOrderRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<SprykerOrderResponseData> = yield call(
      client.post,
      '/api/checkout/get-order',
      {
        ...payload
      }
    )

    yield put(getOrderSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        getOrderFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        getOrderFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getOrderFulfill())
  }
}

export function* getOrderSaga(): SagaIterator {
  yield all([takeLatest(getOrderTrigger, doGetOrder)])
}
