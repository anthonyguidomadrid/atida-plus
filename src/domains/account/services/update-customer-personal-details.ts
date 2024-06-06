import getConfig from 'next/config'
import { createClient } from '~helpers'
import type {
  UpdatedJWTAndRefreshTokens,
  SprykerUpdatedJWTAndRefreshTokens,
  SprykerCustomer,
  UpdateCustomerPersonalDetails,
  CustomerAddress
} from '../types'
import { normalizeUpdatedJWTAndRefreshTokens } from '~domains/account/normalizers'
import { FeatureFlagValue } from '~components/helpers/FeatureFlags/hooks'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const updateCustomerPersonalDetails = async (
  locale: string,
  data: UpdateCustomerPersonalDetails & {
    reference: string
    addressId: string
  },
  user: {
    token?: string
    refreshToken?: string
  },
  isPhoneNumberAgainstCustomerEnabled: FeatureFlagValue
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
          ...(data.salutation && { salutation: data.salutation }),
          firstName: data.firstName,
          lastName: data.lastName,
          ...(data.taxReference && { taxReference: data.taxReference }),
          receivePersonalRecommendations: data.receivePersonalRecommendations,
          receivePinnedProductsNotifications:
            data.receivePinnedProductsNotifications,
          ...(isPhoneNumberAgainstCustomerEnabled ? { phone: data.phone } : {}),
          ...(data.dateOfBirth && {
            dateOfBirth: data.dateOfBirth
          })
        }
      }
    }),
    !isPhoneNumberAgainstCustomerEnabled &&
      data.addressId &&
      (await client.patch<CustomerAddress>(
        `/customers/${data.reference}/addresses/${data.addressId}`,
        {
          data: {
            type: 'addresses',
            attributes: {
              ...(!data.customerAddressesIds && {
                firstName: data.firstName,
                lastName: data.lastName
              }),
              phone: data.phone,
              address1: data.address,
              zipCode: data.zipCode,
              iso2Code: data.iso2Code,
              city: data.city,
              country: data.country
            }
          }
        }
      ))
  ])

  // Since phone number is stored at address level, we need to update the phone number of all the addresses related to that customer
  !isPhoneNumberAgainstCustomerEnabled &&
    data.customerAddressesIds &&
    data.customerAddressesIds.length > 0 &&
    data.customerAddressesIds?.forEach(async addressId => {
      addressId !== data.addressId &&
        (await client.patch<CustomerAddress>(
          `/customers/${data.reference}/addresses/${addressId}`,
          {
            data: {
              type: 'addresses',
              attributes: {
                phone: data.phone
              }
            }
          }
        ))
    })
  if (data.firstName || data.lastName) {
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
  return
}
