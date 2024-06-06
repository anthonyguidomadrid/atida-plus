import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest, call } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import { triggerReportAddPaymentInfo } from '..'
import { ReportAddPaymentInfo } from '../types'
import {
  removeUndefinedPropertiesFromObject,
  cookieStorageMechanism
} from '~helpers'
import { selectCartId } from '~domains/checkout'
import { getCustomerTokenName } from '~domains/account'

export function* doReportAddPaymentInfo({
  payload
}: PayloadAction<ReportAddPaymentInfo>): SagaIterator {
  const cartId = yield select(selectCartId)

  const storageMechanism = cookieStorageMechanism()
  const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
  const customer = yield call(storageMechanism.get, CUSTOMER_TOKEN_NAME)
  const parsedCustomer = yield call(JSON.parse, customer ?? '{}')

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Payment Info Entered',
      removeUndefinedPropertiesFromObject({
        cart_id: cartId,
        payment_method: payload.payment_method,
        error_key: payload.error_key,
        error_message: payload.error_message,
        success: payload.success,
        is_social: !!parsedCustomer.is_social,
        social_platform: parsedCustomer.social_platform
      })
    )
}

export function* reportAddPaymentInfoSaga(): SagaIterator {
  yield all([takeLatest(triggerReportAddPaymentInfo, doReportAddPaymentInfo)])
}
