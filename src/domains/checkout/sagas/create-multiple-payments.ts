import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  createMultiplePaymentsTrigger,
  createMultiplePaymentsRequest,
  createMultiplePaymentsSuccess,
  createMultiplePaymentsFailure,
  createMultiplePaymentsFulfill
} from '../slices'
import {
  MultiplePaymentsLoad,
  MultiplePaymentsResponseData
} from '~domains/checkout/types'
import { getErrorMessage } from '~helpers/error'

function* doCreateMultiplePayment({
  payload
}: PayloadAction<MultiplePaymentsLoad>) {
  try {
    yield put(createMultiplePaymentsRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<MultiplePaymentsResponseData> = yield call(
      client.post,
      '/api/checkout/create-multiple-payments',
      payload
    )

    yield put(createMultiplePaymentsSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        createMultiplePaymentsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        createMultiplePaymentsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(createMultiplePaymentsFulfill())
  }
}

export function* createMultiplePaymentsSaga(): SagaIterator {
  yield all([
    takeLatest(createMultiplePaymentsTrigger, doCreateMultiplePayment)
  ])
}
