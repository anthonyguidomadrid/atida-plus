/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { updateTaxReference } from '../update-tax-reference'
import { token } from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

describe(updateTaxReference, () => {
  const data = {
    customerReference: 'some-customer-reference',
    taxReference: 'some-tax-reference'
  }
  const { serverRuntimeConfig } = getConfig()
  const user = {
    token: token.accessToken
  }

  it('creates the client & passes the locale and token to spryker request', async () => {
    await updateTaxReference('en-gb', data, user)
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
      `/customers/some-customer-reference`,
      {
        data: {
          type: 'customers',
          attributes: {
            taxReference: data.taxReference
          }
        }
      }
    )
  })
})
