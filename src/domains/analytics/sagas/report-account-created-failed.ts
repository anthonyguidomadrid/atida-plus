import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportAccountCreatedFailed } from '..'
import { ReportErrorInfo, ReportSocial, ReportAccountType } from '../types'

export function* doReportAccountCreatedFailedSaga({
  payload
}: PayloadAction<
  ReportErrorInfo & ReportSocial & ReportAccountType
>): SagaIterator {
  typeof analytics !== 'undefined' &&
    analytics.track('Account Created Failed', {
      is_social: !!payload.is_social,
      social_platform:
        (payload.social_platform && payload.social_platform.toLowerCase()) ??
        '',
      error_key: payload.error_key ?? undefined,
      error_message: payload.error_message ?? undefined,
      account_type: payload.account_type
    })
}

export function* reportAccountCreatedFailedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportAccountCreatedFailed,
      doReportAccountCreatedFailedSaga
    )
  ])
}
