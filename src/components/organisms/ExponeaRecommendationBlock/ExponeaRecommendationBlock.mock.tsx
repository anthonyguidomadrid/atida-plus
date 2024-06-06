import { basketWithProducts } from '~domains/basket/__mocks__/basket'

const recommendationBlocks = [
  {
    recommendationId: 'someRecommendationId',
    items: [
      {
        name: 'Test Product 1',
        sku: '100000003',
        price: {
          value: 10,
          currency: 'EUR'
        },
        url: '/example/100000001'
      },
      {
        name: 'Test Product 2',
        sku: '100000002',
        price: {
          value: 12,
          currency: 'EUR'
        },
        url: '/example/100000002'
      },
      {
        name: 'Test Product 3',
        sku: '100000003',
        price: {
          value: 20,
          currency: 'EUR'
        },
        url: '/example/100000003'
      }
    ]
  }
]

export const testInitialState = {
  client: {
    basket: {
      content: {
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        data: basketWithProducts
      }
    },
    exponea: {
      recommendations: {
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        details: recommendationBlocks
      }
    }
  }
}
