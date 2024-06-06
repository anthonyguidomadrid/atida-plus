import getConfig from 'next/config'
import { AdyenPaymentDetailsLoad } from '~domains/checkout/types'
import { createClient } from '~helpers'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const adyenPaymentDetails = async (
  locale: string,
  data: AdyenPaymentDetailsLoad,
  accessToken: string
): Promise<string[]> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  const response = await paymentClient.post('/adyen-payment-details', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response.data
}
