import getConfig from 'next/config'
import { createClient } from '~helpers'
import {
  StripeMultibancoPaymentData,
  StripeMultibancoResponseData
} from '~domains/checkout/types'

export const createStripeMultibancoPayment = async (
  locale: string,
  data: StripeMultibancoPaymentData,
  accessToken: string
): Promise<StripeMultibancoResponseData> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  const stripeMultibancoPaymentResponse = await paymentClient.post<StripeMultibancoResponseData>(
    '/create-multibanco-payment',
    {
      amount: data.amount,
      invoice_ref: data.orderId,
      return_url: data.returnUrl,
      customer: data.customer
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return stripeMultibancoPaymentResponse.data
}
