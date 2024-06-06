import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportAccountUpdated } from '../types'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportAccountUpdated } from '..'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export function* doReportAccountUpdatedSaga({
  payload
}: PayloadAction<ReportAccountUpdated>): SagaIterator {
  const { information_updated } = payload

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Account Updated',
      removeUndefinedPropertiesFromObject({
        information_updated: information_updated
      })
    )
}

export function* reportAccountUpdatedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportAccountUpdated, doReportAccountUpdatedSaga)
  ])
}
