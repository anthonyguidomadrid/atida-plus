/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import {
  sprykerBasket,
  elasticsearchProducts,
  basket
} from '../../__mocks__/basket'
import { createClient } from '~helpers'
import { removeFromBasket } from '../remove-from-basket'
import { fetchProductsForBasket } from '../fetch-products-for-basket'
import { basketApiConfig } from '../../config'

describe(removeFromBasket, () => {
  beforeEach(() => {
    ;(axios.delete as jest.Mock).mockResolvedValue({ data: sprykerBasket })
    mget.mockResolvedValue(elasticsearchProducts)
  })

  describe('remove item from the guest basket', () => {
    it('creates the client & passes the locale and anonymous id to spryker request', async () => {
      await removeFromBasket(
        'en-gb',
        {
          id: 'some-id',
          sku: 'some-sku',
          basketId: '123123'
        },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: undefined
        }
      )
      expect(createClient).toHaveBeenCalledWith({
        addAnonymousCustomerUniqueId: 'some-unique-id',
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk'
        }
      })

      expect(axios.delete).toHaveBeenCalledWith(
        `${basketApiConfig.guest.cartUrl}/123123${basketApiConfig.guest.cartItemsUrl}/some-id`
      )
    })

    it('returns the normalized basket response', async () => {
      await removeFromBasket(
        'en-gb',
        {
          sku: 'some-sku',
          basketId: '123123'
        },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: undefined
        }
      )
      const basketResponse = await fetchProductsForBasket('en-gb', basket)
      expect(basketResponse).toMatchSnapshot()
    })
  })

  describe('remove item from the authenticated user basket', () => {
    it('creates the client & passes the locale and token to spryker request', async () => {
      await removeFromBasket(
        'en-gb',
        {
          id: 'some-id',
          sku: 'some-sku',
          basketId: '123123'
        },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        }
      )
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

      expect(axios.delete).toHaveBeenCalledWith(
        `${basketApiConfig.authorised.cartUrl}/123123${basketApiConfig.authorised.cartItemsUrl}/some-id`
      )
    })

    it('returns the normalized basket response', async () => {
      await removeFromBasket(
        'en-gb',
        {
          sku: 'some-sku',
          basketId: '123123'
        },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        }
      )
      const basketResponse = await fetchProductsForBasket('en-gb', basket)
      expect(basketResponse).toMatchSnapshot()
    })
  })
})
