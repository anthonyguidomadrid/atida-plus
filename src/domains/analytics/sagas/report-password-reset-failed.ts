import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportPasswordResetFailed } from '..'
import { ReportErrorInfo } from '../types'

export function* doReportPasswordResetFailedSaga({
  payload
}: PayloadAction<ReportErrorInfo>): SagaIterator {
  typeof analytics !== 'undefined' &&
    analytics.track('Password Reset Failed', {
      error_key: payload.error_key ?? undefined,
      error_message: payload.error_message ?? undefined
    })
}

export function* reportPasswordResetFailedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportPasswordResetFailed,
      doReportPasswordResetFailedSaga
    )
  ])
}
