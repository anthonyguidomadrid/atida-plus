/**
 * @jest-environment node
 */
import axios from 'axios'
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { addPrescriptionToBasket } from '../add-prescription-to-basket'
import { basketApiConfig } from '../../config'
import { sprykerBasket, elasticsearchProducts } from '../../__mocks__/basket'
import { createClient } from '~helpers'

describe(addPrescriptionToBasket, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerBasket })
  })

  it('creates the client & passes the locale and token to spryker request', async () => {
    await addPrescriptionToBasket(
      'en-gb',
      {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: 'some-user-token'
      },
      'some token',
      'cart-id'
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
      `${basketApiConfig.authorised.cartUrl}/cart-id/prescription-tokens?include=items,promotional-items,abstract-product,cart-rules,vouchers`,
      {
        data: {
          type: 'prescription-tokens',
          attributes: {
            tokens: ['some token']
          }
        }
      }
    )
  })

  it('returns the normalized basket response', async () => {
    mget.mockResolvedValue(elasticsearchProducts)
    const response = await addPrescriptionToBasket(
      'en-gb',
      {
        anonymousCustomerUniqueId: 'some-unique-id',
        token: 'some-user-token'
      },
      'some token',
      'cart-id'
    )
    expect(response).toMatchSnapshot()
  })
})
