import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, takeLeading } from 'redux-saga/effects'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { triggerReportPromotionClicked } from '..'
import { ReportPromotionData } from '../types'

export function* doReportPromotionClickedSaga({
  payload
}: PayloadAction<ReportPromotionData>): SagaIterator {
  const { promotion_id, name, creative, index, is_sponsored_content } = payload
  typeof analytics !== 'undefined' &&
    analytics.track(
      'Promotion Clicked',
      removeUndefinedPropertiesFromObject({
        promotion_id,
        name: name,
        position: index && index + 1,
        creative,
        is_sponsored_content
      })
    )
}

export function* reportPromotionClickedSaga(): SagaIterator {
  yield all([
    takeLeading(triggerReportPromotionClicked, doReportPromotionClickedSaga)
  ])
}
