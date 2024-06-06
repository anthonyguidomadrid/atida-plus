import getConfig from 'next/config'
import {
  PAYMENT_OPTIONS,
  ADYEN_PAYMENT_METHODS
} from '~config/constants/payments'
import {
  AdyenPaymentMethodsResponse,
  AdyenPaymentMethodsData
} from '~domains/checkout/types'
import { createClient } from '~helpers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const adyenPaymentMethods = async (
  locale: string,
  data: AdyenPaymentMethodsData,
  accessToken: string
): Promise<AdyenPaymentMethodsResponse> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  const response = await paymentClient.post('/adyen-payment-methods', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const allowedPaymentMethods = response?.data?.paymentMethods?.reduce(
    (accumulator: string[], { type }: { type: string }) => {
      switch (type) {
        case ADYEN_PAYMENT_METHODS.APPLE_PAY:
          accumulator.push(PAYMENT_OPTIONS.ADYEN_APPLE_PAY)
          break
        case ADYEN_PAYMENT_METHODS.GOOGLE_PAY:
          accumulator.push(PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY)
          break
        case ADYEN_PAYMENT_METHODS.KLARNA_PAY_OVER_TIME:
          accumulator.push(PAYMENT_OPTIONS.ADYEN_KLARNA_PAY_OVER_TIME)
          break
        case ADYEN_PAYMENT_METHODS.MBWAY:
          accumulator.push(PAYMENT_OPTIONS.ADYEN_MB_WAY)
          break
        case ADYEN_PAYMENT_METHODS.MULTIBANCO:
          accumulator.push(PAYMENT_OPTIONS.ADYEN_MULTIBANCO)
          break
        case ADYEN_PAYMENT_METHODS.CARD:
          accumulator.push(PAYMENT_OPTIONS.ADYEN_CARD)
          break
        default:
          break
      }
      return accumulator
    },
    []
  )

  return {
    data: response.data,
    allowedPaymentMethods
  }
}
