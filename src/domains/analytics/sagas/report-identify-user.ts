import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest } from 'redux-saga/effects'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { sha256 } from 'js-sha256'
import { triggerReportIdentifyUser } from '..'
import { selectCustomerReference } from '~domains/account/selectors/customer'
import { analyticsIdentifyCompletedChannel } from './channels'
import { ReportIdentifyUser } from '~domains/analytics/types'

// Fires on Newsletter subscription, Customer creation and Sign in
export function* doReportIdentifyUserSaga({
  payload
}: PayloadAction<ReportIdentifyUser>): SagaIterator {
  const userId = yield select(selectCustomerReference)

  typeof analytics !== 'undefined' &&
    analytics.identify(
      userId,
      removeUndefinedPropertiesFromObject({
        email: payload.email,
        first_name: payload.first_name,
        email_hash: payload.email && sha256(payload.email.trim().toLowerCase())
      }),
      () => {
        analyticsIdentifyCompletedChannel.put({})
      }
    )
}

export function* reportIdentifyUserSaga(): SagaIterator {
  yield all([takeLatest(triggerReportIdentifyUser, doReportIdentifyUserSaga)])
}
