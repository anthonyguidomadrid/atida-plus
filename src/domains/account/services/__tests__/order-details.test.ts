/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { orderDetails } from '../order-details'
import {
  orderDetailsResult,
  orderDetailsResultWithoutItems
} from '../../__mocks__/order-details'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { elasticsearchProducts } from '~domains/basket/__mocks__/basket'

describe(orderDetails, () => {
  describe('creates the client and passes the locale to the spryker request', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          data: orderDetailsResult
        }
      })
    })

    it('gets details for order PT--1234', async () => {
      await orderDetails({
        locale: 'en-gb',
        accessToken: 'some-token',
        orderId: 'PT--1234'
      })

      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk'
        }
      })

      expect(axios.get).toHaveBeenCalledWith('/orders/PT--1234', {
        headers: {
          Authorization: 'Bearer some-token'
        }
      })
    })
  })
  describe('test order details ', () => {
    it('with populated data', async () => {
      mget.mockResolvedValue(elasticsearchProducts)
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: {
          data: orderDetailsResult,
          links: []
        }
      })
      const res = await orderDetails({
        locale: 'en-gb',
        accessToken: 'some-token',
        orderId: 'PT--1234'
      })
      if (res) {
        expect(res).toMatchSnapshot()
      }
    })

    it('without data items', async () => {
      mget.mockResolvedValue(elasticsearchProducts)
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: {
          data: orderDetailsResultWithoutItems,
          links: []
        }
      })
      const res = await orderDetails({
        locale: 'en-gb',
        accessToken: 'some-token',
        orderId: 'PT--1234'
      })
      if (res) {
        expect(res).toMatchSnapshot()
      }
    })
  })
})
