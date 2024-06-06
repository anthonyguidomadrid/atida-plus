import { render, screen } from '@testing-library/react'
import { FeatureFlag } from '~config/constants/feature-flags'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { normalizeAlgoliaProduct } from '~domains/product'
import { algoliaProduct } from '~domains/product/__mocks__/product'
import { SearchResult } from './SearchResult'

describe(SearchResult, () => {
  const productMock = normalizeAlgoliaProduct('en-gb', {
    ...algoliaProduct,
    price: { currency: 'EUR', sale: 9999, rrp: 8888, cost: 9999 }
  })
  const defaultProps = {
    product: productMock,
    handleClick: jest.fn(),
    mainPrice: {
      integerAndDecimal: '99.99',
      fraction: '99.99',
      asOne: '99.99',
      withCurrency: '99.99€',
      currency: '€'
    },
    rrpPrice: {
      integerAndDecimal: '88.88',
      fraction: '88.88',
      asOne: '88.88',
      withCurrency: '88.88€',
      currency: '€'
    },
    formattedUnitVolume: '100 ml',
    isAlternativeImageFormatsEnabled: true,
    AVIFCompressionRate: 50,
    WEBPCompressionRate: 80,
    featureFlags: {
      [FeatureFlag.PRODUCT_IMAGE_ALLOW_ALTERNATIVE_FORMATS]: true
    }
  }
  const setup = (props = {}) => {
    const { reset } = setupMatchMediaMock(true)
    render(<SearchResult {...defaultProps} {...props} />)
    reset()
  }
  it('renders the link', () => {
    setup()
    expect(screen.queryByTestId('search-result-link')).toBeInTheDocument()
    expect(screen.queryByTestId('search-result-wrapper')).toBeInTheDocument()
  })
  it('renders the image', () => {
    setup()
    expect(
      screen.queryByTestId('search-result-image-wrapper')
    ).toBeInTheDocument()
  })
  it('renders the product name and price', () => {
    setup()
    expect(screen.queryByTestId('search-result-item-name')).toBeInTheDocument()
    expect(screen.queryByTestId('search-result-item-price')).toBeInTheDocument()
  })
  it('renders the RRP price when it is not the same as the current one', () => {
    setup()
    expect(screen.queryByTestId('priceRRP')).toBeInTheDocument()
    expect(screen.queryByTestId('search-result-item-price')).toBeInTheDocument()
  })
  it('does not render the RRP price when it is the same as the current one', () => {
    setup({
      product: normalizeAlgoliaProduct('en-gb', algoliaProduct),
      rrpPrice: {
        integerAndDecimal: '99.99',
        fraction: '99.99',
        asOne: '99.99',
        withCurrency: '99.99€',
        currency: '€'
      }
    })
    expect(screen.queryByTestId('priceRRP')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-result-item-price')).toBeInTheDocument()
  })
})
