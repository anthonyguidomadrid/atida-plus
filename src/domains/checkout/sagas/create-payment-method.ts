import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  takeLatest,
  select
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import { selectId } from '~domains/basket'
import {
  createPaymentMethodTrigger,
  createPaymentMethodRequest,
  createPaymentMethodSuccess,
  createPaymentMethodFailure,
  createPaymentMethodFulfill
} from '../slices'
import { PaymentLoad, MethodRef } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doCreatePaymentMethod({ payload }: PayloadAction<PaymentLoad>) {
  try {
    yield put(createPaymentMethodRequest())
    const basketId: string = yield select(selectId)
    const locale: string = yield getContext('locale')

    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<MethodRef> = yield call(
      client.post,
      '/api/checkout/create-payment-method',
      {
        ...payload,
        basketId
      }
    )

    yield put(createPaymentMethodSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        createPaymentMethodFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        createPaymentMethodFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(createPaymentMethodFulfill())
  }
}

export function* createPaymentMethodSaga(): SagaIterator {
  yield all([takeLatest(createPaymentMethodTrigger, doCreatePaymentMethod)])
}
