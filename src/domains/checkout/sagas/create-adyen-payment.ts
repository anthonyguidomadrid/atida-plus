import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  adyenPaymentTrigger,
  adyenPaymentRequest,
  adyenPaymentSuccess,
  adyenPaymentFailure,
  adyenPaymentFulfill
} from '../slices'
import { AdyenPaymentLoad, AdyenResponseData } from '~domains/checkout/types'
import { getErrorMessage } from '~helpers/error'

function* doCreateAdyenPayment({ payload }: PayloadAction<AdyenPaymentLoad>) {
  try {
    yield put(adyenPaymentRequest())
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<AdyenResponseData> = yield call(
      client.post,
      '/api/checkout/create-adyen-payment',
      {
        ...payload
      }
    )

    yield put(adyenPaymentSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        adyenPaymentFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        adyenPaymentFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(adyenPaymentFulfill())
  }
}

export function* createAdyenPaymentSaga(): SagaIterator {
  yield all([takeLatest(adyenPaymentTrigger, doCreateAdyenPayment)])
}
