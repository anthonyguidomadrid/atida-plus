import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { fetchSeoBlockSaga } from './fetch-seo'

export function* seoBlockSaga(): SagaIterator {
  yield all([fetchSeoBlockSaga].map(fork))
}
