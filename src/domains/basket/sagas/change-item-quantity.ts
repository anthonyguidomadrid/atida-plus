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
import { StrictEffect } from '@redux-saga/types'

import { createClient, logger } from '~helpers'
import { getItemQuantity } from '~domains/basket/helpers/get-item-quantity'
import { selectId, selectItems } from '../selectors'
import {
  changeItemQuantityTrigger,
  changeItemQuantityRequest,
  changeItemQuantitySuccess,
  changeItemQuantityFailure,
  changeItemQuantityFulfill,
  getBasketSuccess
} from '../slices'
import {
  triggerReportProductAdded,
  triggerReportProductRemoved
} from '~domains/analytics'
import { ChangeItemQuantityPayload, BasketWithProducts } from '../types'
import {
  ReportProductAddedLoad,
  ReportProductRemovedLoad
} from '~domains/analytics/types'
import { isJson } from '~helpers/isJson'
import { ApiError, getErrorMessage } from '~helpers/error'

function* doChangeItemQuantity({
  payload
}: PayloadAction<ChangeItemQuantityPayload>): Generator<
  StrictEffect,
  void,
  any
> {
  try {
    yield put(changeItemQuantityRequest(payload))
    const basketId: string = yield select(selectId)
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const currentItems: ReturnType<typeof selectItems> = yield select(
      selectItems
    )
    const quantity = getItemQuantity(currentItems, payload.sku)

    const response: AxiosResponse<BasketWithProducts> = yield call(
      client.patch,
      '/api/basket/change-item-quantity',
      { ...payload, basketId }
    )
    if (quantity) {
      const analyticsPayload = {
        sku: payload.sku as string,
        quantity: payload.quantity,
        quantity_difference:
          quantity > payload.quantity
            ? quantity - payload.quantity
            : payload.quantity - quantity
      }

      quantity > payload.quantity
        ? yield put(
            triggerReportProductRemoved({
              ...analyticsPayload,
              removed_from: payload.changed_from
            } as ReportProductRemovedLoad)
          )
        : yield put(
            triggerReportProductAdded({
              ...analyticsPayload,
              data: response.data,
              added_from: payload.changed_from
            } as ReportProductAddedLoad)
          )
    }
    yield put(changeItemQuantitySuccess({ ...payload, data: response.data }))
    const currentItem = response.data.items?.find(
      basketItem => basketItem.sku === payload.sku && !basketItem.isPromo
    )

    if (currentItem?.hasPromotionalItemOnQuantityChange) {
      yield put(getBasketSuccess(response.data))
      yield put(
        triggerReportProductAdded({
          sku: currentItem?.gift?.sku,
          quantity: currentItem?.gift?.quantity,
          data: response.data,
          added_from: payload.changed_from
        } as ReportProductAddedLoad)
      )
    }
  } catch (error) {
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

    Array.isArray(getErrorMessage(error))
      ? yield put(
          changeItemQuantityFailure({
            ...payload,
            message: getErrorMessage(error)[0],
            details: {
              error: getErrorMessage(error),
              not_available_items: errorDetail?.['not_available_items']
            }
          })
        )
      : yield put(
          changeItemQuantityFailure({
            ...payload,
            message: getErrorMessage(error),
            details: {
              error: getErrorMessage(error),
              not_available_items: errorDetail?.['not_available_items']
            }
          })
        )
  } finally {
    yield put(changeItemQuantityFulfill(payload))
  }
}

export function* changeItemQuantitySaga(): SagaIterator {
  yield all([takeEvery(changeItemQuantityTrigger, doChangeItemQuantity)])
}
