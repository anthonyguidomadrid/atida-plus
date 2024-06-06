import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, call, getContext, put, takeEvery } from 'redux-saga/effects'
import { logger } from '~helpers'
import {
  fetchStaticRecommendationTrigger,
  fetchStaticRecommendationRequest,
  fetchStaticRecommendationSuccess,
  fetchStaticRecommendationFailure,
  fetchStaticRecommendationFulfill
} from '../slices'

import { getErrorMessage } from '~helpers/error'
import {
  FetchStaticRecommendation,
  FetchStaticRecommendationTriggerPayload
} from '../types'

export const dispatchStaticRecommendationFetchRequest = async (
  data: FetchStaticRecommendationTriggerPayload,
  locale: string
): Promise<any> => {
  const {
    fetchStaticRecommendation
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require('../services/static-recommendation')
  return fetchStaticRecommendation(locale, data)
}

function* doFetchStaticRecommendationSaga({
  payload
}: PayloadAction<FetchStaticRecommendationTriggerPayload>) {
  try {
    yield put(fetchStaticRecommendationRequest())
    const locale: string = yield getContext('locale')
    const apiResponse: FetchStaticRecommendation[] = yield call(
      dispatchStaticRecommendationFetchRequest,
      payload,
      locale
    )

    yield put(fetchStaticRecommendationSuccess(apiResponse))
  } catch (error) {
    const errorMessages = getErrorMessage(error)
    logger.error(errorMessages)
    if (Array.isArray(errorMessages)) {
      yield put(
        fetchStaticRecommendationFailure({
          message: errorMessages[0]
        })
      )
    } else {
      yield put(
        fetchStaticRecommendationFailure({
          message: errorMessages
        })
      )
    }
  } finally {
    yield put(fetchStaticRecommendationFulfill())
  }
}

export function* fetchStaticRecommendationSaga(): SagaIterator {
  yield all([
    takeEvery(fetchStaticRecommendationTrigger, doFetchStaticRecommendationSaga)
  ])
}
