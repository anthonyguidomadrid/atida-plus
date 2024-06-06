import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { getBrandSaga } from './get-brand'

export function* brandSaga(): SagaIterator {
  yield all([getBrandSaga].map(fork))
}
