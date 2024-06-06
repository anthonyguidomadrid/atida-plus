import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeLatest
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  getBasketCancel,
  getBasketFailure,
  getBasketFulfill,
  getBasketRequest,
  getBasketSuccess,
  getBasketTrigger
} from '../slices'
import { BasketWithProducts } from '../types'
import { selectWasSuccess } from '../selectors'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getErrorMessage } from '~helpers/error'

function* getBasket({
  payload
}: PayloadAction<{ force: boolean } | undefined>) {
  try {
    const basketWasFetched: boolean = yield select(selectWasSuccess)
    if (basketWasFetched && !payload?.force) {
      yield put(getBasketCancel())
    } else {
      yield put(getBasketRequest())
      const locale: string = yield getContext('locale')
      const client = createClient({
        locale,
        addAnonymousCustomerUniqueId: true
      })
      const response: AxiosResponse<BasketWithProducts> = yield call(
        client.get,
        `/api/basket/get?locale=${locale}`
      )
      yield put(getBasketSuccess(response.data))
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        getBasketFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        getBasketFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getBasketFulfill())
  }
}

export function* getBasketSaga(): SagaIterator {
  yield all([takeLatest(getBasketTrigger, getBasket)])
}
