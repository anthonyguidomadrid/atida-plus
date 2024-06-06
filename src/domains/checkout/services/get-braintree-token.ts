import getConfig from 'next/config'
import { createClient } from '~helpers'

import type { ClientToken, ClientTokenData, BraintreeTokenLoad } from '../types'
import { normalizeClientTokenData } from '../normalizers/braintree-token'

export const getBrainTreeToken = async (
  locale: string,
  data: BraintreeTokenLoad,
  accessToken: string
): Promise<ClientToken> => {
  const { serverRuntimeConfig } = getConfig()
  const paymentClient = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.paymentsBaseURL },
    addAnonymousCustomerUniqueId: false
  })
  const { customer } = data

  const brainTreeTokenResponse = await paymentClient.post<ClientTokenData>(
    '/create-client-token',
    {
      customer
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return normalizeClientTokenData(brainTreeTokenResponse.data)
}
