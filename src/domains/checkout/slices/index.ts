import { combineReducers } from '@reduxjs/toolkit'
import { dataSlice } from './data'
import { stepperSlice } from './stepper'
import { createOrderSlice } from './create-order'
import { braintreeSlice } from './create-braintree-token'
import { createPaymentMethodSlice } from './create-payment-method'
import { getOrderSlice } from './get-order'
import { createMBWayPaymentSlice } from './create-mbway-payment'
import { createSIBSMultibancoPaymentSlice } from './create-sibs-multibanco-payment'
import { deviceDataSlice } from './create-device-data'
import { createBizumPaymentSlice } from './create-bizum-payment'
import { cancelOrderSlice } from './cancel-order'
import { adyenPaymentMethodsSlice } from './adyen-payment-methods'
import { reOrderSlice } from './re-order'
import { createAdyenPaymentSlice } from './create-adyen-payment'
import { adyenPaymentDetailsSlice } from './adyen-payment-details'
import { selectedPaymentMethodSlice } from './selected-payment-method'
import { createMultiplePaymentsSlice } from './create-multiple-payments'

export const checkoutReducer = combineReducers({
  data: dataSlice.reducer,
  createOrder: createOrderSlice.reducer,
  paymentMethod: createPaymentMethodSlice.reducer,
  braintree: braintreeSlice.reducer,
  stepper: stepperSlice.reducer,
  getOrder: getOrderSlice.reducer,
  mbWayPayment: createMBWayPaymentSlice.reducer,
  sibsMultibanco: createSIBSMultibancoPaymentSlice.reducer,
  deviceData: deviceDataSlice.reducer,
  bizum: createBizumPaymentSlice.reducer,
  cancelOrder: cancelOrderSlice.reducer,
  adyenPaymentMethods: adyenPaymentMethodsSlice.reducer,
  reOrder: reOrderSlice.reducer,
  adyenPayment: createAdyenPaymentSlice.reducer,
  adyenPaymentDetails: adyenPaymentDetailsSlice.reducer,
  selectedPaymentMethod: selectedPaymentMethodSlice.reducer,
  multiplePayments: createMultiplePaymentsSlice.reducer
})

export const {
  trigger: setDataTrigger,
  request: setDataRequest,
  success: setDataSuccess,
  failure: setDataFailure,
  fulfill: setDataFulfill,
  clearDetails: setDataClear,
  clearError: setDataClearError
} = dataSlice.actions

export const {
  trigger: createDeviceDataTrigger,
  request: createDeviceDataRequest,
  success: createDeviceDataSuccess,
  failure: createDeviceDataFailure,
  fulfill: createDeviceDataFulfill
} = deviceDataSlice.actions

export const {
  setActiveStep,
  resetActiveReachedSteps,
  setGuestStep,
  setIsPaymentStepActive
} = stepperSlice.actions
export const {
  trigger: createOrderTrigger,
  request: createOrderRequest,
  success: createOrderSuccess,
  failure: createOrderFailure,
  fulfill: createOrderFulfill,
  setOrderId: createOrderSetOrderId,
  setTemporaryBasket: createOrderSetTemporaryBasket,
  clearDetails: createOrderClearDetails,
  resetState: createOrderResetState,
  clearError: createOrderClearError,
  clearTemporaryBasket: createOrderClearTemporaryBasket
} = createOrderSlice.actions

export const {
  trigger: getBrainTreeTokenTrigger,
  request: getBrainTreeTokenRequest,
  success: getBrainTreeTokenSuccess,
  failure: getBrainTreeTokenFailure,
  fulfill: getBrainTreeTokenFulfill,
  error: setBrainTreeError,
  clearDetails: clearBrainTreeDetails,
  clearToken: clearBraintreeToken
} = braintreeSlice.actions

export const {
  trigger: createPaymentMethodTrigger,
  request: createPaymentMethodRequest,
  success: createPaymentMethodSuccess,
  failure: createPaymentMethodFailure,
  fulfill: createPaymentMethodFulfill,
  setMethodCode: createPaymentMethodSetMethodCode,
  clearDetails: createPaymentMethodClearDetails,
  clearMethodCode: createPaymentMethodClearMethodCode,
  setError: createPaymentMethodSetError
} = createPaymentMethodSlice.actions

export const {
  trigger: mbWayPaymentTrigger,
  request: mbWayPaymentRequest,
  success: mbWayPaymentSuccess,
  failure: mbWayPaymentFailure,
  fulfill: mbWayPaymentFulfill,
  clearDetails: mbWayPaymentClearDetails
} = createMBWayPaymentSlice.actions

export const {
  trigger: sibsMultibancoPaymentTrigger,
  request: sibsMultibancoPaymentRequest,
  success: sibsMultibancoPaymentSuccess,
  failure: sibsMultibancoPaymentFailure,
  fulfill: sibsMultibancoPaymentFulfill,
  clearDetails: sibsMultibancoPaymentClearDetails
} = createSIBSMultibancoPaymentSlice.actions

export const {
  trigger: getOrderTrigger,
  request: getOrderRequest,
  success: getOrderSuccess,
  failure: getOrderFailure,
  fulfill: getOrderFulfill,
  resetState: getOrderResetState
} = getOrderSlice.actions

export const {
  trigger: bizumPaymentTrigger,
  request: bizumPaymentRequest,
  success: bizumPaymentSuccess,
  failure: bizumPaymentFailure,
  fulfill: bizumPaymentFulfill,
  clearDetails: bizumPaymentClearDetails
} = createBizumPaymentSlice.actions

export const {
  trigger: cancelOrderTrigger,
  request: cancelOrderRequest,
  success: cancelOrderSuccess,
  failure: cancelOrderFailure,
  fulfill: cancelOrderFulfill,
  resetState: cancelOrderResetState
} = cancelOrderSlice.actions

export const {
  trigger: adyenPaymentMethodsTrigger,
  request: adyenPaymentMethodsRequest,
  success: adyenPaymentMethodsSuccess,
  failure: adyenPaymentMethodsFailure,
  fulfill: adyenPaymentMethodsFulfill,
  resetState: adyenPaymentMethodsResetState
} = adyenPaymentMethodsSlice.actions

export const {
  trigger: reOrderTrigger,
  request: reOrderRequest,
  success: reOrderSuccess,
  failure: reOrderFailure,
  fulfill: reOrderFulfill
} = reOrderSlice.actions

export const {
  trigger: adyenPaymentTrigger,
  request: adyenPaymentRequest,
  success: adyenPaymentSuccess,
  failure: adyenPaymentFailure,
  fulfill: adyenPaymentFulfill,
  resetState: adyenPaymentResetState,
  setError: adyenPaymentSetError
} = createAdyenPaymentSlice.actions

export const {
  trigger: adyenPaymentDetailsTrigger,
  request: adyenPaymentDetailsRequest,
  success: adyenPaymentDetailsSuccess,
  failure: adyenPaymentDetailsFailure,
  fulfill: adyenPaymentDetailsFulfill,
  resetState: adyenPaymentDetailsResetState
} = adyenPaymentDetailsSlice.actions

export const {
  setSelectedPaymentMethod,
  setIsValidPaymentMethod,
  setIsPaymentPending
} = selectedPaymentMethodSlice.actions

export const {
  trigger: createMultiplePaymentsTrigger,
  request: createMultiplePaymentsRequest,
  success: createMultiplePaymentsSuccess,
  failure: createMultiplePaymentsFailure,
  fulfill: createMultiplePaymentsFulfill,
  resetState: createMultiplePaymentsResetState,
  setError: createMultiplePaymentsSetError
} = createMultiplePaymentsSlice.actions
