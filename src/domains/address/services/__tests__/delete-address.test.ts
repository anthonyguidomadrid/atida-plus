/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { token } from '../../../account/__mocks__/token'
import { deleteAddress } from '../delete-address'

describe(deleteAddress, () => {
  const { serverRuntimeConfig } = getConfig()
  const locale = 'pt-pt'
  const user = {
    token: token.accessToken
  }
  const data = {
    reference: 'some-reference',
    addressId: 'some-id'
  }

  it('creates the client & passes the locale to the spryker request', async () => {
    await deleteAddress(locale, data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.delete).toHaveBeenCalledWith(
      `/customers/${data.reference}/addresses/${data.addressId}`
    )
  })
})
