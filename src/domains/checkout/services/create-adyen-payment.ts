import getConfig from 'next/config'
import { createClient } from '~helpers'
import { AdyenPaymentLoad, AdyenResponseData } from '~domains/checkout/types'

export const createAdyenPayment = async (
  locale: string,
  data: AdyenPaymentLoad,
  accessToken: string
): Promise<AdyenResponseData> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })
  const { reference } = data

  const adyenPaymentResponse = await paymentClient.post<AdyenResponseData>(
    '/create-adyen-payment',
    {
      ...data,
      origin: `${serverRuntimeConfig.host}/${locale}`,
      returnUrl: `${serverRuntimeConfig.host}/${locale}/checkout/adyen-status?orderId=${reference}`
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return adyenPaymentResponse.data
}
