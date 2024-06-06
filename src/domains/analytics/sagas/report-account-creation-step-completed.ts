import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerReportAccountCreationStepCompleted } from '..'

export function* doReportAccountCreationStepCompletedSaga(): SagaIterator {
  typeof analytics !== 'undefined' &&
    analytics.track('Account Creation Step Completed', {
      step: 1,
      step_name: 'name_and_email'
    })
}

export function* reportAccountCreationStepCompletedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportAccountCreationStepCompleted,
      doReportAccountCreationStepCompletedSaga
    )
  ])
}
