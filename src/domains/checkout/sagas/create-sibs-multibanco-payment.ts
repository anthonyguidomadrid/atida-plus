import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  sibsMultibancoPaymentTrigger,
  sibsMultibancoPaymentRequest,
  sibsMultibancoPaymentSuccess,
  sibsMultibancoPaymentFailure,
  sibsMultibancoPaymentFulfill
} from '../slices'
import {
  SIBSMultibancoPaymentData,
  SIBSMultibancoResponseData
} from '~domains/checkout/types'
import { getErrorMessage } from '~helpers/error'

function* doCreateSIBSMultibancoPayment({
  payload
}: PayloadAction<SIBSMultibancoPaymentData>) {
  try {
    yield put(sibsMultibancoPaymentRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<SIBSMultibancoResponseData> = yield call(
      client.post,
      '/api/checkout/create-sibs-multibanco-payment',
      {
        ...payload
      }
    )

    yield put(sibsMultibancoPaymentSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        sibsMultibancoPaymentFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        sibsMultibancoPaymentFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(sibsMultibancoPaymentFulfill())
  }
}

export function* createsibsMultibancoPaymentSaga(): SagaIterator {
  yield all([
    takeLatest(sibsMultibancoPaymentTrigger, doCreateSIBSMultibancoPayment)
  ])
}
