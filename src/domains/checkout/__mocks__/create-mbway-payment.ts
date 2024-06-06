import { customerData } from './checkout'

export const createMBWayPaymentData = {
  amount: 1000,
  orderId: 'PT-1234',
  customer: {
    ...customerData,
    phone: '351#969770085'
  }
}

export const createMBWayPaymentResponseData = {
  internal_ref: 'someRef'
}
