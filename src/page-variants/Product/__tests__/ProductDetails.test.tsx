import { screen } from '@testing-library/dom'
import { describe, it } from 'globalthis/implementation'
import { Product } from '~domains/product'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { ProductDetails } from '../ProductDetails'

describe(ProductDetails, () => {
  const setup = () =>
    renderWithStoreAndFeatureFlags(
      <ProductDetails
        product={
          {
            name: 'Some product',
            largeImage: 'some-product-image.jpg',
            description: 'Some description of the product',
            brand: { label: 'Some brand', code: 'some-brand' },
            categories: { lvl0: ['Some product category'] },
            gtin: '1234567890123',
            sku: '1010101',
            price: { value: 1234, currency: 'EUR' },
            availability: 'AVAILABLE',
            url: '/some-product-url',
            rating: {
              averageRating: 3.5,
              numberOfReviews: 100
            },
            ingredients: 'Some ingredients',
            usageNotes: 'Some usage notes',
            hints: 'Some hints'
          } as Product
        }
        brandDetailsPageUrl="/some-brand-details-page-url"
      />,
      {
        featureFlags: {}
      }
    )
  it('shows the description section open and expanded by default', () => {
    setup()
    expect(screen.getByTestId('productDescriptionPanel')).toHaveAttribute(
      'open'
    )
    const collapsedButton = screen.queryByTestId('productDescriptionCollapsed')
    expect(collapsedButton).toBeNull()
  })

  it('renders the product description panel', () => {
    setup()
    expect(
      screen.getByText('Some description of the product')
    ).toBeInTheDocument()
  })
  it('renders the product ingredients panel', () => {
    setup()
    expect(screen.getByText('Some ingredients')).toBeInTheDocument()
  })
  it('renders the product usage notes panel', () => {
    setup()
    expect(screen.getByText('Some usage notes')).toBeInTheDocument()
  })
  it('renders the product hints panel', () => {
    setup()
    expect(screen.getByText('Some hints')).toBeInTheDocument()
  })
})
