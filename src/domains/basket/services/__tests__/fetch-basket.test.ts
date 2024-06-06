/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import {
  elasticsearchProducts,
  sprykerBaskets,
  authenticatedSprykerBaskets
} from '../../__mocks__/basket'
import { fetchBasket } from '../fetch-basket'
import { createClient } from '~helpers'
import { basketApiConfig } from '../../config'

describe(fetchBasket, () => {
  beforeEach(() => {
    mget.mockResolvedValue(elasticsearchProducts)
  })

  describe('fetch guest basket', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValue({ data: sprykerBaskets })
    })

    it('creates the client & passes the locale and anonymous id to spryker request', async () => {
      await fetchBasket('en-gb', {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: undefined
      })
      expect(createClient).toHaveBeenCalledWith({
        addAnonymousCustomerUniqueId: 'some-unique-id',
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk'
        }
      })
      expect(axios.get).toHaveBeenCalledWith(
        `${basketApiConfig.guest.cartUrl}?include=items,cart-rules,vouchers`,
        {
          params: {
            include: `${basketApiConfig.guest.cartItemsType},promotional-items`
          }
        }
      )
    })

    it('returns the normalized basket response', async () => {
      const response = await fetchBasket('en-gb', {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: undefined
      })
      expect(response).toMatchSnapshot()
    })
  })

  describe('fetch authenticated user basket', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: authenticatedSprykerBaskets
      })
    })

    it('creates the client & passes the locale and token to spryker request', async () => {
      await fetchBasket('en-gb', {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: 'some-user-token'
      })
      expect(createClient).toHaveBeenCalledWith({
        addAnonymousCustomerUniqueId: undefined,
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk',
          headers: {
            Authorization: `Bearer some-user-token`
          }
        }
      })
      expect(axios.get).toHaveBeenCalledWith(
        `${basketApiConfig.authorised.cartUrl}?include=items,cart-rules,vouchers`,
        {
          params: {
            include: `${basketApiConfig.authorised.cartItemsType},promotional-items`
          }
        }
      )
    })

    it('returns the normalized basket response', async () => {
      const response = await fetchBasket('en-gb', {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: 'some-user-token'
      })
      expect(response).toMatchSnapshot()
    })
  })
})
