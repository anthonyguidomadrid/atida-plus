import type { SagaIterator } from 'redux-saga'
import { all, takeEvery, select, take } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportMobileFilterAndSortOpened
} from '..'

export function* doReportMobileFilterAndSortOpened(): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  typeof analytics !== 'undefined' &&
    analytics.track('Mobile Filter and Sort Opened', {})
}

export function* reportMobileFilterAndSortOpened(): SagaIterator {
  yield all([
    takeEvery(
      triggerReportMobileFilterAndSortOpened,
      doReportMobileFilterAndSortOpened
    )
  ])
}
