import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { MethodRef, MethodRefData, PaymentLoad } from '../types'
import { normalizeCreatedPaymentMethod } from '../normalizers/create-payment-method'

export const sendCreatePaymentMethod = async (
  locale: string,
  data: PaymentLoad,
  token: string
): Promise<MethodRef> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  const response = await paymentClient.post<MethodRefData>(
    '/create-payment-method',
    {
      method_code: data.method_code,
      data: data.data,
      customer: data.customer
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return normalizeCreatedPaymentMethod(response.data)
}
