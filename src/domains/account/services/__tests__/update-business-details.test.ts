/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { updateBusinessDetails } from '../update-business-details'
import { updateBusinessDetailsPayload } from '~domains/account/__mocks__/update-business-details'
import { token } from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

describe(updateBusinessDetails, () => {
  beforeEach(() => {
    axios.patch as jest.Mock
  })

  const data = {
    ...updateBusinessDetailsPayload
  }
  const { serverRuntimeConfig } = getConfig()
  const user = token.accessToken

  it('creates the client & passes the locale and token to spryker request', async () => {
    await updateBusinessDetails('en-gb', data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost['en-gb'],
        headers: {
          Authorization: `Bearer ${user}`
        }
      }
    })

    expect(axios.patch).toHaveBeenCalledTimes(1)

    expect(axios.patch).toHaveBeenCalledWith(`/customers/${data.reference}`, {
      data: {
        type: 'customers',
        attributes: {
          company: data.companyName,
          taxReference: data.taxReference,
          surcharge: data.equivalenceSurcharge
        }
      }
    })
  })
})
