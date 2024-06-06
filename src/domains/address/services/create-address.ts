import getConfig from 'next/config'
import { createClient } from '~helpers'
import { CustomerAddress, SprykerCustomerAddress } from '~domains/address'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const createAddress = async (
  locale: string,
  data: CustomerAddress & {
    reference: string
  },
  user: {
    token?: string
  }
): Promise<void> => {
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

  await client.post<SprykerCustomerAddress>(
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
          houseNumber: data.houseNumber,
          addition: data.addition,
          zipCode: data.zipCode,
          city: data.city,
          ...(locale === 'es-es' && { province: data.subdivision }),
          ...(locale === 'pt-pt' && { district: data.subdivision }),
          iso2Code: data.iso2Code,
          isDefaultShipping: data.isDefaultShipping,
          isDefaultBilling: data.isDefaultBilling
        }
      }
    }
  )
}
