import { takeEvery, all } from 'redux-saga/effects'
import type { SagaIterator } from 'redux-saga'

import { triggerReportGridListViewToggled } from '~domains/analytics'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportGridListViewToggled } from '~domains/analytics/types'

function* doReportGridListViewToggledSaga({
  payload
}: PayloadAction<ReportGridListViewToggled>): SagaIterator {
  typeof analytics !== 'undefined' &&
    analytics.track('Page View Toggled', payload)
}

export function* reportGridListViewToggledSaga(): SagaIterator {
  yield all([
    takeEvery(triggerReportGridListViewToggled, doReportGridListViewToggledSaga)
  ])
}
