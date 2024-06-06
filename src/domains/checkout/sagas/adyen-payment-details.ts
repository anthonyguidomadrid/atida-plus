import type { SagaIterator } from 'redux-saga'
import { AxiosResponse } from 'axios'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  adyenPaymentDetailsTrigger,
  adyenPaymentDetailsRequest,
  adyenPaymentDetailsSuccess,
  adyenPaymentDetailsFailure,
  adyenPaymentDetailsFulfill
} from '../slices'
import { getErrorMessage } from '~helpers/error'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  AdyenPaymentDetailsLoad,
  AdyenPaymentDetailsResponseData
} from '../types'

function* doAdyenPaymentDetails({
  payload
}: PayloadAction<AdyenPaymentDetailsLoad>) {
  try {
    yield put(adyenPaymentDetailsRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<AdyenPaymentDetailsResponseData> = yield call(
      client.post,
      '/api/checkout/adyen-payment-details',
      payload
    )

    yield put(adyenPaymentDetailsSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        adyenPaymentDetailsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        adyenPaymentDetailsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(adyenPaymentDetailsFulfill())
  }
}

export function* adyenPaymentDetailsSaga(): SagaIterator {
  yield all([takeLatest(adyenPaymentDetailsTrigger, doAdyenPaymentDetails)])
}
