import type { PayloadAction } from '@reduxjs/toolkit'
import { ReportPageViewedLoad } from '../types'
import type { SagaIterator } from 'redux-saga'
import { all, select, take, takeLatest } from 'redux-saga/effects'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { triggerEmitIsSegmentInitialised, triggerReportPageViewed } from '..'
import { selectIsSegmentInitialised } from '../selectors'
import { setPageSegmentInfo } from '~helpers/pageSegmentInfo'

export function* doReportPageViewedSaga({
  payload
}: PayloadAction<ReportPageViewedLoad>): SagaIterator {
  const isSegmentInitialised = yield select(selectIsSegmentInitialised)

  if (!isSegmentInitialised) yield take(triggerEmitIsSegmentInitialised)
  const page = payload.page
  const category =
    payload?.category && Object.values(payload?.category?.path ?? {}).join('/')

  if (page !== 'Search As You Type') {
    setPageSegmentInfo(page, payload.pageType)
  }
  typeof analytics !== 'undefined' &&
    analytics.page(
      page,
      removeUndefinedPropertiesFromObject({
        page_type: payload?.pageType,
        category,
        product_id: payload?.productId,
        payment_method: payload?.paymentMethod
      })
    )
}

export function* reportPageViewedSaga(): SagaIterator {
  yield all([takeLatest(triggerReportPageViewed, doReportPageViewedSaga)])
}
