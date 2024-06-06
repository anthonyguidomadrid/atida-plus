import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeEvery } from 'redux-saga/effects'
import { createClient, logger } from '~helpers'
import {
  fetchAllRecommendationsTrigger,
  fetchAllRecommendationsRequest,
  fetchAllRecommendationsSuccess,
  fetchAllRecommendationsFailure,
  fetchAllRecommendationsFulfill
} from '../slices'
import {
  ExponeaAllRecommendationsTriggerPayload,
  FetchAllRecommendationsResponse
} from '~domains/exponea/types'
import { AxiosResponse } from 'axios'
import { getErrorMessage } from '~helpers/error'

const dispatchAllRecommendationsFetchRequest = async (
  locale: string,
  type: string
): Promise<FetchAllRecommendationsResponse> => {
  if (typeof window === 'undefined') {
    const {
      fetchAllRecommendations
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require('../services/fetch-all-recommendations')
    return fetchAllRecommendations(locale, type)
  } else {
    const client = createClient({ locale, addAnonymousCustomerUniqueId: false })
    const response: AxiosResponse<FetchAllRecommendationsResponse> = await client.post(
      '/api/recommendations/fetch-all',
      {
        type: type
      }
    )
    return response.data
  }
}

function* doFetchAllRecommendationsSaga({
  payload
}: PayloadAction<ExponeaAllRecommendationsTriggerPayload>) {
  try {
    yield put(fetchAllRecommendationsRequest())
    const locale: string = yield getContext('locale')
    const apiResponse: FetchAllRecommendationsResponse = yield call(
      dispatchAllRecommendationsFetchRequest,
      locale,
      payload.type
    )
    yield put(fetchAllRecommendationsSuccess(apiResponse))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        fetchAllRecommendationsFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        fetchAllRecommendationsFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(fetchAllRecommendationsFulfill())
  }
}

export function* fetchAllRecommendationsSaga(): SagaIterator {
  yield all([
    takeEvery(fetchAllRecommendationsTrigger, doFetchAllRecommendationsSaga)
  ])
}
