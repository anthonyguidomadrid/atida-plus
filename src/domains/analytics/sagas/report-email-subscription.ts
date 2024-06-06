import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportEmailSubscription } from '../types'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportEmailSubscription } from '..'
import { sha256 } from 'js-sha256'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export function* doReportEmailSubscriptionSaga({
  payload
}: PayloadAction<ReportEmailSubscription>): SagaIterator {
  const { email, subscribed_from, email_list } = payload

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Email Subscribed',
      removeUndefinedPropertiesFromObject({
        email: email && email.trim().toLowerCase(),
        subscribed_from: subscribed_from,
        email_hash: email && sha256(email.trim().toLowerCase()),
        email_list: email_list
      })
    )
}

export function* reportEmailSubscriptionSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportEmailSubscription, doReportEmailSubscriptionSaga)
  ])
}
