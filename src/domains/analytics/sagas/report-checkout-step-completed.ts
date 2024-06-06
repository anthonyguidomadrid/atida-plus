import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest, call } from 'redux-saga/effects'
import { triggerReportCheckoutStepCompleted } from '..'
import {
  selectActiveStep,
  selectCartId,
  selectShipmentMethods,
  steps
} from '~domains/checkout'
import { ReportCheckoutStep } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  removeUndefinedPropertiesFromObject,
  cookieStorageMechanism
} from '~helpers'
import { getCustomerTokenName } from '~domains/account'

export function* doReportCheckoutStepCompletedSaga({
  payload
}: PayloadAction<ReportCheckoutStep>): SagaIterator {
  const step = yield select(selectActiveStep)
  const shipmentMethod = yield select(selectShipmentMethods)
  const cartId = yield select(selectCartId)

  const storageMechanism = cookieStorageMechanism()
  const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
  const customer = yield call(storageMechanism.get, CUSTOMER_TOKEN_NAME)
  const parsedCustomer = yield call(JSON.parse, customer ?? '{}')

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Checkout Step Completed',
      removeUndefinedPropertiesFromObject({
        cart_id: cartId,
        payment_method: payload?.payment_method,
        shipping_method:
          shipmentMethod && shipmentMethod[0].attributes.carrierName,
        step: payload?.payment_method ? 3 : step,
        step_name: payload?.payment_method ? steps[3].id : steps[1].id,
        is_social: !!parsedCustomer.is_social,
        social_platform: parsedCustomer.social_platform
      })
    )
}

export function* reportCheckoutStepCompletedSaga(): SagaIterator {
  yield all([
    takeLatest(
      triggerReportCheckoutStepCompleted,
      doReportCheckoutStepCompletedSaga
    )
  ])
}
