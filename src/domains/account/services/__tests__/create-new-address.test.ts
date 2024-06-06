/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { createNewAddress } from '../create-new-address'
import {
  updatedCustomer,
  UpdatedJWTAndRefreshTokens
} from '~domains/account/__mocks__/update-customer-personal-details'
import {
  createNewAddress as createNewAddressMock,
  createNewAddressPayload
} from '~domains/account/__mocks__/create-new-address'
import { token } from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

describe(createNewAddress, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock)
      .mockResolvedValueOnce(createNewAddressPayload.data)
      .mockResolvedValueOnce(UpdatedJWTAndRefreshTokens)
    ;(axios.patch as jest.Mock).mockResolvedValueOnce(updatedCustomer.data)
  })

  const data = {
    ...createNewAddressMock,
    reference: 'some-Id'
  }
  const { serverRuntimeConfig } = getConfig()
  const user = {
    token: token.accessToken,
    refreshToken: 'some-refresh-token'
  }

  it('creates the client & passes the locale and token to spryker request', async () => {
    await createNewAddress('en-gb', data, user)
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
    expect(axios.post).toHaveBeenCalledTimes(2)

    expect(axios.patch).toHaveBeenCalledWith(`/customers/some-Id`, {
      data: {
        type: 'customers',
        attributes: {
          firstName: data.firstName,
          lastName: data.lastName
        }
      }
    })

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
          zipCode: data.zipCode,
          city: data.city,
          iso2Code: data.iso2Code,
          phone: data.phone,
          isDefaultShipping: data.isDefaultShipping,
          isDefaultBilling: data.isDefaultBilling
        }
      }
    })

    expect(axios.post).toHaveBeenCalledWith('/refresh-tokens', {
      data: {
        type: 'refresh-tokens',
        attributes: {
          refreshToken: 'some-refresh-token'
        }
      }
    })
  })
})
