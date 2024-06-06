import type { SagaIterator } from 'redux-saga'
import { all, takeLatest, select, take } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportPasswordForgotten
} from '..'

export function* doReportPasswordForgottenSaga({}): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)
  typeof analytics !== 'undefined' && analytics.track('Password Forgotten', {})
}

export function* reportPasswordForgottenSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportPasswordForgotten, doReportPasswordForgottenSaga)
  ])
}
