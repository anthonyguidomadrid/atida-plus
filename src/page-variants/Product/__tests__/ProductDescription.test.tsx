import { render, screen } from '@testing-library/react'
import { Product } from '~domains/product'
import {
  ProductDescription,
  ProductDescriptionProps
} from '../ProductDescription'

describe(ProductDescription, () => {
  const defaultProps = {
    product: {
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
      usageNotes: 'Test usage notes',
      assetCertificateList: [
        'https://www.mifarma.es/media/pdfs/PROSPECTOS/NATALBEN_DESARROLLO.pdf'
      ]
    } as Product,
    productUsageLeaflets: [
      {
        type: 'Beipackzettel (PDF)',
        url:
          'https://www.mifarma.es/media/pdfs/PROSPECTOS/NATALBEN_DESARROLLO.pdf'
      }
    ]
  }
  const setupAsUsageNotes = (props: Partial<ProductDescriptionProps> = {}) =>
    render(
      <ProductDescription
        {...defaultProps}
        type="usageNotes"
        collapsible
        showUsageLeaflets
        {...props}
      />
    )

  const setupAsDescription = (props: Partial<ProductDescriptionProps> = {}) =>
    render(
      <ProductDescription
        {...defaultProps}
        type="description"
        collapsible
        showCertificateButtons
        {...props}
      />
    )

  it('renders the usage notes', () => {
    setupAsUsageNotes()
    expect(screen.getByText('Test usage notes')).toBeInTheDocument()
  })
  it('renders the download usage leaflets button', () => {
    setupAsUsageNotes()
    expect(screen.getAllByTestId('usageLeafletButton')[0]).toHaveTextContent(
      'Beipackzettel (PDF)'
    )
  })
  it('does not render the product description', () => {
    setupAsUsageNotes()
    expect(
      screen.queryByText('Some description of the product')
    ).not.toBeInTheDocument()
  })
  it('does not render the pharmaceutical advice', () => {
    setupAsUsageNotes()
    expect(
      screen.queryByText('Some pharmaceutical advice')
    ).not.toBeInTheDocument()
  })

  it('renders the product description', () => {
    setupAsDescription()
    expect(
      screen.getByText('Some description of the product')
    ).toBeInTheDocument()
  })
  it('renders the download certificate button', () => {
    setupAsDescription()
    expect(screen.getAllByTestId('certificateButton')[0]).toHaveTextContent(
      'product.view-product-certificate'
    )
  })
})
