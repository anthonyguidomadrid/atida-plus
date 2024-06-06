import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLeading } from 'redux-saga/effects'
import { hasOwnProperty, removeUndefinedPropertiesFromObject } from '~helpers'
import {
  selectIsSegmentInitialised,
  triggerEmitIsSegmentInitialised,
  triggerReportPromotionListViewed
} from '..'
import { ReportPromotionListViewedLoad } from '../types'

export function* doReportPromotionListViewedSaga({
  payload
}: PayloadAction<ReportPromotionListViewedLoad>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)
  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)
  const promotions: unknown[] = []
  payload.promotions.forEach((item, index) => {
    promotions.push(
      removeUndefinedPropertiesFromObject({
        promotion_id: item?.id,
        name: item?.title,
        position: index + 1,
        creative: hasOwnProperty(item, 'image')
          ? item?.image?.url
          : hasOwnProperty(item, 'teaserImage')
          ? item?.teaserImage?.url
          : ''
      })
    )
  })

  typeof analytics !== 'undefined' &&
    analytics.track('Promotion List Viewed', {
      promotions,
      nonInteraction: 1
    })
}

export function* reportPromotionListViewedSaga(): SagaIterator {
  yield all([
    takeLeading(
      triggerReportPromotionListViewed,
      doReportPromotionListViewedSaga
    )
  ])
}
