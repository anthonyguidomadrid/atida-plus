import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { refreshYotpoWidgets } from './refresh-yotpo-widgets'

export function* yotpoSaga(): SagaIterator {
  yield all([refreshYotpoWidgets].map(fork))
}
