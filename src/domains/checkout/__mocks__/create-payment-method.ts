import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { customerData } from './checkout'

export const createPaymentMethodData = {
  methodRef: 'its-friday-theeeeen'
} as const

export const paymentMethodTriggerData = {
  method_code: PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD,
  data: {
    payment_nonce: 'chorizo portuano',
    order_id: 'PT--15186',
    amount: 2474
  },
  customer: customerData
} as const

export const createPaymentMethodResponse = {
  method_ref: 'its-friday-theeeeen'
} as const
