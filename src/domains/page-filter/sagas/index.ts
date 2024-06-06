import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { getPageFilterSaga } from './get-page-filter'

export function* pageFilterSaga(): SagaIterator {
  yield all([getPageFilterSaga].map(fork))
}
