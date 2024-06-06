import getConfig from 'next/config'
import { createClient } from '~helpers'
import type {
  SprykerCustomerAddress,
  DeleteAddressTriggerPayload
} from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const deleteAddress = async (
  locale: string,
  data: DeleteAddressTriggerPayload,
  user: {
    token?: string
  }
): Promise<undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: {
      baseURL: serverRuntimeConfig.ecommerceHost[locale],
      headers: user.token
        ? {
            Authorization: `Bearer ${user.token}`
          }
        : undefined
    }
  })

  await client.delete<SprykerCustomerAddress>(
    `/customers/${data.reference}/addresses/${data.addressId}`
  )

  return
}
