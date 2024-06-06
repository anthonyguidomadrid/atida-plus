import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportGuestDetailsPageViewed } from '..'

export function* doReportGuestDetailsPageViewed(): SagaIterator {
  typeof analytics !== 'undefined' &&
    analytics.track('Guest Details Page Viewed')
}

export function* reportGuestDetailsPageViewed(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportGuestDetailsPageViewed,
      doReportGuestDetailsPageViewed
    )
  ])
}
