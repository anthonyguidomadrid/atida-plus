/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { braintreeData, clientTokenData } from '../../__mocks__/braintree-data'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { getBrainTreeToken } from '../get-braintree-token'
import { token } from '../../../account/__mocks__/token'
import { customerData } from '~domains/checkout/__mocks__/checkout'
describe(getBrainTreeToken, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue(clientTokenData)
  })
  const { serverRuntimeConfig } = getConfig()

  it('creates the client & passes the locale and access token to spryker request', async () => {
    await getBrainTreeToken(
      'en-gb',
      { customer: customerData },
      token.accessToken
    )
    expect(createClient).toHaveBeenCalledWith({
      addAnonymousCustomerUniqueId: false,
      locale: 'en-gb',
      options: {
        baseURL: serverRuntimeConfig.paymentsBaseURL
      }
    })
    expect(axios.post).toHaveBeenCalledWith(
      '/create-client-token',
      {
        customer: customerData
      },
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        }
      }
    )
  })

  it('returns the normalized client token response', async () => {
    const response = await getBrainTreeToken(
      'en-gb',
      { customer: customerData },
      token.accessToken
    )
    expect(response).toEqual(braintreeData)
  })
})
