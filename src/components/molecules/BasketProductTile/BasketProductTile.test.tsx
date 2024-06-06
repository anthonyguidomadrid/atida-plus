import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { InfoLabelEnum } from '~domains/product'
import { renderWithStore } from '~test-helpers'
import { BasketProductTile, BasketProductTileProps } from '.'

describe(BasketProductTile, () => {
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
    family: 'common',
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
    labels: [{ type: InfoLabelEnum.Promotion, label: 'Free sponge' }],
    handleRemoveItem: jest.fn(),
    handleChangeQuantity: jest.fn(),
    availableQty: 1,
    inputValue: '1',
    doExceeds: false,
    isPromo: false,
    decreaseQuantity: jest.fn(),
    increaseQuantity: jest.fn()
  }

  describe('with all available data', () => {
    const setup = (props: Partial<BasketProductTileProps> = {}) =>
      renderWithStore(
        <BasketProductTile {...defaultProps} {...props} idx={1} />
      )

    it('renders the product name as a link', () => {
      setup()
      expect(
        screen.getByRole('heading', { name: defaultProps.name })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('link', {
          name: defaultProps.name
        })
      ).toHaveAttribute('href', defaultProps.url)
    })

    it('renders the product image as a link', () => {
      setup()
      expect(
        screen.getByRole('img', {
          name: defaultProps.image.description
        })
      ).toHaveAttribute('src', defaultProps.image.url)
      expect(
        screen.getByRole('link', {
          name: defaultProps.image.description
        })
      ).toHaveAttribute('href', defaultProps.url)
    })

    it('renders a button to remove the item', () => {
      setup()
      expect(
        screen.getByRole('button', {
          name: `basket.item-remove ${defaultProps.name}`
        })
      ).toBeInTheDocument()
    })

    it('renders the pzn, format and unit volume', () => {
      setup()
      expect(
        screen.getByText(
          `product.pzn ${defaultProps.pzn} - ${defaultProps.format.label} - 250 ml`
        )
      ).toBeInTheDocument()
    })

    it('renders the items left text when there are less than 10 items left', () => {
      setup({ availableQty: 5 })
      expect(
        screen.getByText('5 product.availability.items-left')
      ).toBeInTheDocument()
    })

    it('renders the product labels', () => {
      setup()
      expect(screen.getByTestId('productLabel')).toBeInTheDocument()
    })

    it('renders the price per unit', () => {
      setup()
      expect(
        screen.getByText(`5.23 / ${defaultProps.pricePerUnit.unit}`)
      ).toBeInTheDocument()
    })

    it('renders the price', () => {
      setup()
      expect(screen.getByTestId('basketProductTilePrice')).toHaveTextContent(
        '26.14'
      )
    })

    describe('rrp', () => {
      it('renders the rrp', () => {
        setup()
        expect(screen.getByText('product.rrp 63.92')).toBeInTheDocument()
      })

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
  })

  describe('with only required data', () => {
    const setup = (props: Partial<BasketProductTileProps> = {}) =>
      renderWithStore(
        <BasketProductTile
          {...defaultProps}
          {...props}
          format={undefined}
          unitVolume={undefined}
          rrp={{ currency: undefined, value: undefined }}
          pricePerUnit={undefined}
          labels={undefined}
          idx={1}
        />
      )

    it('renders pzn without format and unit volume', () => {
      setup()
      expect(
        screen.getByText(`product.pzn ${defaultProps.pzn}`)
      ).toBeInTheDocument()
    })

    it('renders product quantity correctly when isPromo is true', () => {
      setup({ isPromo: true })
      expect(
        screen.getByTestId('basketProductTileQuantityText')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('quantitySelector')).not.toBeInTheDocument()
    })

    it('renders product quantity correctly when isPromo is false', () => {
      setup({ isPromo: false })
      expect(
        screen.queryByTestId('basketProductTileQuantityText')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('quantitySelector')).toBeInTheDocument()
    })

    it("doesn't render rrp", () => {
      setup()
      expect(screen.queryByText(/product\.rrp/)).not.toBeInTheDocument()
    })

    it("doesn't render price per unit", () => {
      setup()
      expect(
        screen.queryByTestId('basketProductTilePricePerUnit')
      ).not.toBeInTheDocument()
    })

    it("doesn't render product labels", () => {
      setup()
      expect(
        screen.queryByTestId('basketProductTileLabels')
      ).not.toBeInTheDocument()
    })
  })

  describe('when user interacts with the tile', () => {
    const setup = (props: Partial<BasketProductTileProps> = {}) =>
      renderWithStore(
        <BasketProductTile {...defaultProps} {...props} idx={1} />
      )

    it('calls handleRemoveItem when remove button is clicked', () => {
      const handleRemoveItem = jest.fn()
      setup({ handleRemoveItem })
      expect(handleRemoveItem).toHaveBeenCalledTimes(0)
      userEvent.click(
        screen.getByRole('button', {
          name: `basket.item-remove ${defaultProps.name}`
        })
      )
      expect(handleRemoveItem).toHaveBeenCalledTimes(1)
    })
    it('should not display a clickable title', () => {
      setup({ family: 'not_for_sale' })
      expect(
        screen.getByTestId('basketProductImageContainer')
      ).toBeInTheDocument()
    })
    it('should not display a clickable image', () => {
      setup({ family: 'not_for_sale' })
      expect(screen.getByTestId('basketProductTitleUrl')).not.toContainHTML(
        '<a>'
      )
    })
  })
})
