import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportBasketIconClicked
} from '..'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportBasketIconClicked } from '../types'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export function* doReportBasketIconClickedSaga({
  payload
}: PayloadAction<ReportBasketIconClicked>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)
  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)

  const { icon_clicked_from } = payload

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Basket Icon Clicked',
      removeUndefinedPropertiesFromObject({
        icon_clicked_from
      })
    )
}

export function* reportBasketIconClickedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportBasketIconClicked, doReportBasketIconClickedSaga)
  ])
}
