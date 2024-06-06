/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { orderData, sprykerOrderData } from '../../__mocks__/checkout-data'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { token } from '../../../account/__mocks__/token'
import { getOrder } from '../get-order'

describe(getOrder, () => {
  beforeEach(() => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: sprykerOrderData })
  })
  const { serverRuntimeConfig } = getConfig()
  const locale = 'pt-pt'
  const data = { orderId: 'PT--279' }
  const user = {
    token: token.accessToken
  }
  it('creates the client & passes the locale, orderId and options with access token to the spryker request', async () => {
    await getOrder(locale, data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.get).toHaveBeenCalledWith(`/orders/${data.orderId}`)
  })

  it('returns the normalized order response', async () => {
    const response = await getOrder(locale, data, user)
    expect(response).toEqual(orderData)
  })
})
