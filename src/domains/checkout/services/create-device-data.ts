import getConfig from 'next/config'
import { createClient } from '~helpers'
import { BraintreeDeviceData } from '~domains/checkout/types'

export const createDeviceData = (
  locale: string,
  data: BraintreeDeviceData,
  accessToken: string
): void => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })

  paymentClient.post<BraintreeDeviceData>(
    '/create-device-data',
    {
      customer_browser: data.customer_browser,
      ip_address: data.ip_address,
      device_data: data.device_data,
      customer: data.customer
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}
