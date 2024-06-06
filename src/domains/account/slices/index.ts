import { combineReducers } from '@reduxjs/toolkit'
import { createCustomerSlice } from './create-customer'
import { CreateAccountProgressSlice } from './create-account-progress'
import { loginSlice } from './login'
import { logoutSlice } from './logout'
import { setNewPasswordSlice } from './set-new-password'
import { passwordForgottenSlice } from './password-forgotten'
import { verifyResetPasswordTokenSlice } from './verify-reset-password-token'
import { customerSlice } from './customer'
import { updateCustomerPersonalDetailsSlice } from './update-customer-personal-details'
import { updateBusinessDetailsSlice } from './update-business-details'
import { updateCustomerPasswordSlice } from './update-customer-password'
import { orderHistorySlice } from './order-history'
import { orderDetailsSlice } from './order-details'
import { createNewAddressSlice } from '~domains/account/slices/create-new-address'
import { updateTaxReferenceSlice } from './update-tax-reference'
import { customerCheckSlice } from './customer-check'
import { cashBalanceSlice } from './cash-balance'
import { cashTransactionsSlice } from './cash-transactions'

export const accountReducer = combineReducers({
  'create-customer': createCustomerSlice.reducer,
  'create-account-progress': CreateAccountProgressSlice.reducer,
  login: loginSlice.reducer,
  logout: logoutSlice.reducer,
  'set-new-password': setNewPasswordSlice.reducer,
  'password-forgotten': passwordForgottenSlice.reducer,
  'verify-reset-password-token': verifyResetPasswordTokenSlice.reducer,
  customer: customerSlice.reducer,
  'update-customer-personal-details':
    updateCustomerPersonalDetailsSlice.reducer,
  'update-business-details': updateBusinessDetailsSlice.reducer,
  'create-new-address': createNewAddressSlice.reducer,
  'order-history': orderHistorySlice.reducer,
  'order-details': orderDetailsSlice.reducer,
  'update-customer-password': updateCustomerPasswordSlice.reducer,
  'update-tax-reference': updateTaxReferenceSlice.reducer,
  'customer-check': customerCheckSlice.reducer,
  'cash-balance': cashBalanceSlice.reducer,
  'cash-transactions': cashTransactionsSlice.reducer
})

export const {
  trigger: createCustomerTrigger,
  request: createCustomerRequest,
  success: createCustomerSuccess,
  failure: createCustomerFailure,
  fulfill: createCustomerFulfill,
  clear: createCustomerClear
} = createCustomerSlice.actions

export const {
  setCurrentStep,
  resetCurrentStep
} = CreateAccountProgressSlice.actions

export const {
  trigger: loginTrigger,
  triggerNotification: loginTriggerNotification,
  clearNotification: loginClearNotification,
  clearError: loginClearError,
  request: loginRequest,
  success: loginSuccess,
  failure: loginFailure,
  fulfill: loginFulfill,
  clearMessages: clearLoginMessages,
  setEmail: loginSetEmail
} = loginSlice.actions

export const {
  trigger: logoutTrigger,
  request: logoutRequest,
  success: logoutSuccess,
  failure: logoutFailure,
  fulfill: logoutFulfill
} = logoutSlice.actions

export const {
  trigger: setNewPasswordTrigger,
  request: setNewPasswordRequest,
  success: setNewPasswordSuccess,
  failure: setNewPasswordFailure,
  fulfill: setNewPasswordFulfill,
  clearState: setNewPasswordClearState
} = setNewPasswordSlice.actions

export const {
  trigger: passwordForgottenTrigger,
  request: passwordForgottenRequest,
  success: passwordForgottenSuccess,
  failure: passwordForgottenFailure,
  fulfill: passwordForgottenFulfill,
  resetState: passwordForgottenResetState
} = passwordForgottenSlice.actions

export const {
  trigger: verifyResetPasswordTokenTrigger,
  request: verifyResetPasswordTokenRequest,
  success: verifyResetPasswordTokenSuccess,
  failure: verifyResetPasswordTokenFailure,
  fulfill: verifyResetPasswordTokenFulfill
} = verifyResetPasswordTokenSlice.actions

