import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { fetchAllRecommendationsSaga } from './fetch-all-recommendations'

import { fetchRecommendationsSaga } from './fetch-recommendations'

export function* recommendationsSaga(): SagaIterator {
  yield all([fetchRecommendationsSaga, fetchAllRecommendationsSaga].map(fork))
}
