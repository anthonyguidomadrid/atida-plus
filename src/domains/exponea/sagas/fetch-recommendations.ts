import type { PayloadAction } from '@reduxjs/toolkit'
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
  fetchRecommendationsTrigger,
  fetchRecommendationsRequest,
  fetchRecommendationsSuccess,
  fetchRecommendationsFailure,
  fetchRecommendationsFulfill
} from '../slices'
import { selectCustomerDetails } from '~domains/account/selectors/customer'
import { ExponeaRecommendationPayload } from '~domains/exponea/types'
import { getErrorMessage } from '~helpers/error'
import { StrictEffect } from '@redux-saga/types'

function* doFetchRecommendationsSaga({
  payload
}: PayloadAction<ExponeaRecommendationPayload>): Generator<
  StrictEffect,
  void,
  any
> {
  try {
    const customerDetails = yield select(selectCustomerDetails)
    yield put(fetchRecommendationsRequest())
    const locale = yield getContext('locale')
    const client = createClient({ locale })
    const response = yield call(client.post, '/api/recommendations/fetch', {
      email: customerDetails ? customerDetails.email : undefined,
      recommendationId: payload.recommendationId,
      productId: payload.productId ?? undefined,
      categoryId: payload.categoryId ?? undefined,
      itemsQuantity: payload.itemsQuantity ?? undefined
    })
    yield put(fetchRecommendationsSuccess(response.data))
    // This might be needed in the future for analytics TODO: Send recommendation event to segment
    // yield put(triggerReportRecommendation())
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        fetchRecommendationsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        fetchRecommendationsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(fetchRecommendationsFulfill())
  }
}

export function* fetchRecommendationsSaga(): SagaIterator {
  yield all([
    takeEvery(fetchRecommendationsTrigger, doFetchRecommendationsSaga)
  ])
}
