import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportPasswordReset } from '..'

export function* doReportPasswordResetSaga(): SagaIterator {
  typeof analytics !== 'undefined' && analytics.track('Password Reset', {})
}

export function* reportPasswordResetSaga(): SagaIterator {
  yield all([takeLatest(triggerReportPasswordReset, doReportPasswordResetSaga)])
}