export const {
  trigger: getCustomerTrigger,
  request: getCustomerRequest,
  success: getCustomerSuccess,
  failure: getCustomerFailure,
  fulfill: getCustomerFulfill,
  readCustomer: readCustomer,
  triggerReadCustomer: triggerReadCustomer,
  triggerShowNotification: triggerShowCustomerNotification,
  triggerHideNotification: triggerHideCustomerNotification,
  invoiceRequireTrigger: invoiceRequireTrigger,
  invoiceRequireSuccess: invoiceRequireSuccess,
  invoiceRequireFailure: invoiceRequireFailure,
  clearData: clearDataCustomer
} = customerSlice.actions

export const {
  trigger: updateCustomerPersonalDetailsTrigger,
  request: updateCustomerPersonalDetailsRequest,
  success: updateCustomerPersonalDetailsSuccess,
  failure: updateCustomerPersonalDetailsFailure,
  fulfill: updateCustomerPersonalDetailsFulfill,
  hideNotificationTrigger: updateCustomerPersonalDetailsHideNotificationTrigger,
  hideNotification: updateCustomerPersonalDetailsHideNotification
} = updateCustomerPersonalDetailsSlice.actions

export const {
  trigger: updateBusinessDetailsTrigger,
  request: updateBusinessDetailsRequest,
  success: updateBusinessDetailsSuccess,
  failure: updateBusinessDetailsFailure,
  fulfill: updateBusinessDetailsFulfill
} = updateBusinessDetailsSlice.actions

export const {
  trigger: createNewAddressTrigger,
  request: createNewAddressRequest,
  success: createNewAddressSuccess,
  failure: createNewAddressFailure,
  fulfill: createNewAddressFulfill
} = createNewAddressSlice.actions

export const {
  trigger: orderHistoryTrigger,
  request: orderHistoryRequest,
  success: orderHistorySuccess,
  failure: orderHistoryFailure,
  fulfill: orderHistoryFulfill,
  clearDetails: orderHistoryClearDetails
} = orderHistorySlice.actions

export const {
  trigger: orderDetailsTrigger,
  request: orderDetailsRequest,
  success: orderDetailsSuccess,
  failure: orderDetailsFailure,
  fulfill: orderDetailsFulfill,
  resetState: orderDetailsResetState
} = orderDetailsSlice.actions

export const {
  trigger: updateCustomerPasswordTrigger,
  request: updateCustomerPasswordRequest,
  success: updateCustomerPasswordSuccess,
  failure: updateCustomerPasswordFailure,
  fulfill: updateCustomerPasswordFulfill,
  hideNotificationTrigger: updateCustomerPasswordHideNotificationTrigger,
  hideNotification: updateCustomerPasswordHideNotification
} = updateCustomerPasswordSlice.actions

export const {
  trigger: updateTaxReferenceTrigger,
  request: updateTaxReferenceRequest,
  success: updateTaxReferenceSuccess,
  failure: updateTaxReferenceFailure,
  fulfill: updateTaxReferenceFulfill,
  clearError: clearUpdateTaxReferenceError
} = updateTaxReferenceSlice.actions

export const {
  trigger: customerCheckTrigger,
  request: customerCheckRequest,
  success: customerCheckSuccess,
  failure: customerCheckFailure,
  fulfill: customerCheckFulfill,
  clear: customerCheckClear
} = customerCheckSlice.actions

export const {
  trigger: getCashBalanceTrigger,
  request: getCashBalanceRequest,
  success: getCashBalanceSuccess,
  failure: getCashBalanceFailure,
  fulfill: getCashBalanceFulfill
} = cashBalanceSlice.actions

export const {
  trigger: getCashTransactionsTrigger,
  request: getCashTransactionsRequest,
  success: getCashTransactionsSuccess,
  failure: getCashTransactionsFailure,
  fulfill: getCashTransactionsFulfill
} = cashTransactionsSlice.actions
