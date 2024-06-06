import getConfig from 'next/config'
import { createClient } from '~helpers'
import type {
  SprykerCustomer,
  UpdateBusinessDetailsTriggerPayload
} from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const updateBusinessDetails = async (
  locale: string,
  data: UpdateBusinessDetailsTriggerPayload & {
    reference: string
  },
  token: string
): Promise<void> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: {
      baseURL: serverRuntimeConfig.ecommerceHost[locale],
      headers: token
        ? {
            Authorization: `Bearer ${token}`
          }
        : undefined
    }
  })

  await client.patch<SprykerCustomer>(`/customers/${data.reference}`, {
    data: {
      type: 'customers',
      attributes: {
        company: data.companyName,
        taxReference: data.taxReference,
        ...(typeof data.equivalenceSurcharge !== 'undefined' && {
          surcharge: data.equivalenceSurcharge
        })
      }
    }
  })

  return
}
