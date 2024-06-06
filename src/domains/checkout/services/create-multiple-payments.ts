import getConfig from 'next/config'
import { createClient } from '~helpers'
import {
  MultiplePaymentsLoad,
  MultiplePaymentsResponseData
} from '~domains/checkout/types'

export const createMultiplePayments = async (
  locale: string,
  data: MultiplePaymentsLoad,
  accessToken: string
): Promise<MultiplePaymentsResponseData> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  const payload = { ...data }

  if (payload.adyen) {
    const { reference } = payload.adyen
    payload.adyen.origin = `${serverRuntimeConfig.host}/${locale}`
    payload.adyen.returnUrl = `${serverRuntimeConfig.host}/${
      locale !== 'de-de' ? `${locale}/` : ''
    }checkout/adyen-status?orderId=${reference}`
  }

  if (payload.redsys_bizum) {
    const { invoice_ref } = payload.redsys_bizum
    payload.redsys_bizum.success_url = `${serverRuntimeConfig.host}/${locale}/confirmation/${invoice_ref}`
    payload.redsys_bizum.failure_url = `${serverRuntimeConfig.host}/${locale}/unsuccessful/${invoice_ref}`
  }

  const multiplePaymentsResponse = await paymentClient.post<MultiplePaymentsResponseData>(
    '/create-multiple-payments',
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return multiplePaymentsResponse.data
}
