import { SagaIterator } from '@redux-saga/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AxiosResponse } from 'axios'
import { call, getContext, put, takeLatest, delay } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  orderDetailsFailure,
  orderDetailsFulfill,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsTrigger
} from '../slices'
import type { OrderDetailsPayload, OrderDetailsTriggerPayload } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doOrderDetailsSaga({
  payload
}: PayloadAction<OrderDetailsTriggerPayload>) {
  try {
    yield put(orderDetailsRequest())

    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })

    const apiResponse: AxiosResponse<OrderDetailsPayload> = yield call(
      client.get,
      '/api/account/order-details',
      { params: payload }
    )

    yield put(orderDetailsSuccess(apiResponse.data))

    return apiResponse
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(orderDetailsFailure({ message: errorMessages[0] }))
    } else {
      yield put(
        orderDetailsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield delay(0)
    yield put(orderDetailsFulfill())
  }
}

export function* orderDetailsSaga(): SagaIterator {
  yield takeLatest(orderDetailsTrigger, doOrderDetailsSaga)
}
