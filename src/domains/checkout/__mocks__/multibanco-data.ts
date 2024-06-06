import { customerData } from './checkout'

export const multibancoData = {
  amount: 1000,
  paymentReference: 'payment-ref-1234',
  returnUrl: 'http://example.com/success',
  customer: customerData,
  orderId: 'PT-1234'
}
