import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { socialLoginSaga } from './login'
import { socialVerifySaga } from './verify'

export function* socialSaga(): SagaIterator {
  yield all([socialLoginSaga, socialVerifySaga].map(fork))
}
