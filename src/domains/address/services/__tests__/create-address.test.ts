/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { createAddress } from '../create-address'
import { address } from '~domains/address/__mocks__/addresses'
import { token } from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

describe(createAddress, () => {
  const data = {
    ...address,
    reference: 'some-Id'
  }
  const { serverRuntimeConfig } = getConfig()
  const user = {
    token: token.accessToken
  }

  it('creates the client & passes the locale and token to spryker request', async () => {
    await createAddress('en-gb', data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost['en-gb'],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.post).toHaveBeenCalledTimes(1)

    expect(axios.post).toHaveBeenCalledWith(`/customers/some-Id/addresses`, {
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
          iso2Code: data.iso2Code,
          isDefaultShipping: data.isDefaultShipping,
          isDefaultBilling: data.isDefaultBilling
        }
      }
    })
  })
})
