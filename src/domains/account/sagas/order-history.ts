import { SagaIterator } from '@redux-saga/types'
import type { AxiosResponse } from 'axios'
import { call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  orderHistoryFailure,
  orderHistoryFulfill,
  orderHistoryRequest,
  orderHistorySuccess,
  orderHistoryTrigger
} from '../slices'
import type {
  OrderHistoryPayload,
  OrderHistoryTriggerPayload
} from '~domains/account/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '~helpers/error'

function* doOrderHistorySaga({
  payload
}: PayloadAction<OrderHistoryTriggerPayload>) {
  try {
    yield put(orderHistoryRequest())

    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })

    const apiResponse: AxiosResponse<OrderHistoryPayload> = yield call(
      client.get,
      '/api/account/order-history',
      { params: payload }
    )

    yield put(orderHistorySuccess(apiResponse.data))

    return apiResponse
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(orderHistoryFailure({ message: errorMessages[0] }))
    } else {
      yield put(
        orderHistoryFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(orderHistoryFulfill())
  }
}

export function* orderHistorySaga(): SagaIterator {
  yield takeLatest(orderHistoryTrigger, doOrderHistorySaga)
}
