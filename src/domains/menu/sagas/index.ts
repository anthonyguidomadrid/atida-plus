import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import { fetchMenuItemCollectionSaga } from './fetch-menu-item-collection'

export function* menuSaga(): SagaIterator {
  yield all([fetchMenuItemCollectionSaga].map(fork))
}
