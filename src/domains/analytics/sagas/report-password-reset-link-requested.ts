import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest, take } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportPasswordResetLinkRequested
} from '..'

export function* doReportPasswordResetLinkRequestedSaga(): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  typeof analytics !== 'undefined' &&
    analytics.track('Password Reset Link Requested', {})
}

export function* reportPasswordResetLinkRequestedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportPasswordResetLinkRequested,
      doReportPasswordResetLinkRequestedSaga
    )
  ])
}
