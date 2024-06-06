import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  mbWayPaymentTrigger,
  mbWayPaymentRequest,
  mbWayPaymentSuccess,
  mbWayPaymentFailure,
  mbWayPaymentFulfill
} from '../slices'
import { MBWayPaymentLoad, MBWayPaymentResponseData } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doCreateMBWayPayment({ payload }: PayloadAction<MBWayPaymentLoad>) {
  try {
    yield put(mbWayPaymentRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<MBWayPaymentResponseData> = yield call(
      client.post,
      '/api/checkout/create-mbway-payment',
      {
        ...payload
      }
    )

    yield put(mbWayPaymentSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        mbWayPaymentFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        mbWayPaymentFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(mbWayPaymentFulfill())
  }
}

export function* createMBWayPaymentSaga(): SagaIterator {
  yield all([takeLatest(mbWayPaymentTrigger, doCreateMBWayPayment)])
}
