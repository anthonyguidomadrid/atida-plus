import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import {
  select,
  all,
  call,
  getContext,
  put,
  takeEvery
} from 'redux-saga/effects'

import { createClient, logger } from '~helpers'
import { selectId } from '../selectors'
import {
  removeFromBasketTrigger,
  removeFromBasketRequest,
  removeFromBasketSuccess,
  removeFromBasketFailure,
  removeFromBasketFulfill
} from '../slices'
import { RemoveFromBasketPayload, BasketWithProducts } from '../types'
import { triggerReportProductRemoved } from '~domains/analytics'
import { ReportProductRemovedLoad } from '~domains/analytics/types'
import { ApiError, getErrorMessage } from '~helpers/error'
import { isJson } from '~helpers/isJson'

function* doRemoveFromBasket({
  payload
}: PayloadAction<RemoveFromBasketPayload>) {
  try {
    yield put(removeFromBasketRequest(payload))
    yield put(triggerReportProductRemoved(payload as ReportProductRemovedLoad))
    const basketId: string = yield select(selectId)
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })

    const response: AxiosResponse<BasketWithProducts> = yield call(
      client.post,
      '/api/basket/remove',
      { ...payload, basketId }
    )
    yield put(removeFromBasketSuccess({ ...payload, data: response.data }))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    let errorDetail = (error as ApiError)?.response?.data?.details?.detail
    errorDetail = isJson(errorDetail) ? JSON.parse(errorDetail) : errorDetail
    logger.error(
      {
        message: getErrorMessage(error),
        name: getErrorMessage(error)
      },
      JSON.stringify({
        ...payload,
        errorDetail
      })
    )
    if (Array.isArray(errorMessages)) {
      yield put(
        removeFromBasketFailure({
          ...payload,
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        removeFromBasketFailure({
          ...payload,
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(removeFromBasketFulfill(payload))
  }
}

export function* removeFromBasketSaga(): SagaIterator {
  yield all([takeEvery(removeFromBasketTrigger, doRemoveFromBasket)])
}
