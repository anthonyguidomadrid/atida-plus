import { screen } from '@testing-library/react'
import { FeatureFlag } from '~config/constants/feature-flags'
import { product } from '~domains/product/__mocks__/product'
import { PDPHeader } from '../PDPHeader'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'

describe(PDPHeader, () => {
  const setup = () =>
    renderWithStoreAndFeatureFlags(<PDPHeader />, {
      initialState: {
        server: {
          product: {
            content: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              data: { ...product, brandUrl: '/brands/atida' }
            }
          }
        }
      },
      featureFlags: {
        [FeatureFlag.PRODUCT_PDP_FETCH_SINGLE_BRAND]: true
      }
    })

  it('renders the product header component', () => {
    setup()
    expect(screen.getByTestId('productHeader')).toBeInTheDocument()
  })

  it('renders the header with correct product name', () => {
    setup()
    expect(
      screen.getByRole('heading', {
        name: 'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1'
      })
    ).toBeInTheDocument()
  })

  it('renders the brand url', () => {
    setup()
    expect(screen.getByTestId('brandURL')).toHaveAttribute(
      'href',
      '/brands/atida'
    )
  })

  it('renders the product format and unit volume', () => {
    setup()
    expect(screen.getByTestId('productHeaderProductInfo')).toBeInTheDocument()
    expect(screen.getByTestId('productHeaderProductInfo')).toHaveTextContent(
      'Atida - Shampoo - 100 ml'
    )
  })
})
