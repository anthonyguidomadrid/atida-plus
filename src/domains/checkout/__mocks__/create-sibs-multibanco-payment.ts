import { customerData } from './checkout'

export const createSIBSMultibancoPaymentData = {
  amount: 1000,
  orderId: 'PT-1234',
  customer: customerData
}

export const createSIBSMultibancoPaymentResponseData = {
  internal_ref: 'someRef',
  payment_reference: 'someReference',
  payment_entity: 'someEntity',
  amount: 1000,
  expire_at: '2021-08-23T14:12:09+01:00'
}
