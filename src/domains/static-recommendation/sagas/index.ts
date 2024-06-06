import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import { fetchStaticRecommendationSaga } from './static-recommendation'

export function* staticRecommendationSaga(): SagaIterator {
  yield all([fetchStaticRecommendationSaga].map(fork))
}
