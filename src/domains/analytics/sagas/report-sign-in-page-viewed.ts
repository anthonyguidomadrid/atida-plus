import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportSignInPageViewed
} from '..'

export function* doReportSignInPageViewedSaga(): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)
  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  typeof analytics !== 'undefined' && analytics.track('Sign In Page Viewed', {})
}

export function* reportSignInPageViewedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportSignInPageViewed, doReportSignInPageViewedSaga)
  ])
}
