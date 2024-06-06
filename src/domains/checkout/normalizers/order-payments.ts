import { removeUndefinedPropertiesFromObject } from '~helpers'
import { OrderPaymentData, SprykerOrderPaymentData } from '../types'

export const normalizeOrderPayments = (
  orderPaymentData?: SprykerOrderPaymentData
): OrderPaymentData =>
  removeUndefinedPropertiesFromObject({
    paymentIdentifier: orderPaymentData?.data?.attributes?.paymentIdentifier
  })
