import getConfig from 'next/config'
import { createClient } from '~helpers'
import {
  SIBSMultibancoPaymentData,
  SIBSMultibancoResponseData
} from '~domains/checkout/types'

export const createSIBSMultibancoPayment = async (
  locale: string,
  data: SIBSMultibancoPaymentData,
  accessToken: string
): Promise<SIBSMultibancoResponseData> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  const sibsMultibancoPaymentResponse = await paymentClient.post<SIBSMultibancoResponseData>(
    '/create-sibs-multibanco-payment',
    {
      amount: data.amount,
      invoice_ref: data.orderId,
      customer: data.customer
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return sibsMultibancoPaymentResponse.data
}
