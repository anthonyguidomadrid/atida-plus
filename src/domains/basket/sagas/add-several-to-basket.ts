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
import {
  createClient,
  logger,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import {
  addSeveralToBasketTrigger,
  addToBasketRequest,
  addToBasketSuccess,
  addToBasketFailure,
  addToBasketFulfill
} from '../slices'
import { selectItems } from '~domains/basket'
import { triggerReportProductAdded } from '~domains/analytics'
import { AddSeveralToBasketPayload, BasketWithProducts } from '../types'
import { ReportProductAddedLoad } from '~domains/analytics/types'
import { getErrorMessage } from '~helpers/error'

function* doAddSeveralToBasket({
  payload
}: PayloadAction<AddSeveralToBasketPayload>) {
  try {
    const locale: string = yield getContext('locale')
    const client = createClient({ locale, addAnonymousCustomerUniqueId: true })
    const basketItems: ReturnType<typeof selectItems> = yield select(
      selectItems
    )
    if (payload.skus && payload.skus.length > 0) {
      yield put(
        addToBasketRequest(
          removeUndefinedPropertiesFromObject({
            ...payload,
            skus: undefined,
            sku: payload.skus[payload.skus.length - 1]
          })
        )
      )
      const response: AxiosResponse<BasketWithProducts> = yield call(
        client.post,
        '/api/basket/add',
        removeUndefinedPropertiesFromObject({
          ...payload,
          skus: undefined,
          sku: payload.skus[payload.skus.length - 1],
          hasPreviousItems: !!basketItems.length
        })
      )
      yield put(
        addToBasketSuccess(
          removeUndefinedPropertiesFromObject({
            ...payload,
            skus: undefined,
            sku: payload.skus[payload.skus.length - 1],
            data: response.data
          })
        )
      )
      const analyticsPayload = removeUndefinedPropertiesFromObject({
        ...payload,
        skus: undefined,
        sku: payload.skus[payload.skus.length - 1] as string,
        data: response.data
      })

      yield put(
        triggerReportProductAdded(analyticsPayload as ReportProductAddedLoad)
      )
      const item = response.data.items.find(
        el => el.sku == payload.skus?.[payload.skus.length - 1]
      )
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
    }
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        addToBasketFailure(
          removeUndefinedPropertiesFromObject({
            ...payload,
            skus: undefined,
            sku: payload.skus?.[payload.skus?.length - 1],
            message: errorMessages[0]
          })
        )
      )
    } else {
      yield put(
        addToBasketFailure(
          removeUndefinedPropertiesFromObject({
            ...payload,
            skus: undefined,
            sku: payload.skus?.[payload.skus?.length - 1],
            message: errorMessages
          })
        )
      )
    }
  } finally {
    yield put(
      addToBasketFulfill(
        removeUndefinedPropertiesFromObject({
          ...payload,
          skus: undefined,
          sku: payload.skus?.[payload.skus?.length - 1]
        })
      )
    )
    if (payload.skus && payload.skus.length > 1) {
      payload.skus.pop()
      yield put(addSeveralToBasketTrigger({ ...payload }))
    }
  }
}

export function* addSeveralToBasketSaga(): SagaIterator {
  yield all([takeEvery(addSeveralToBasketTrigger, doAddSeveralToBasket)])
}
