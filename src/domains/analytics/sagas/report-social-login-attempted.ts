import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportSocialLoginAttempted
} from '..'
import { ReportSocialLoginAttempted } from '../types'

export function* doReportSocialLoginAttempted({
  payload
}: PayloadAction<ReportSocialLoginAttempted>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  typeof analytics !== 'undefined' &&
    analytics.track('Social Login Attempted', {
      social_platform:
        payload.social_platform && payload.social_platform.toLocaleLowerCase(),
      button_clicked_from: payload.clickedFrom
    })
}

export function* reportSocialLoginAttempted(): SagaIterator {
  yield all([
    takeLatest(triggerReportSocialLoginAttempted, doReportSocialLoginAttempted)
  ])
}
