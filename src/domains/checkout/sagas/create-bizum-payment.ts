import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  bizumPaymentTrigger,
  bizumPaymentRequest,
  bizumPaymentSuccess,
  bizumPaymentFailure,
  bizumPaymentFulfill
} from '../slices'
import { BizumPaymentLoad, BizumResponseData } from '~domains/checkout/types'
import { getErrorMessage } from '~helpers/error'

function* doCreateBizumPayment({ payload }: PayloadAction<BizumPaymentLoad>) {
  try {
    yield put(bizumPaymentRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<BizumResponseData> = yield call(
      client.post,
      '/api/checkout/create-bizum-payment',
      {
        ...payload
      }
    )

    yield put(bizumPaymentSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        bizumPaymentFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        bizumPaymentFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(bizumPaymentFulfill())
  }
}

export function* createBizumPaymentSaga(): SagaIterator {
  yield all([takeLatest(bizumPaymentTrigger, doCreateBizumPayment)])
}
