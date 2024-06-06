import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportEmailUnsubscription } from '../types'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportEmailUnsubscription } from '..'
import { sha256 } from 'js-sha256'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export function* doReportEmailUnsubscriptionSaga({
  payload
}: PayloadAction<ReportEmailUnsubscription>): SagaIterator {
  const { email, unsubscribed_from, email_list } = payload

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Email Unsubscribed',
      removeUndefinedPropertiesFromObject({
        email: email,
        unsubscribed_from: unsubscribed_from,
        email_hash: email && sha256(email.trim().toLowerCase()),
        email_list: email_list
      })
    )
}

export function* reportEmailUnsubscriptionSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportEmailUnsubscription,
      doReportEmailUnsubscriptionSaga
    )
  ])
}
