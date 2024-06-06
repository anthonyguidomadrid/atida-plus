/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import {
  sprykerBasket,
  elasticsearchProducts,
  basket,
  sprykerBasketWithPromotionalItemOutofStock,
  sprykerBasketWithDeclinedPromotionalItem
} from '../../__mocks__/basket'
import { createClient } from '~helpers'
import { changeItemQuantity } from '../change-item-quantity'
import { fetchProductsForBasket } from '../fetch-products-for-basket'
import { basketApiConfig } from '../../config'
import { SprykerBasket } from '~domains/basket/types'

describe(changeItemQuantity, () => {
  beforeEach(() => {
    ;(axios.patch as jest.Mock).mockResolvedValue({ data: sprykerBasket })
    mget.mockResolvedValue(elasticsearchProducts)
  })

  describe('update item in the guest basket', () => {
    it('creates the client & passes the locale and anonymous id to spryker request', async () => {
      await changeItemQuantity(
        'en-gb',
        {
          quantity: 1,
          sku: 'some-sku',
          id: 'some-id',
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

      expect(axios.patch).toHaveBeenCalledWith(
        `${basketApiConfig.guest.cartUrl}/123123${basketApiConfig.guest.cartItemsUrl}/some-id`,
        {
          data: {
            attributes: {
              basketId: '123123',
              quantity: 1,
              sku: 'some-sku',
              id: 'some-id'
            },
            type: basketApiConfig.guest.cartItemsType
          }
        }
      )
    })

    it('returns the normalized basket response', async () => {
      await changeItemQuantity(
        'en-gb',
        {
          quantity: 1,
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

  describe('update item in the authenticated user basket', () => {
    it('creates the client & passes the locale and anonymous id to spryker request', async () => {
      await changeItemQuantity(
        'en-gb',
        {
          quantity: 1,
          sku: 'some-sku',
          id: 'some-id',
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

      expect(axios.patch).toHaveBeenCalledWith(
        `${basketApiConfig.authorised.cartUrl}/123123${basketApiConfig.authorised.cartItemsUrl}/some-id`,
        {
          data: {
            attributes: {
              basketId: '123123',
              quantity: 1,
              sku: 'some-sku',
              id: 'some-id'
            },
            type: basketApiConfig.authorised.cartItemsType
          }
        }
      )
    })

    it('returns the normalized basket response', async () => {
      await changeItemQuantity(
        'en-gb',
        {
          quantity: 1,
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

describe('Spryker basket with promotional items', () => {
  const setup = (sprykerBasket: SprykerBasket) => {
    ;(axios.patch as jest.Mock).mockResolvedValue({
      data: sprykerBasket
    })
    mget.mockResolvedValue(elasticsearchProducts)
  }

  it('does not add the promotional item to the basket if it is out of stock', async () => {
    setup(sprykerBasketWithPromotionalItemOutofStock)
    const response = await changeItemQuantity(
      'en-gb',
      {
        quantity: 1,
        sku: '100000001',
        basketId: 'f0849e9c-6712-54b9-8db5-440438d03387'
      },
      {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: 'some-user-token'
      }
    )
    if (response.items) {
      expect(response.items[0]?.hasPromotionalItemOutofStock).toBe(true)
    }
  })

  it('does not add the promotional item to the basket if it has been declined', async () => {
    setup(sprykerBasketWithDeclinedPromotionalItem)
    const response = await changeItemQuantity(
      'en-gb',
      {
        quantity: 1,
        sku: '100000001',
        basketId: 'f0849e9c-6712-54b9-8db5-440438d03387'
      },
      {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: 'some-user-token'
      }
    )
    if (response.items) {
      expect(response).toMatchSnapshot()
    }
  })
})
