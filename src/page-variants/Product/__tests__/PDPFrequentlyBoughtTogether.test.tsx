import { screen } from '@testing-library/dom'
import type { DeepPartial } from '@reduxjs/toolkit'
import { FeatureFlag } from '~config/constants/feature-flags'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { product } from '~domains/product/__mocks__/product'
import { RootState } from '~domains/redux'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { PDPFrequentlyBoughtTogether } from '../PDPFrequentlyBoughtTogether'

describe(PDPFrequentlyBoughtTogether, () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })

  const setup = (emptyInitialState = false) => {
    const { reset } = setupMatchMediaMock(true)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <PDPFrequentlyBoughtTogether />,
      {
        initialState: emptyInitialState
          ? undefined
          : (({
              server: {
                product: {
                  content: {
                    isLoading: false,
                    wasSuccess: true,
                    wasError: false,
                    data: product
                  }
                }
              },
              client: {
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
                      }
                    ]
                  }
                }
              }
            } as unknown) as DeepPartial<RootState>),
        featureFlags: {
          [FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER]: true
        }
      }
    )
    reset()
    return renderedComponent
  }

  it('renders the component', () => {
    setup()
    expect(
      screen.getByTestId('pdpFrequentlyBoughtTogether')
    ).toBeInTheDocument()
  })
  it("doesn't render the component if there's no recommendations", () => {
    setup(true)
    expect(screen.queryByTestId('recommendationBlock')).not.toBeInTheDocument()
  })
})
