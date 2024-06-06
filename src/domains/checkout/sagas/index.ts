import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { setCheckoutDataSaga } from './set-checkout-data'
import { createOrderSaga } from '~domains/checkout/sagas/create-order'
import { getBrainTreeTokenSaga } from '~domains/checkout/sagas/get-braintree-token'
import { createPaymentMethodSaga } from '~domains/checkout/sagas/create-payment-method'
import { getOrderSaga } from './get-order'
import { createMBWayPaymentSaga } from './create-mbway-payment'
import { createsibsMultibancoPaymentSaga } from './create-sibs-multibanco-payment'
import { createDeviceDataSaga } from './create-device-data'
import { createBizumPaymentSaga } from './create-bizum-payment'
import { cancelOrderSaga } from './cancel-order'
import { adyenPaymentMethodsSaga } from './adyen-payment-methods'
import { reOrderSaga } from './re-order'
import { createAdyenPaymentSaga } from './create-adyen-payment'
import { adyenPaymentDetailsSaga } from './adyen-payment-details'
import { createMultiplePaymentsSaga } from './create-multiple-payments'

export function* checkoutSaga(): SagaIterator {
  yield all(
    [
      setCheckoutDataSaga,
      createOrderSaga,
      getBrainTreeTokenSaga,
      createPaymentMethodSaga,
      createMBWayPaymentSaga,
      getOrderSaga,
      createsibsMultibancoPaymentSaga,
      createDeviceDataSaga,
      createBizumPaymentSaga,
      cancelOrderSaga,
      adyenPaymentMethodsSaga,
      reOrderSaga,
      createAdyenPaymentSaga,
      adyenPaymentDetailsSaga,
      createMultiplePaymentsSaga
    ].map(fork)
  )
}
