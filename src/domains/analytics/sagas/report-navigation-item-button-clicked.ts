import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportNavigationItemButtonClicked
} from '..'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportNavigationItemButtonClicked } from '~domains/analytics/types'

export function* doReportNavigationItemButtonClickedSaga({
  payload
}: PayloadAction<ReportNavigationItemButtonClicked>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  const { buttonName, buttonClickedFrom } = payload

  typeof analytics !== 'undefined' &&
    analytics.track('Button Clicked', {
      button_name: buttonName,
      button_clicked_from: buttonClickedFrom
    })
}

export function* reportNavigationItemButtonClickedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportNavigationItemButtonClicked,
      doReportNavigationItemButtonClickedSaga
    )
  ])
}
