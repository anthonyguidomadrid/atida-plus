/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import {
  paymentCheckoutData,
  createOrderData,
  createOrderResponse
} from '../../__mocks__/checkout-data'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { setCreateOrder } from '../create-order'
import { token } from '../../../account/__mocks__/token'
describe(setCreateOrder, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: createOrderData })
  })
  const { serverRuntimeConfig } = getConfig()
  const data = {
    ...paymentCheckoutData,
    basketId: 'some-basketId',
    segmentAnonymousUserId: 'some-id',
    clientID: 'GAX.X.someClientID'
  }
  const user = {
    token: token.accessToken
  }
  it('creates the client & passes the locale, checkout data, basketId and options with access token to the Spryker request', async () => {
    await setCreateOrder('en-gb', data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost['en-gb'],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.post).toHaveBeenCalledWith('/checkout', {
      data: {
        type: 'checkout',
        attributes: {
          customer: data.customer,
          idCart: data.basketId,
          billingAddress: data.billingAddress,
          shippingAddress: data.deliveryAddress,
          shipment: {
            idShipmentMethod: Number(data.deliveryMethod)
          },
          segmentAnonymousUserId: data.segmentAnonymousUserId,
          clientID: data.clientID.slice(6, data.clientID.length)
        }
      }
    })
  })

  it('returns the normalized create order response', async () => {
    const response = await setCreateOrder('en-gb', data, user)
    expect(response).toEqual(createOrderResponse)
  })
})
