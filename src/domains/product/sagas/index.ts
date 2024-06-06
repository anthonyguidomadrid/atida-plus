import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { getProductSaga } from './get-product'

export function* productSaga(): SagaIterator {
  yield all([getProductSaga].map(fork))
}
