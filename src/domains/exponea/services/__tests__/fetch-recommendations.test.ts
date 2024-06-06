/**
 * @jest-environment node
 */
// @ts-ignore
import { mget } from '@elastic/elasticsearch'
import { elasticsearchProducts } from '~domains/basket/__mocks__/basket'
import {
  ExponeaRecommendationResponse,
  recommendedProducts
} from '~domains/exponea/__mocks__/recommendation'
import { fetchRecommendations } from '../fetch-recommendations'
import axios from 'axios'
import { getDefaultCustomer } from '~domains/exponea/helpers/get-default-customer'
import { getDefaultRecommendation } from '~domains/exponea/helpers/get-default-recommendation'

describe(fetchRecommendations, () => {
  beforeEach(() => {
    mget.mockResolvedValue(elasticsearchProducts)
  })
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue(ExponeaRecommendationResponse)
  })

  const data = {
    email: 'someCustomerEmail',
    recommendationId: 'someRecommendationId',
    productId: 'someProductId',
    categoryId: 'someCategoryId',
    sessionChasessionChannel: { sku: 'some-sku', channel: 'amazon' }
  }

  it('passes the correct parameters to exponea and elasticsearch request', async () => {
    await fetchRecommendations('en-gb', 'someExponeaCookie', data)

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.exponea.com/data/v2/projects/someProjectToken-GB/customers/attributes',
      {
        customer_ids: {
          email_id:
            '834e02be69d5b35337630c0bfad5236643604208e94539f72a346b7fbc28f527', // Base64 hashed email
          cookie: 'someExponeaCookie'
        },
        attributes: [
          {
            type: 'recommendation',
            id: data?.recommendationId,
            fillWithRandom: true,
            size: 8,
            catalogAttributesWhitelist: ['item_id', 'product_id'],
            items: { [`${data?.productId}`]: 1 },
            catalogFilter: [
              {
                constraint: {
                  operands: [
                    {
                      type: 'constant',
                      value: 'someCategoryId'
                    }
                  ],
                  operator: 'contains',
                  type: 'string'
                },
                property: 'web_category'
              }
            ]
          }
        ]
      },
      expect.any(Object)
    )
    expect(mget).toHaveBeenCalledWith({
      body: {
        ids: ['100000001', '100000002', '100000003', '100000004']
      },
      index: 'index-en-gb'
    })
  })

  it('passes the correct parameters to exponea and elasticsearch request when email is missing', async () => {
    await fetchRecommendations('en-gb', 'someExponeaCookie', {
      recommendationId: data.recommendationId,
      productId: data.productId,
      categoryId: data.categoryId
    })

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.exponea.com/data/v2/projects/someProjectToken-GB/customers/attributes',
      {
        customer_ids: {
          cookie: 'someExponeaCookie'
        },
        attributes: [
          {
            type: 'recommendation',
            id: data?.recommendationId,
            fillWithRandom: true,
            size: 8,
            catalogAttributesWhitelist: ['item_id', 'product_id'],
            items: { [`${data?.productId}`]: 1 },
            catalogFilter: [
              {
                constraint: {
                  operands: [
                    {
                      type: 'constant',
                      value: 'someCategoryId'
                    }
                  ],
                  operator: 'contains',
                  type: 'string'
                },
                property: 'web_category'
              }
            ]
          }
        ]
      },
      expect.any(Object)
    )
    expect(mget).toHaveBeenCalledWith({
      body: {
        ids: ['100000001', '100000002', '100000003', '100000004']
      },
      index: 'index-en-gb'
    })
  })

  it('passes the correct parameters to exponea and elasticsearch request when cookie is missing', async () => {
    await fetchRecommendations('en-gb', undefined, data)

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.exponea.com/data/v2/projects/someProjectToken-GB/customers/attributes',
      {
        customer_ids: {
          email_id:
            '834e02be69d5b35337630c0bfad5236643604208e94539f72a346b7fbc28f527' // Hashed email
        },
        attributes: [
          {
            type: 'recommendation',
            id: data?.recommendationId,
            fillWithRandom: true,
            size: 8,
            catalogAttributesWhitelist: ['item_id', 'product_id'],
            items: { [`${data?.productId}`]: 1 },
            catalogFilter: [
              {
                constraint: {
                  operands: [
                    {
                      type: 'constant',
                      value: 'someCategoryId'
                    }
                  ],
                  operator: 'contains',
                  type: 'string'
                },
                property: 'web_category'
              }
            ]
          }
        ]
      },
      expect.any(Object)
    )
    expect(mget).toHaveBeenCalledWith({
      body: {
        ids: ['100000001', '100000002', '100000003', '100000004']
      },
      index: 'index-en-gb'
    })
  })

  it('passes the correct parameters to exponea and elasticsearch request when email and cookie is missing', async () => {
    await fetchRecommendations('en-gb', 'someExponeaCookie', {
      recommendationId: data.recommendationId,
      email: data.email
    })

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.exponea.com/data/v2/projects/someProjectToken-GB/customers/attributes',
      {
        customer_ids: {
          cookie: 'someExponeaCookie',
          email_id:
            '834e02be69d5b35337630c0bfad5236643604208e94539f72a346b7fbc28f527'
        },
        attributes: [
          {
            type: 'recommendation',
            id: data?.recommendationId,
            fillWithRandom: true,
            size: 8,
            catalogAttributesWhitelist: ['item_id', 'product_id']
          }
        ]
      },
      expect.any(Object)
    )
  })

  it('passes the correct parameters to exponea and elasticsearch request when cookie and email is missing', async () => {
    await fetchRecommendations('en-gb', undefined, {
      recommendationId: data.recommendationId,
      productId: data.productId,
      categoryId: data.categoryId
    })

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.exponea.com/data/v2/projects/someProjectToken-GB/customers/attributes',
      {
        customer_ids: {
          email_id: getDefaultCustomer()
        },
        attributes: [
          {
            type: 'recommendation',
            id: data?.recommendationId,
            fillWithRandom: true,
            size: 8,
            catalogAttributesWhitelist: ['item_id', 'product_id'],
            items: { [`${data?.productId}`]: 1 },
            catalogFilter: [
              {
                constraint: {
                  operands: [
                    {
                      type: 'constant',
                      value: 'someCategoryId'
                    }
                  ],
                  operator: 'contains',
                  type: 'string'
                },
                property: 'web_category'
              }
            ]
          }
        ]
      },
      expect.any(Object)
    )
    expect(mget).toHaveBeenCalledWith({
      body: {
        ids: ['100000001', '100000002', '100000003', '100000004']
      },
      index: 'index-en-gb'
    })
  })

  it('passes the correct parameters to exponea and elasticsearch request when recommendationId is missing', async () => {
    await fetchRecommendations('en-gb', 'someExponeaCookie', {
      email: data.email,
      productId: data.productId,
      categoryId: data.categoryId
    })

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.exponea.com/data/v2/projects/someProjectToken-GB/customers/attributes',
      {
        customer_ids: {
          email_id:
            '834e02be69d5b35337630c0bfad5236643604208e94539f72a346b7fbc28f527',
          cookie: 'someExponeaCookie'
        },
        attributes: [
          {
            type: 'recommendation',
            id: getDefaultRecommendation('en-gb'),
            fillWithRandom: true,
            size: 8,
            catalogAttributesWhitelist: ['item_id', 'product_id'],
            items: { [`${data?.productId}`]: 1 },
            catalogFilter: [
              {
                constraint: {
                  operands: [
                    {
                      type: 'constant',
                      value: 'someCategoryId'
                    }
                  ],
                  operator: 'contains',
                  type: 'string'
                },
                property: 'web_category'
              }
            ]
          }
        ]
      },
      expect.any(Object)
    )
    expect(mget).toHaveBeenCalledWith({
      body: {
        ids: ['100000001', '100000002', '100000003', '100000004']
      },
      index: 'index-en-gb'
    })
  })

  it('uses the correct exponea project token for a different locale', async () => {
    await fetchRecommendations('pt-pt', 'someExponeaCookie', data)

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.exponea.com/data/v2/projects/someProjectToken-PT/customers/attributes',
      expect.any(Object),
      expect.any(Object)
    )
  })

  it('returns the normalized recommendation response with products', async () => {
    const response = await fetchRecommendations(
      'en-gb',
      'someExponeaCookie',
      data
    )
    expect(response).toStrictEqual(recommendedProducts)
  })

  it('returns an empty list when exponea does not return any recommendations', async () => {
    ;(axios.post as jest.Mock).mockResolvedValueOnce({
      data: {
        results: [
          {
            error: 'No permission',
            success: false
          }
        ],
        success: true
      }
    })
    const response = await fetchRecommendations(
      'en-gb',
      'someExponeaCookie',
      data
    )
    expect(response).toMatchSnapshot()
  })

  it('returns an empty list when exponea API fails', async () => {
    ;(axios.post as jest.Mock).mockRejectedValueOnce({})
    const response = await fetchRecommendations(
      'en-gb',
      'someExponeaCookie',
      data
    )
    expect(response).toMatchSnapshot()
  })
})
