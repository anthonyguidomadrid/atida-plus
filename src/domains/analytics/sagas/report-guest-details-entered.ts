import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportGuestDetailsEntered } from '..'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export function* doReportGuestDetailsEnteredSaga(): SagaIterator {
  typeof analytics !== 'undefined' &&
    analytics.track(
      'Guest Details Entered',
      removeUndefinedPropertiesFromObject({})
    )
}

export function* reportGuestDetailsEnteredSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportGuestDetailsEntered,
      doReportGuestDetailsEnteredSaga
    )
  ])
}
