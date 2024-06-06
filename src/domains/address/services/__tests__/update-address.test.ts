/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { updateAddress } from '../update-address'
import { address } from '~domains/address/__mocks__/addresses'
import { token } from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

describe(updateAddress, () => {
  const data = {
    ...address,
    reference: 'some-Id',
    addressId: 'some-addressId'
  }
  const { serverRuntimeConfig } = getConfig()
  const user = {
    token: token.accessToken
  }

  it('creates the client & passes the locale and token to spryker request', async () => {
    await updateAddress('en-gb', data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost['en-gb'],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.patch).toHaveBeenCalledTimes(1)

    expect(axios.patch).toHaveBeenCalledWith(
      `/customers/some-Id/addresses/some-addressId`,
      {
        data: {
          type: 'addresses',
          attributes: {
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
            country: data.country,
            iso2Code: data.iso2Code,
            company: data.company,
            phone: data.phone,
            isDefaultShipping: data.isDefaultShipping,
            isDefaultBilling: data.isDefaultBilling
          }
        }
      }
    )
  })
})
