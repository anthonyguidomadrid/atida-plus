/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import {
  authenticatedSprykerBasket,
  elasticsearchProducts,
  sprykerBasket
} from '~domains/basket/__mocks__/basket'
import { createClient } from '~helpers'
import { removeCoupon } from '../remove-coupon'

describe(removeCoupon, () => {
  describe('remove from authenticated user basket', () => {
    beforeEach(() => {
      ;(axios.delete as jest.Mock).mockResolvedValue({
        data: authenticatedSprykerBasket
      })
      mget.mockResolvedValue(elasticsearchProducts)
    })

    it('creates the client & passes the locale, token, cartId, coupon to spryker request', async () => {
      await removeCoupon('en-gb', 'cart-id', 'coupon', {
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
      expect(axios.delete).toHaveBeenCalledWith(
        `/carts/cart-id/vouchers/coupon`
      )
    })

    it('returns the normalized basket response', async () => {
      const response = await removeCoupon('en-gb', 'cart-id', 'coupon', {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: 'some-user-token'
      })
      expect(response).toMatchSnapshot()
    })
  })
  describe('remove from non-authenticated user basket', () => {
    beforeEach(() => {
      ;(axios.delete as jest.Mock).mockResolvedValue({
        data: sprykerBasket
      })
      mget.mockResolvedValue(elasticsearchProducts)
    })
    it('creates the client & passes the locale, token, cartId, coupon to spryker request', async () => {
      await removeCoupon('en-gb', 'cart-id', 'coupon', {
        anonymousCustomerUniqueId: undefined,
        token: undefined
      })
      expect(createClient).toHaveBeenCalledWith({
        addAnonymousCustomerUniqueId: undefined,
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk',
          headers: undefined
        }
      })
      expect(axios.delete).toHaveBeenCalledWith(
        `/guest-carts/cart-id/vouchers/coupon`
      )
    })
  })
})
