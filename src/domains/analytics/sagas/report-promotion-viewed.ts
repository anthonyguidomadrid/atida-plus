import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, takeLeading } from 'redux-saga/effects'
import { ReportPromotionData } from '~domains/analytics/types'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { triggerReportPromotionViewed } from '~domains/analytics'

export function* doReportPromotionViewedSaga({
  payload
}: PayloadAction<ReportPromotionData>): SagaIterator {
  const { promotion_id, name, creative, index } = payload

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Promotion Viewed',
      removeUndefinedPropertiesFromObject({
        promotion_id,
        name,
        position: index,
        creative
      })
    )
}

export function* reportPromotionViewedSaga(): SagaIterator {
  yield all([
    takeLeading(triggerReportPromotionViewed, doReportPromotionViewedSaga)
  ])
}
