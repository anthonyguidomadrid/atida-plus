import { screen } from '@testing-library/dom'
import type { DeepPartial } from '@reduxjs/toolkit'
import { FeatureFlag } from '~config/constants/feature-flags'
import { product } from '~domains/product/__mocks__/product'
import { RootState } from '~domains/redux'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { PDPSidebar } from '../PDPSidebar'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { UseBasketDataForPDP } from '~helpers/useBasketDataForPDP'

describe(PDPSidebar, () => {
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

  const defaultProps = {
    basketDataForPDP: ({
      itemNoPromoInBasket: 0,
      currentQuantityValue: 0,
      productMaxQuantity: 10,
      addToBasket: jest.fn(),
      removeFromBasket: jest.fn()
    } as unknown) as UseBasketDataForPDP
  }

  const setup = () =>
    renderWithStoreAndFeatureFlags(<PDPSidebar {...defaultProps} />, {
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
        [FeatureFlag.PRODUCT_PDP_PROMO_INFORMATION_BOX]: true,
        [FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER]: true,
        [FeatureFlag.PDP_SIMILAR_PRODUCTS]: true,
        [FeatureFlag.PRODUCT_BACK_IN_STOCK_ENABLED]: true,
        [FeatureFlag.PDP_TOOLTIP_PROMOTION_INFO]: true,
        [FeatureFlag.SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT]: true,
        [FeatureFlag.PRODUCT_ON_DEMAND_INFO]: true,
        [FeatureFlag.PRODUCT_PDP_SHOW_SAVINGS]: true,
        [FeatureFlag.EXPERIMENT_PDP_SHOW_SAVING_PERCENTAGE]: true,
        [FeatureFlag.PRODUCT_PDP_ADD_TO_BASKET_CONTROLS_NEW_QUANTITY_SELECTOR]: true,
        [FeatureFlag.PDP_LOYALTY_INFO]: {
          ES: {
            brands: [],
            categories: [],
            products: [],
            base: 0
          }
        }
      }
    })

  it('should render the aside tag', () => {
    setup()
    expect(screen.queryByTestId('pdpSidebar')).toBeInTheDocument()
  })
  it('should render the Price component', () => {
    setup()
    expect(screen.queryByTestId('productPrice')).toBeInTheDocument()
  })
  it('should render the ProductSavings component', () => {
    setup()
    expect(screen.queryByTestId('productSavingsContainer')).toBeInTheDocument()
  })
  it('should render the ProductAvailability component', () => {
    setup()
    expect(screen.queryByTestId('availability')).toBeInTheDocument()
  })
  it('should render the DeliveryTimes component', () => {
    setup()
    expect(screen.queryByTestId('delivery-times')).toBeInTheDocument()
  })
  it('should render the ProductUSP component', () => {
    setup()
    expect(screen.queryByTestId('usp-new-layout')).toBeInTheDocument()
  })
  it('should render the ExponeaRecommendationBlock component', () => {
    setup()
    expect(screen.queryByTestId('recommendationBlock')).toBeInTheDocument()
  })
})
