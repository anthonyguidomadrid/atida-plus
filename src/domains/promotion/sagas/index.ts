import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { getPromotionSaga } from './get-promotion'

export function* promotionSaga(): SagaIterator {
  yield all([getPromotionSaga].map(fork))
}
