import { screen } from '@testing-library/dom'
import { FeatureFlag } from '~config/constants/feature-flags'
import { product } from '~domains/product/__mocks__/product'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { Product } from '../Product'

describe(Product, () => {
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

  const setup = (ff = false) =>
    renderWithStoreAndFeatureFlags(<Product />, {
      initialState: {
        server: {
          product: {
            content: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              data: product
            }
          }
        }
      },
      featureFlags: {
        [FeatureFlag.PDP_ALL_NEW_PDP]: ff
      }
    })

  it('should render the current PDP when the feature flag is turned off', () => {
    setup()
    expect(screen.queryByTestId('pdpLayout')).toBeInTheDocument()
  })
  it('should render the different current PDP components when the feature flag is turned off', () => {
    setup()
    expect(screen.queryByTestId('popBackButton')).toBeInTheDocument()
    expect(screen.queryByTestId('productPrice')).toBeInTheDocument()
    expect(screen.queryByTestId('saveToFavouritesButton')).toBeInTheDocument()
  })
  it('should render the new PDP when the feature flag is turned on', () => {
    setup(true)
    expect(screen.queryByTestId('pdpLayout')).toBeInTheDocument()
  })
})
