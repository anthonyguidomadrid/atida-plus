import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest } from 'redux-saga/effects'
import { triggerReportCouponRemoval } from '..'
import { ReportCouponRemoval } from '../types'
import { selectId, selectTotals } from '~domains/basket'
import type { PayloadAction } from '@reduxjs/toolkit'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export function* doReportCouponRemoval({
  payload
}: PayloadAction<ReportCouponRemoval>): SagaIterator {
  const { couponId, couponName, discount } = payload
  const cartId = yield select(selectId)
  const totals = yield select(selectTotals)
  typeof analytics !== 'undefined' &&
    analytics.track(
      'Coupon Removed',
      removeUndefinedPropertiesFromObject({
        cart_id: cartId,
        coupon_id: couponId,
        coupon_name: couponName,
        discount: (discount ?? 0) / 100,
        discount_percent:
          discount && Math.round((discount / totals.subTotal) * 100) / 100
      })
    )
}

export function* reportCouponRemovalSaga(): SagaIterator {
  yield all([takeLatest(triggerReportCouponRemoval, doReportCouponRemoval)])
}
