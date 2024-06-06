import getConfig from 'next/config'
import { createClient } from '~helpers'
import { BizumPaymentLoad, BizumResponseData } from '~domains/checkout/types'

export const createBizumPayment = async (
  locale: string,
  data: BizumPaymentLoad,
  accessToken: string
): Promise<BizumResponseData> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })
  const { invoice_ref } = data

  const bizumPaymentResponse = await paymentClient.post<BizumResponseData>(
    '/create-bizum-payment',
    {
      ...data,
      success_url: `${serverRuntimeConfig.host}/${locale}/confirmation/${invoice_ref}`,
      failure_url: `${serverRuntimeConfig.host}/${locale}/unsuccessful/${invoice_ref}`
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return bizumPaymentResponse.data
}
