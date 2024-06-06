import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import type { SagaIterator } from 'redux-saga'
import {
  all,
  call,
  getContext,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  addPrescriptionToBasketTrigger,
  addPrescriptionToBasketRequest,
  addPrescriptionToBasketSuccess,
  addPrescriptionToBasketFailure,
  addPrescriptionToBasketFulfill
} from '../slices'
import { selectId } from '~domains/basket'
import { ApiError, getErrorMessage } from '~helpers/error'
import { BasketWithProducts } from '../types'
import { isJson } from '~helpers/isJson'

function* doAddPrescriptionToBasket({
  payload
}: PayloadAction<string | string[]>) {
  try {
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const cartId: string = yield select(selectId)

    yield put(addPrescriptionToBasketRequest())
    const response: AxiosResponse<BasketWithProducts> = yield call(
      client.post,
      '/api/basket/add-prescription',
      { cartId, prescriptionToken: payload }
    )

    yield put(addPrescriptionToBasketSuccess(response.data))
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
        payload,
        errorDetail
      })
    )
    if (Array.isArray(errorMessages)) {
      yield put(
        addPrescriptionToBasketFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        addPrescriptionToBasketFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(addPrescriptionToBasketFulfill())
  }
}
export function* addPrescriptionToBasketSaga(): SagaIterator {
  yield all([
    takeEvery(addPrescriptionToBasketTrigger, doAddPrescriptionToBasket)
  ])
}
