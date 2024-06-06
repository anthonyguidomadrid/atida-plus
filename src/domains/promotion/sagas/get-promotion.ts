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
import { selectSkip, selectFilters, selectId } from '../selectors'
import {
  getPromotionFailure,
  getPromotionFulfill,
  getPromotionRequest,
  getPromotionSuccess,
  getPromotionTrigger
} from '../slices'
import { Promos } from '~domains/contentful/normalizers/promotion'
import { getErrorMessage } from '~helpers/error'
import { StrictEffect } from '@redux-saga/types'

const dispatchPromotionsFetchRequest = async (
  locale: string,
  skip: string | string[],
  filters: string[],
  id: string,
  preview?: boolean
): Promise<Promos> => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchPromotions } = require('../services/fetch-promotions')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { fetchPromotionById } = require('../services/fetch-promotion-by-id')

    return id
      ? fetchPromotionById(locale, skip, id)
      : fetchPromotions(locale, skip, filters, preview)
  } else {
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response = await client.get<Promos>('/api/promotion/get', {
      params: removeUndefinedPropertiesFromObject({
        skip: skip,
        filters: filters ? filters?.join() : undefined,
        id,
        preview
      })
    })

    return response.data
  }
}

function* getPromotion({
  payload
}: ReturnType<typeof getPromotionTrigger>): Generator<StrictEffect, void, any> {
  try {
    yield put(getPromotionRequest())
    const locale = yield getContext('locale')
    const skip = yield select(selectSkip)
    const filters = yield select(selectFilters)
    const id = yield select(selectId)
    const { preview } = payload || {}

    const apiResponse: Promos = yield call(
      dispatchPromotionsFetchRequest,
      locale,
      skip,
      filters,
      id,
      preview
    )
    yield put(getPromotionSuccess(apiResponse))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        getPromotionFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        getPromotionFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(getPromotionFulfill())
  }
}

export function* getPromotionSaga(): SagaIterator {
  yield all([takeEvery(getPromotionTrigger, getPromotion)])
}
