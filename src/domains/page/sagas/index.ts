import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { commonSaga } from './common'
import { pageContentSaga } from './page-content'
import { pageRedirectSaga } from './page-redirect'

export function* pageSaga(): SagaIterator {
  yield all([commonSaga, pageContentSaga, pageRedirectSaga].map(fork))
}
