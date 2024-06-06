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
  addToBasketTrigger,
  addToBasketRequest,
  addToBasketSuccess,
  addToBasketFailure,
  addToBasketFulfill
} from '../slices'
import { selectItems } from '~domains/basket'
import { triggerReportProductAdded } from '~domains/analytics'
import { AddToBasketPayload, BasketWithProducts } from '../types'
import { ReportProductAddedLoad } from '~domains/analytics/types'
import { ApiError, getErrorMessage } from '~helpers/error'
import { isJson } from '~helpers/isJson'

function* doAddToBasket({ payload }: PayloadAction<AddToBasketPayload>) {
  try {
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const basketItems: ReturnType<typeof selectItems> = yield select(
      selectItems
    )
    yield put(addToBasketRequest(payload))
    const response: AxiosResponse<BasketWithProducts> = yield call(
      client.post,
      '/api/basket/add',
      { ...payload, hasPreviousItems: !!basketItems.length }
    )
    yield put(addToBasketSuccess({ ...payload, data: response.data }))
    const analyticsPayload = {
      sku: payload.sku as string,
      data: response.data,
      quantity: payload.quantity,
      added_from: payload.added_from
    }

    yield put(
      triggerReportProductAdded(analyticsPayload as ReportProductAddedLoad)
    )
    const item = response.data.items.find(el => el.sku == payload.sku)
    if (!!item?.gift) {
      yield put(
        triggerReportProductAdded({
          ...analyticsPayload,
          sku: item.gift.sku as string,
          quantity: item.gift.quantity,
          isPromo: true
        } as ReportProductAddedLoad)
      )
    }
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
        addToBasketFailure({
          ...payload,
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        addToBasketFailure({
          ...payload,
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(addToBasketFulfill(payload))
  }
}

export function* addToBasketSaga(): SagaIterator {
  yield all([takeEvery(addToBasketTrigger, doAddToBasket)])
}
