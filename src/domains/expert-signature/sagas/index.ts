import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import { expertSignatureSaga } from './expert-signature'

export function* expertSignaturesSaga(): SagaIterator {
  yield all([expertSignatureSaga].map(fork))
}
