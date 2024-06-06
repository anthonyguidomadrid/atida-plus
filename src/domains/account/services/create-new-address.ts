import getConfig from 'next/config'
import { createClient } from '~helpers'
import type {
  UpdatedJWTAndRefreshTokens,
  SprykerUpdatedJWTAndRefreshTokens,
  CreateNewAddress
} from '../types'
import { normalizeUpdatedJWTAndRefreshTokens } from '~domains/account/normalizers'
import { CustomerAddress, SprykerCustomer } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const createNewAddress = async (
  locale: string,
  data: CreateNewAddress & {
    reference: string
  },
  user: {
    token?: string
    refreshToken?: string
  }
): Promise<UpdatedJWTAndRefreshTokens | undefined> => {
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
  await Promise.all([
    await client.patch<SprykerCustomer>(`/customers/${data.reference}`, {
      data: {
        type: 'customers',
        attributes: {
          firstName: data.firstName,
          lastName: data.lastName
        }
      }
    }),
    await client.post<CustomerAddress>(
      `/customers/${data.reference}/addresses`,
      {
        data: {
          type: 'addresses',
          attributes: {
            customer_reference: data.reference,
            salutation: data.salutation,
            firstName: data.firstName,
            lastName: data.lastName,
            address1: data.address1,
            address3: data.address3,
            zipCode: data.zipCode,
            city: data.city,
            iso2Code: data.iso2Code,
            phone: data.phone,
            isDefaultShipping: data.isDefaultShipping,
            isDefaultBilling: data.isDefaultBilling
          }
        }
      }
    )
  ])

  const response = await client.post<SprykerUpdatedJWTAndRefreshTokens>(
    '/refresh-tokens',
    {
      data: {
        type: 'refresh-tokens',
        attributes: {
          refreshToken: user.refreshToken
        }
      }
    }
  )

  return normalizeUpdatedJWTAndRefreshTokens(response.data)
}
