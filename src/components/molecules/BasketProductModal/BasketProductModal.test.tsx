import { screen } from '@testing-library/react'
import { BasketProductModal, BasketProductModalProps } from '.'
import { renderWithStore } from '~test-helpers'
import userEvent from '@testing-library/user-event'

describe(BasketProductModal, () => {
  const defaultProps = {
    product: {
      basketQuantity: 1,
      brand: { code: 'adeephelan', label: 'AdeePhelan' },
      format: { code: 'smoothie', label: 'Smoothie' },
      name: 'Chupete Fusion Suavinex Tetina Anatómica Látex -2-4m Verde',
      price: { currency: 'EUR', value: 10400 },
      pricePerUnit: { value: 10400, currency: 'EUR', unit: '100 ml' },
      rrp: { value: 15498, currency: 'EUR' },
      sku: '100000006',
      gtin: '1234567890123',
      maxQuantity: 50,
      productDatImage:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_1.jpg',
      thumbnailImage:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_1.jpg',
      mediumImage:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_2.jpg',
      largeImage:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_3.jpg',
      productTileImage:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_4.jpg',
      productTileRetinaImage:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_5.jpg',
      unitVolume: { unit: 'MILLILITER', amount: 100, unitLabel: 'ml' }
    },
    productSku: '100000006',
    productQuantity: 1,
    promotionalItem: {
      handleQuantityChange: false,
      handleRemoval: false,
      parentSku: ''
    }
  }

  describe('with all available data', () => {
    const setup = (props: Partial<BasketProductModalProps> = {}) =>
      renderWithStore(<BasketProductModal {...defaultProps} {...props} />)

    it('renders product name', () => {
      setup()
      expect(screen.getByText(defaultProps.product.name)).toBeInTheDocument()
    })

    it('renders product image', () => {
      setup()
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        defaultProps.product.thumbnailImage
      )
    })

    it('renders the price', () => {
      setup()
      expect(
        screen.getByTestId('basketProductModalSalePrice')
      ).toHaveTextContent('104.00')
    })

    describe('rrp', () => {
      it('renders the rrp', () => {
        setup()
        expect(screen.getByText('product.rrp 154.98')).toBeInTheDocument()
      })

      it('does not render the rrp when rrp and price are equal', () => {
        setup({
          product: {
            ...defaultProps.product,
            price: { currency: 'EUR', value: 10400 },
            rrp: { value: 10400, currency: 'EUR' }
          }
        })
        expect(screen.queryByText(/product.rrp/)).not.toBeInTheDocument()
      })

      it('does not render the rrp when rrp is lower than the price', () => {
        setup({
          product: {
            ...defaultProps.product,
            price: { currency: 'EUR', value: 10800 },
            rrp: { value: 9800, currency: 'EUR' }
          }
        })
        expect(screen.queryByText(/product.rrp/)).not.toBeInTheDocument()
      })
    })

    describe('product modal actions', () => {
      it('renders quantity selector when item is in the basket', () => {
        setup({ productQuantity: 1 })
        expect(screen.getByTestId('addToBasketButton')).toHaveClass('hidden')
        expect(screen.getByTestId('quantitySelector')).not.toHaveClass('hidden')
      })

      it('calls changeQuantity when plus button is clicked', () => {
        const changeQuantity = jest.fn()
        setup({ changeQuantity })
        expect(changeQuantity).toHaveBeenCalledTimes(0)
        userEvent.click(screen.getByTestId('decreaseQuantityButton'))
      })

      it('calls changeQuantity when plus button is clicked', () => {
        const changeQuantity = jest.fn()
        setup({ changeQuantity })
        expect(changeQuantity).toHaveBeenCalledTimes(0)
        userEvent.click(screen.getByTestId('decreaseQuantityButton'))
      })

      it('add to basket button is disabled when a product is out of stock', () => {
        const { container } = setup({
          availability: 'NOT_AVAILABLE' || undefined
        })
        expect(container).toBeInTheDocument()
        expect(screen.getByTestId('addToBasketButton')).toBeDisabled()
      })

      it('addToBasket is not called when a disabled add to basket button is clicked', () => {
        const addToBasket = jest.fn()
        const openBasketModal = jest.fn()
        const { container } = setup({
          addToBasket,
          openBasketModal,
          availability: 'NOT_AVAILABLE' || undefined
        })
        expect(container).toBeInTheDocument()
        expect(addToBasket).toHaveBeenCalledTimes(0)
        userEvent.click(screen.getByTestId('addToBasketButton'))
        expect(addToBasket).toHaveBeenCalledTimes(0)
      })
    })
  })
})
