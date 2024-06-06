/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { elasticsearchProducts } from '~domains/basket/__mocks__/basket'
import { createClient } from '~helpers'
import { orderHistory } from '../order-history'
import {
  orderHistoryOnlyPending,
  orderHistoryWithoutItems
} from '~domains/account/__mocks__/order-history'

describe(orderHistory, () => {
  describe('creates the client and passes the locale to the spryker request', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          data: [],
          links: []
        }
      })
    })

    it('without pagination data', async () => {
      await orderHistory({
        locale: 'en-gb',
        accessToken: 'some-token'
      })

      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk'
        }
      })

      expect(axios.get).toHaveBeenCalledWith('/orders', {
        headers: {
          Authorization: 'Bearer some-token'
        },
        params: {
          'page[limit]': 5,
          'page[offset]': 0,
          sort: '-created_at'
        }
      })
    })

    it('with pagination data', async () => {
      await orderHistory({
        locale: 'en-gb',
        accessToken: 'some-token',
        params: { page: 3 }
      })

      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk'
        }
      })

      expect(axios.get).toHaveBeenCalledWith('/orders', {
        headers: {
          Authorization: 'Bearer some-token'
        },
        params: {
          'page[limit]': 5,
          'page[offset]': 10,
          sort: '-created_at'
        }
      })
    })
  })
  describe('test order history', () => {
    it('with populated data', async () => {
      mget.mockResolvedValue(elasticsearchProducts)
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: {
          data: orderHistoryOnlyPending[0].orderHistory,
          links: []
        }
      })
      const res = await orderHistory({
        locale: 'en-gb',
        accessToken: 'some-token',
        params: { page: 1 }
      })
      if (res.data) {
        expect(res).toMatchSnapshot()
      }
    })
    it('without order history items', async () => {
      mget.mockResolvedValue(elasticsearchProducts)
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: {
          data: orderHistoryWithoutItems[0].orderHistory,
          links: []
        }
      })
      const res = await orderHistory({
        locale: 'en-gb',
        accessToken: 'some-token',
        params: { page: 1 }
      })
      if (res.data) {
        expect(res).toMatchSnapshot()
      }
    })
  })
})
