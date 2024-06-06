import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import { selectIsSegmentInitialised, triggerEmitIsSegmentInitialised } from '..'
import { triggerReportMissingAddressCheckoutPageViewed } from '../actions'

export function* doReportMissingAddressCheckoutPageViewed(): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  typeof analytics !== 'undefined' &&
    analytics.track('Missing Details Page Viewed', {})
}

export function* reportMissingAddressCheckoutPageViewed(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportMissingAddressCheckoutPageViewed,
      doReportMissingAddressCheckoutPageViewed
    )
  ])
}
