import type { SagaIterator } from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import { createCustomerSaga } from './create-customer'
import { loginSaga } from './login'
import { logoutSaga } from './logout'
import { passwordForgottenSaga } from './password-forgotten'
import { setNewPasswordSaga } from './set-new-password'
import { verifyResetPasswordTokenSaga } from './verify-reset-password-token'
import { getCustomerSaga } from './get-customer'
import {
  updateCustomerPersonalDetailsSaga,
  updateCustomerPersonalDetailsNotificationSaga
} from './update-customer-personal-details'
import { updateBusinessDetailsSaga } from './update-business-details'
import {
  updateCustomerPasswordsSaga,
  updatePasswordHideNotificationSaga
} from './update-customer-password'
import { orderHistorySaga } from './order-history'
import { orderDetailsSaga } from './order-details'
import { createNewAddressSaga } from '~domains/account/sagas/create-new-address'
import { updateTaxReferenceSaga } from '~domains/account/sagas/update-tax-reference'
import { customerCheckSaga } from '~domains/account/sagas/customer-check'
import { getCashBalanceSaga } from '~domains/account/sagas/get-cash-balance'
import { getCashTransactionsSaga } from '~domains/account/sagas/get-cash-transactions'
import { customerRequestInvoiceSaga } from './customer-invoice-required'

export function* accountSaga(): SagaIterator {
  yield all(
    [
      createCustomerSaga,
      customerCheckSaga,
      loginSaga,
      logoutSaga,
      passwordForgottenSaga,
      setNewPasswordSaga,
      verifyResetPasswordTokenSaga,
      getCustomerSaga,
      updateCustomerPersonalDetailsSaga,
      createNewAddressSaga,
      updateCustomerPersonalDetailsNotificationSaga,
      updateBusinessDetailsSaga,
      updateCustomerPasswordsSaga,
      updatePasswordHideNotificationSaga,
      orderHistorySaga,
      orderDetailsSaga,
      updateTaxReferenceSaga,
      getCashBalanceSaga,
      getCashTransactionsSaga,
      customerRequestInvoiceSaga
    ].map(fork)
  )
}
