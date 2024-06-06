/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { updateCustomerPersonalDetails } from '../update-customer-personal-details'
import {
  updatedPersonalDetails,
  updatedAddress,
  updatedCustomer,
  UpdatedJWTAndRefreshTokens
} from '~domains/account/__mocks__/update-customer-personal-details'
import { token } from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

describe(updateCustomerPersonalDetails, () => {
  beforeEach(() => {
    ;(axios.patch as jest.Mock)
      .mockResolvedValueOnce(updatedCustomer.data)
      .mockResolvedValueOnce(updatedAddress.data)
    ;(axios.post as jest.Mock).mockResolvedValueOnce(UpdatedJWTAndRefreshTokens)
  })

  const data = {
    ...updatedPersonalDetails,
    reference: 'some-Id',
    addressId: 'some-addressId'
  }
  const { serverRuntimeConfig } = getConfig()
  const user = {
    token: token.accessToken,
    refreshToken: 'some-refresh-token'
  }

  it('creates the client & passes the locale and token to spryker request', async () => {
    await updateCustomerPersonalDetails('en-gb', data, user, true)
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

    expect(axios.patch).toHaveBeenCalledWith(`/customers/some-Id`, {
      data: {
        type: 'customers',
        attributes: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone
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

  it('creates the client & update addresses with phone number & passes the locale and token to spryker request', async () => {
    await updateCustomerPersonalDetails('en-gb', data, user, false)
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost['en-gb'],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })

    expect(axios.patch).toHaveBeenCalledTimes(2)

    expect(axios.patch).toHaveBeenCalledWith(`/customers/some-Id`, {
      data: {
        type: 'customers',
        attributes: {
          firstName: data.firstName,
          lastName: data.lastName
        }
      }
    })

    expect(axios.patch).toHaveBeenCalledWith(
      `/customers/some-Id/addresses/some-addressId`,
      {
        data: {
          type: 'addresses',
          attributes: {
            firstName: data.firstName,
            lastName: data.lastName,
            address1: data.address,
            zipCode: data.zipCode,
            iso2Code: data.iso2Code,
            city: data.city,
            phone: data.phone,
            country: data.country
          }
        }
      }
    )

    expect(axios.post).toHaveBeenCalledWith('/refresh-tokens', {
      data: {
        type: 'refresh-tokens',
        attributes: {
          refreshToken: 'some-refresh-token'
        }
      }
    })
  })

  describe('test udpate customer details', () => {
    it('with available customerAddressesIds', async () => {
      const dataCustomer = {
        ...updatedPersonalDetails,
        reference: 'some-Id',
        addressId: 'some-addressId',
        customerAddressesIds: ['1']
      }
      await updateCustomerPersonalDetails('en-gb', dataCustomer, user, false)
      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: serverRuntimeConfig.ecommerceHost['en-gb'],
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      })
      expect(axios.patch).toHaveBeenCalledTimes(3)
    })
    it('with undefined firstName and lastName ', async () => {
      const dataCustomer = {
        ...updatedPersonalDetails,
        reference: 'some-Id',
        addressId: 'some-addressId',
        customerAddressesIds: ['1'],
        firstName: undefined,
        lastName: undefined
      }
      await updateCustomerPersonalDetails('en-gb', dataCustomer, user, false)
      expect(axios.post).toBeCalledTimes(0)
    })
  })
})
