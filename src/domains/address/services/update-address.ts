import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { SprykerCustomerAddress, CustomerAddress } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const updateAddress = async (
  locale: string,
  data: CustomerAddress & {
    reference: string
    addressId: string
  },
  user: {
    token?: string
    refreshToken?: string
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

  let addressData = {}
  if (data?.firstName) {
    addressData = {
      salutation: data.salutation,
      firstName: data.firstName,
      lastName: data.lastName,
      address1: data.address1,
      address2: data.address2,
      address3: data.address3,
      houseNumber: data.houseNumber,
      addition: data.addition,
      zipCode: data.zipCode,
      city: data.city,
      ...(locale === 'es-es' && { province: data.subdivision }),
      ...(locale === 'pt-pt' && { district: data.subdivision }),
      country: data.country,
      iso2Code: data.iso2Code,
      company: data.company,
      phone: data.phone
    }
  }

  await client.patch<SprykerCustomerAddress>(
    `/customers/${data.reference}/addresses/${data.addressId}`,
    {
      data: {
        type: 'addresses',
        attributes: {
          ...addressData,
          isDefaultShipping: data.isDefaultShipping,
          isDefaultBilling: data.isDefaultBilling
        }
      }
    }
  )

  return
}
