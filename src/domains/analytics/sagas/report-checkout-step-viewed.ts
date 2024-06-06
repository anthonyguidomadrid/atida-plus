import type { SagaIterator } from 'redux-saga'
import { all, select, takeLatest, call } from 'redux-saga/effects'
import { triggerReportCheckoutStepViewed } from '..'
import {
  selectActiveStep,
  selectCartId,
  selectGuestStep,
  selectShipmentMethods,
  steps
} from '~domains/checkout'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  removeUndefinedPropertiesFromObject,
  cookieStorageMechanism
} from '~helpers'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { getCustomerTokenName } from '~domains/account'

export function* doReportCheckoutStepViewedSaga({}: PayloadAction): SagaIterator {
  const isLoggedIn = yield select(selectIsLoggedIn)
  const step = isLoggedIn
    ? yield select(selectActiveStep)
    : yield select(selectGuestStep)
  const shipmentMethod = yield select(selectShipmentMethods)
  const cartId = yield select(selectCartId)

  const storageMechanism = cookieStorageMechanism()
  const CUSTOMER_TOKEN_NAME = getCustomerTokenName()
  const customer = yield call(storageMechanism.get, CUSTOMER_TOKEN_NAME)
  const parsedCustomer = yield call(JSON.parse, customer ?? '{}')

  typeof analytics !== 'undefined' &&
    analytics.track(
      'Checkout Step Viewed',
      removeUndefinedPropertiesFromObject({
        cart_id: cartId,
        shipping_method:
          shipmentMethod && shipmentMethod[0].attributes.carrierName,
        step: isLoggedIn ? step + 1 : step,
        step_name: isLoggedIn ? steps[step + 1].id : steps[step].id,
        nonInteraction: 1,
        is_social: !!parsedCustomer.is_social,
        social_platform: parsedCustomer.social_platform
      })
    )
}

export function* reportCheckoutStepViewedSaga(): SagaIterator {
  yield all([
    takeLatest(triggerReportCheckoutStepViewed, doReportCheckoutStepViewedSaga)
  ])
}
