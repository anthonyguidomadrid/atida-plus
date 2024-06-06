import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import { triggerReportShippingMethodSelected } from '..'
import { ReportShippingMethodSelected } from '../types'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  selectCartId,
  selectSelectedPaymentMethod,
  selectShipmentMethods
} from '~domains/checkout'
import { selectHasPreviousSuccessfulOrder } from '~domains/account/selectors/customer'

export function* doReportShippingMethodSelected({
  payload
}: PayloadAction<ReportShippingMethodSelected>): SagaIterator {
  const cartId = yield select(selectCartId)
  const hasPreviousSuccessfulOrder = yield select(
    selectHasPreviousSuccessfulOrder
  )
  const shipmentMethods = yield select(selectShipmentMethods)
  const selectedPaymentMethod = yield select(selectSelectedPaymentMethod)
  const shipmentMethod = shipmentMethods.find(
    ({ id }: { id: string }) => id === payload.shipping_method
  ).attributes?.carrierName

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Shipping Method Selected',
      removeUndefinedPropertiesFromObject({
        cart_id: cartId,
        shipping_method: shipmentMethod,
        payment_method: selectedPaymentMethod
          ? selectedPaymentMethod
          : undefined,
        step: 1,
        is_first_order: !hasPreviousSuccessfulOrder
      })
    )
}

export function* reportShippingMethodSelectedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportShippingMethodSelected,
      doReportShippingMethodSelected
    )
  ])
}
