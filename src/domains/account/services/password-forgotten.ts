import getConfig from 'next/config'
import { createClient } from '~helpers'
import { CustomerAuthentication } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const passwordForgotten = async (
  locale: string,
  data: Omit<CustomerAuthentication, 'password'>
): Promise<undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] }
  })

  await client.post('/customer-forgotten-password', {
    data: {
      type: 'customer-forgotten-password',
      attributes: {
        email: data.email
      }
    }
  })

  return
}
