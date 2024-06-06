import { removeUndefinedPropertiesFromObject } from '~helpers'
import { CheckoutData, SprykerCheckout } from '../types'

export const normalizeCreatedOrder = (
  checkoutData?: SprykerCheckout
): CheckoutData =>
  removeUndefinedPropertiesFromObject({
    orderId: checkoutData?.data?.attributes?.orderReference,
    payments: checkoutData?.included?.[0]?.attributes?.payments,
    items: checkoutData?.included?.[0]?.attributes?.items,
    expenses: checkoutData?.included?.[0]?.attributes?.expenses,
    internalPaymentReference:
      checkoutData?.included?.[0]?.attributes?.payments?.[0]?.paymentReference,
    loyaltyPaymentReference:
      checkoutData?.included?.[0]?.attributes?.payments?.[1]?.paymentReference
  })
