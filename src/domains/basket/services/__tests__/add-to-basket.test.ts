/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import {
  sprykerBasket,
  authenticatedSprykerBasket,
  elasticsearchProducts,
  sprykerBasketWithPromotionalItem,
  sprykerBasketWithPromotionalItemOutofStock
} from '../../__mocks__/basket'
import { createClient } from '~helpers'
import { addToBasket } from '../add-to-basket'
import { basketApiConfig } from '../../config'

describe(addToBasket, () => {
  beforeEach(() => {
    mget.mockResolvedValue(elasticsearchProducts)
  })

  describe('add to guest basket', () => {
    beforeEach(() => {
      ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerBasket })
    })

    it('creates the client & passes the locale and anonymous id to spryker request', async () => {
      await addToBasket(
        'en-gb',
        { sku: 'some-sku', quantity: 8 },
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
      expect(axios.post).toHaveBeenCalledWith(
        basketApiConfig.guest.cartItemsUrl,
        {
          data: {
            type: basketApiConfig.guest.cartItemsType,
            attributes: {
              quantity: 8,
              sku: 'some-sku'
            }
          }
        }
      )
    })

    it('returns the normalized basket response', async () => {
      const response = await addToBasket(
        'en-gb',
        { sku: 'some-sku', quantity: 8 },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: undefined
        }
      )
      expect(response).toMatchSnapshot()
    })
  })

  describe('add to authenticated user basket', () => {
    beforeEach(() => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: authenticatedSprykerBasket
      })
    })

    it('creates the client & passes the locale and token to spryker request', async () => {
      await addToBasket(
        'en-gb',
        { sku: 'some-sku', quantity: 8 },
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
      expect(axios.post).toHaveBeenCalledWith(
        `${basketApiConfig.authorised.cartUrl}/${basketApiConfig.authorised.cartItemsUrl}/?include=promotional-items,abstract-product,cart-rules,vouchers`,
        {
          data: {
            type: basketApiConfig.authorised.cartItemsType,
            attributes: {
              quantity: 8,
              sku: 'some-sku'
            }
          }
        }
      )
    })

    it('returns the normalized basket response', async () => {
      const response = await addToBasket(
        'en-gb',
        { sku: 'some-sku', quantity: 8 },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        }
      )
      expect(response).toMatchSnapshot()
    })
  })

  describe(addToBasket, () => {
    beforeEach(() => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: sprykerBasketWithPromotionalItem
      })
    })

    it('add the hasPromotionalItem property to the parent item', async () => {
      const response = await addToBasket(
        'en-gb',
        { sku: '100000001', quantity: 1 },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        },
        '100000001'
      )
      if (response.items) {
        expect(response.items[0]?.hasPromotionalItem).toBe(true)
      }
    })
  })

  describe(addToBasket, () => {
    beforeEach(() => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: sprykerBasketWithPromotionalItemOutofStock
      })
    })

    it('does not add the promotional item to the cart', async () => {
      const response = await addToBasket(
        'en-gb',
        { sku: 'some-sku', quantity: 8 },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        }
      )
      expect(response).toMatchSnapshot()
    })

    it('add the hasPromotionalItemOutofStock property to the parent product', async () => {
      const response = await addToBasket(
        'en-gb',
        { sku: '100000001', quantity: 1 },
        {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        }
      )
      if (response.items) {
        expect(response.items[0]?.hasPromotionalItemOutofStock).toBe(true)
      }
    })
  })
})
