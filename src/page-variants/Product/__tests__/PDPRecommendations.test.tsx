import { screen } from '@testing-library/dom'
import type { DeepPartial } from '@reduxjs/toolkit'
import { FeatureFlag } from '~config/constants/feature-flags'
import { product } from '~domains/product/__mocks__/product'
import { RootState } from '~domains/redux'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { PDPRecommendations } from '../PDPRecommendations'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'

describe(PDPRecommendations, () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })

  const setup = (isShowRecommendationsBeforeFBTEnabled = true) =>
    renderWithStoreAndFeatureFlags(<PDPRecommendations />, {
      initialState: ({
        server: {
          product: {
            content: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              data: { ...product, sku: '100000001' }
            }
          }
        },
        client: {
          basket: {
            content: {
              data: {
                ...basketWithProducts,
                items: [{ ...basketWithProducts.items[0], quantity: undefined }]
              }
            }
          },
          exponea: {
            recommendations: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              details: [
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
            },
            'all-recommendations': {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              content: [
                {
                  items: [
                    {
                      title: 'Frequently Bought Together',
                      altTitle: 'Frequently Bought Together',
                      id: 'someRecommendationId',
                      type: 'Frequently Bought Together',
                      isSlider: false,
                      quantity: null
                    }
                  ]
                },
                {
                  items: [
                    {
                      title: 'PDP1',
                      altTitle: 'PDP1',
                      id: 'someRecommendationId',
                      type: 'PDP1',
                      isSlider: true,
                      quantity: '8'
                    }
                  ]
                },
                {
                  items: [
                    {
                      title: 'PDP2',
                      altTitle: 'PDP2',
                      id: 'someRecommendationId',
                      type: 'PDP2',
                      isSlider: true,
                      quantity: '8'
                    }
                  ]
                }
              ]
            }
          }
        }
      } as unknown) as DeepPartial<RootState>,
      featureFlags: {
        [FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER]: true,
        [FeatureFlag.SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT]: isShowRecommendationsBeforeFBTEnabled
      }
    })

  it("should render Frequently Bought Together component if the 'shopping.show-our-recommendations-before-fbt' feature flag is turned on", () => {
    setup()
    expect(
      screen.queryByTestId('pdpFrequentlyBoughtTogether')
    ).toBeInTheDocument()
  })
  it("should not render Frequently Bought Together component if the 'shopping.show-our-recommendations-before-fbt' feature flag is turned off", () => {
    setup(false)
    expect(
      screen.queryByTestId('pdpFrequentlyBoughtTogether')
    ).not.toBeInTheDocument()
  })
  it('should render the ExponeaRecommendationBlock with the last viewed products', () => {
    setup()
    expect(screen.queryByTestId('recommendationBlock')).toBeInTheDocument()
  })
})
