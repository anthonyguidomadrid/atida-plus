import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest } from 'redux-saga/effects'
import { triggerReportCouponAdded } from '..'
import { ReportCouponAdded } from '../types'
import { selectId, selectTotals } from '~domains/basket'
import type { PayloadAction } from '@reduxjs/toolkit'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export function* doReportCouponAdded({
  payload
}: PayloadAction<ReportCouponAdded>): SagaIterator {
  const { amount, code, displayName } = payload
  const cartId = yield select(selectId)
  const totals = yield select(selectTotals)
  typeof analytics !== 'undefined' &&
    analytics.track(
      'Coupon Added',
      removeUndefinedPropertiesFromObject({
        cart_id: cartId,
        coupon_id: code,
        coupon_name: displayName,
        discount: (amount ?? 0) / 100,
        discount_percent:
          amount && Math.round((amount / totals.subTotal) * 100) / 100
      })
    )
}

export function* reportCouponAddedSaga(): SagaIterator {
  yield all([takeLatest(triggerReportCouponAdded, doReportCouponAdded)])
}
