import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeLatest } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  getBrainTreeTokenTrigger,
  getBrainTreeTokenRequest,
  getBrainTreeTokenSuccess,
  getBrainTreeTokenFailure,
  getBrainTreeTokenFulfill
} from '../slices'
import { ClientToken, BraintreeTokenLoad } from '../types'
import { getErrorMessage } from '~helpers/error'

function* doGetBrainTreeToken({ payload }: PayloadAction<BraintreeTokenLoad>) {
  try {
    yield put(getBrainTreeTokenRequest())
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<ClientToken> = yield call(
      client.post,
      '/api/checkout/braintree-data',
      payload
    )

    yield put(getBrainTreeTokenSuccess(response.data))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        getBrainTreeTokenFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        getBrainTreeTokenFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getBrainTreeTokenFulfill())
  }
}

export function* getBrainTreeTokenSaga(): SagaIterator {
  yield all([takeLatest(getBrainTreeTokenTrigger, doGetBrainTreeToken)])
}
