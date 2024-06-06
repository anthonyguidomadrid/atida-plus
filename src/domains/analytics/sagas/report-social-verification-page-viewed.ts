import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportSocialVerificationPageViewed
} from '..'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportSocial } from '~domains/analytics/types'

export function* doReportSocialVerificationPageViewedSaga({
  payload
}: PayloadAction<ReportSocial>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  typeof analytics !== 'undefined' &&
    analytics.track('Social Verification Page Viewed', {
      social_platform:
        (payload.social_platform && payload.social_platform.toLowerCase()) ??
        '',
      is_existing_customer: true
    })
}

export function* reportSocialVerificationPageViewedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportSocialVerificationPageViewed,
      doReportSocialVerificationPageViewedSaga
    )
  ])
}
