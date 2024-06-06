import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithStore } from '~test-helpers'
import { OrderSummaryProductTile, OrderSummaryProductTileProps } from '.'

describe(OrderSummaryProductTile, () => {
  const defaultProps = {
    product: {},
    name: 'Eucerin DermoCapillaire kopfhautberuhigendes Urea Shampoo',
    url: '/product-url',
    pzn: '08029959',
    format: {
      code: 'shampooCode',
      label: 'Shampoo'
    },
    unitVolume: {
      amount: 250,
      unit: 'MILLILITER',
      unitLabel: 'ml'
    },
    availability: 'AVAILABLE',
    quantity: 2,
    pricePerUnit: {
      value: 523,
      currency: 'EUR',
      unit: '100ml'
    },
    rrp: {
      value: 3196,
      currency: 'EUR'
    },
    price: {
      value: 2614,
      currency: 'EUR'
    },
    image: {
      url: 'https://source.unsplash.com/random/94x164?sig=0',
      description: 'Some description of the product image'
    },
    handleRemoveItem: jest.fn(),
    handleChangeQuantity: jest.fn(),
    isPromo: false,
    isFullyDiscounted: false
  }

  describe('with all available data', () => {
    const setup = (props: Partial<OrderSummaryProductTileProps> = {}) =>
      renderWithStore(
        <OrderSummaryProductTile {...defaultProps} {...props} idx={1} />
      )

    it('renders the product name', () => {
      setup()
      expect(
        screen.getByRole('heading', { name: defaultProps.name })
      ).toBeInTheDocument()
    })

    it('renders the product image', () => {
      setup()
      expect(
        screen.getByRole('img', {
          name: defaultProps.image.description
        })
      ).toHaveAttribute('src', defaultProps.image.url)
    })

    it('renders the pzn, format and unit volume', () => {
      setup()
      expect(
        screen.getByText(
          `product.pzn ${defaultProps.pzn} - ${defaultProps.format.label} - 250 ml`
        )
      ).toBeInTheDocument()
    })

    it('renders the price', () => {
      setup()
      expect(
        screen.getByTestId('orderSummaryProductTilePrice')
      ).toHaveTextContent('26.14')
    })

    describe('rrp', () => {
      it('does not render the rrp when rrp and price are equal', () => {
        setup({
          rrp: {
            value: 3196,
            currency: 'EUR'
          },
          price: {
            value: 6392,
            currency: 'EUR'
          }
        })
        expect(screen.queryByText(/product.rrp/)).not.toBeInTheDocument()
      })

      it('does not render the rrp when rrp is lower than the price', () => {
        setup({
          rrp: {
            value: 888,
            currency: 'EUR'
          },
          price: {
            value: 3196,
            currency: 'EUR'
          }
        })
        expect(screen.queryByText(/product.rrp/)).not.toBeInTheDocument()
      })
    })

    describe('isPromo', () => {
      it('should display the message GIFT - product_name if is a promotional item', () => {
        setup({ isPromo: true, isFullyDiscounted: true })
        expect(
          screen.getByTestId('orderSummaryProductTileName')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('orderSummaryProductTileName')
        ).toHaveTextContent(
          'CAMPAIGN-PROMO.GIFT - Eucerin DermoCapillaire kopfhautberuhigendes Urea Shampoo'
        )
      })
      it('should not display the word Gift if is not a promotional item', () => {
        setup()
        expect(
          screen.getByTestId('orderSummaryProductTileName')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('orderSummaryProductTileName')
        ).toHaveTextContent(
          'Eucerin DermoCapillaire kopfhautberuhigendes Urea Shampoo'
        )
      })
    })
  })
})
