/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'

// import { mget } from 'src/__mocks__/@elastic/elasticsearch'
import {
  sprykerBasket,
  elasticsearchProducts,
  sprykerBasketWithPromotionalItem,
  sprykerBasketWithPromotionalItemOutofStock
} from '~domains/basket/__mocks__/basket'
import { createClient } from '~helpers'
import { addCoupon } from '../add-coupon'

describe(addCoupon, () => {
  beforeEach(() => {
    mget.mockResolvedValue(elasticsearchProducts)
  })

  describe(addCoupon, () => {
    describe('add to authenticated user basket', () => {
      beforeEach(() => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: sprykerBasket
        })
      })
      it('creates the client & passes the locale,token,cartId, coupon to spryker request', async () => {
        await addCoupon('en-gb', 'cart-id', 'coupon', {
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
        expect(axios.post).toHaveBeenCalledWith(`/carts/cart-id/vouchers`, {
          data: {
            type: 'vouchers',
            attributes: {
              code: 'coupon'
            }
          }
        })
      })

      it('returns the normalized basket response', async () => {
        const response = await addCoupon('en-gb', 'cart-id', 'coupon', {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        })
        expect(response).toMatchSnapshot()
      })
    })
  })
  describe(addCoupon, () => {
    describe('add to authenticated user basket with gift voucher', () => {
      beforeEach(() => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: sprykerBasketWithPromotionalItem
        })
      })
      it('returns normalized response with a gift voucher ', async () => {
        const response = await addCoupon('en-gb', 'cart-id', 'coupon', {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        })
        expect(response).toMatchSnapshot()
      })
    })
  })
  describe(addCoupon, () => {
    describe('does not add the promotional item to the cart if it out-of-stock', () => {
      beforeEach(() => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: sprykerBasketWithPromotionalItemOutofStock
        })
      })
      it('add the hasPromotionalItemOutOfStock property to the basket if the coupon contains an out-of-stock promotional item', async () => {
        const response = await addCoupon('en-gb', 'cart-id', 'coupon', {
          anonymousCustomerUniqueId: 'some-unique-id',
          token: 'some-user-token'
        })
        expect(response.hasPromotionalItemOutOfStock).toBe(true)
      })
    })
  })
})
