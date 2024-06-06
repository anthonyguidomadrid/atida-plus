/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { addMultipleToBasket } from '../add-multiple-to-basket'
import { basketApiConfig } from '../../config'

describe(addMultipleToBasket, () => {
  describe('add multiple to basket', () => {
    it('creates the client & the request with the expected payload - Guest customer', async () => {
      await addMultipleToBasket(
        'en-gb',
        [
          { sku: 'sku1', quantity: 2 },
          { sku: 'sku2', quantity: 1 }
        ],
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
        `${basketApiConfig.guest.cartUrl}${basketApiConfig.guest.multipleCartItemsUrl}/?include=promotional-items,abstract-product,cart-rules,vouchers`,
        {
          data: {
            type: basketApiConfig.guest.multipleCartItemsType,
            attributes: [
              { sku: 'sku1', quantity: 2 },
              { sku: 'sku2', quantity: 1 }
            ]
          }
        }
      )
    })

    it('creates the client & the request with the expected payload - Logged customer', async () => {
      await addMultipleToBasket(
        'en-gb',
        [
          { sku: 'sku1', quantity: 2 },
          { sku: 'sku2', quantity: 1 }
        ],
        {
          anonymousCustomerUniqueId: undefined,
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
        `${basketApiConfig.authorised.cartUrl}${basketApiConfig.authorised.multipleCartItemsUrl}/?include=promotional-items,abstract-product,cart-rules,vouchers`,
        {
          data: {
            type: basketApiConfig.authorised.multipleCartItemsType,
            attributes: [
              { sku: 'sku1', quantity: 2 },
              { sku: 'sku2', quantity: 1 }
            ]
          }
        }
      )
    })
  })
})
