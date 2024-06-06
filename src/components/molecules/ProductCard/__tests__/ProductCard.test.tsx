import { screen } from '@testing-library/react'
import { ProductCard, ProductCardProps } from '..'
import { product } from '../ProductCard.mock'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe('ProductCard', () => {
  const setup = (props: Partial<ProductCardProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <ProductCard {...product} {...props} idx={1} />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_FAVOURITES_ALL_PAGES]: true,
          [FeatureFlag.PRODUCT_QUANTITY_SELECTOR]: true
        }
      }
    )

    reset()
    return renderedComponent
  }

  describe('test id and attributes', () => {
    it('renders with correct test id', () => {
      setup()
      expect(screen.getByTestId('productCard')).toBeInTheDocument()
    })

    it('renders title', () => {
      setup()
      expect(
        screen.getByText(
          'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas Kraftfahrzeug-Haftpflichtversicherung 2+1'
        )
      ).toBeInTheDocument()
    })

    it('renders the product card as a link', () => {
      setup()
      const links = screen.getAllByTestId('productCardLink')
      links.map(link => {
        expect(link).toHaveAttribute('href', product.url)
      })
    })

    it('renders the pzn, format and unit volume', () => {
      setup()
      expect(
        screen.getByText(
          `product.pzn ${product.pzn} - ${product.format.label} - 100 ml`
        )
      ).toBeInTheDocument()
    })

    it('renders the add to favourites button', () => {
      setup()
      expect(screen.getByTestId('saveToFavouritesButton')).toBeInTheDocument()
    })

    it('renders with only required data', () => {
      const { container } = setup({
        brand: undefined,
        url: undefined,
        format: undefined,
        name: undefined,
        pricePerUnit: undefined,
        rrp: undefined,
        productDatImage: undefined,
        productTileRetinaImage: undefined,
        productTileImage: undefined,
        price: undefined,
        sku: undefined,
        labels: undefined
      })
      expect(container).toBeInTheDocument()
      expect(
        screen.queryByTestId('productCard-100000000')
      ).not.toBeInTheDocument()
    })
  })

  describe('add to basket controls', () => {
    it('renders the add to basket controls', () => {
      setup({ basketQuantity: 0 })
      expect(screen.getByTestId('addToBasketControls')).toBeInTheDocument()
    })
  })
})
