/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  sprykerCheckoutData,
  sprykerCheckoutDataWithBasketItems
} from '../../__mocks__/checkout-data'
import { createClient } from '~helpers'
import { setCheckoutData } from '../set-checkout-data'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { elasticsearchProducts } from '../../../basket/__mocks__/basket'

describe(setCheckoutData, () => {
  beforeEach(() => {
    mget.mockResolvedValue(elasticsearchProducts)
  })

  it('creates the client & passes the locale and token to spryker request', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerCheckoutData })
    await setCheckoutData(
      'en-gb',
      { deliveryMethod: '7' },
      {
        token: 'some-user-token'
      }
    )
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: 'spryker.co.uk',
        headers: {
          Authorization: `Bearer some-user-token`
        }
      }
    })
    expect(axios.post).toHaveBeenCalledWith('/checkout-data', {
      data: {
        type: 'checkout-data',
        attributes: {
          billingAddress: undefined,
          shippingAddress: undefined,
          customer: undefined,
          shipment: {
            idShipmentMethod: 7
          }
        }
      }
    })
  })

  it('returns the normalized checkout data response', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerCheckoutData })
    const response = await setCheckoutData(
      'en-gb',
      { deliveryMethod: '7' },
      {
        token: 'some-user-token'
      }
    )
    expect(response).toMatchSnapshot()
  })

  it('returns the normalized checkout data with basket items response', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: sprykerCheckoutDataWithBasketItems
    })
    const response = await setCheckoutData(
      'en-gb',
      { deliveryMethod: '7' },
      {
        token: 'some-user-token'
      }
    )
    expect(response).toMatchSnapshot()
  })
})
