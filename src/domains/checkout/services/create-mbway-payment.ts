import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { MBWayPayment, MBWayPaymentResponseData } from '../types'

export const createMBWayPayment = async (
  locale: string,
  data: MBWayPayment,
  accessToken: string
): Promise<MBWayPaymentResponseData> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  const mbWayPaymentResponse = await paymentClient.post<MBWayPaymentResponseData>(
    '/create-mbway-payment',
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

  return mbWayPaymentResponse.data
}
