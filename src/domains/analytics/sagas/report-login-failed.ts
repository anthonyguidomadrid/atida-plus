import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportLoginFailed } from '..'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { ReportLoginFailed } from '../types'
import { sha256 } from 'js-sha256'

export function* doReportLoginFailedSaga({
  payload
}: PayloadAction<ReportLoginFailed>): SagaIterator {
  const { event, error_message, error_key, email } = payload

  typeof analytics !== 'undefined' &&
    analytics.track(
      event ?? 'Login Failed' /* 'Login Failed' or 'Account Blocked' */,
      removeUndefinedPropertiesFromObject({
        email_hash: email && sha256(email.trim().toLowerCase()),
        error_message,
        error_key,
        is_social: !!payload.is_social,
        social_platform:
          (payload.social_platform && payload.social_platform.toLowerCase()) ??
          ''
      })
    )
}

export function* reportLoginFailedSaga(): SagaIterator {
  yield all([takeLatest(triggerReportLoginFailed, doReportLoginFailedSaga)])
}
