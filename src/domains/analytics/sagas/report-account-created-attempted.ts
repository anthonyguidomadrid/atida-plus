import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportAccountCreatedAttempted
} from '..'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportSocial, ReportAccountType } from '~domains/analytics/types'

export function* doReportAccountCreatedAttemptedSaga({
  payload
}: PayloadAction<ReportSocial & ReportAccountType>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  typeof analytics !== 'undefined' &&
    analytics.track('Account Created Attempted', {
      is_social: !!payload.is_social,
      social_platform:
        (payload.social_platform && payload.social_platform.toLowerCase()) ??
        '',
      account_type: payload.account_type
    })
}

export function* reportAccountCreatedAttemptedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportAccountCreatedAttempted,
      doReportAccountCreatedAttemptedSaga
    )
  ])
}
