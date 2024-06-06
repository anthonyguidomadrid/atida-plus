import { render, screen } from '@testing-library/react'
import { Price, PriceProps } from '.'

describe(Price, () => {
  const defaultProps = {
    price: {
      value: 1299,
      currency: 'EUR'
    },
    pricePerUnit: {
      value: 516,
      currency: 'EUR',
      unit: '100ml'
    },
    rrp: {
      value: 1598,
      currency: 'EUR'
    }
  }
  const setup = (props: Partial<PriceProps> = {}) =>
    render(<Price {...defaultProps} {...props} />)
  it('renders the price', () => {
    setup()
    expect(screen.getByTestId('pricePrice')).toHaveTextContent('12.99')
  })
  it('renders the price per unit', () => {
    setup()
    expect(screen.getByTestId('pricePricePerUnit')).toHaveTextContent(
      '5.16 / 100ml'
    )
  })
  it('does not crash when price per unit is not passed', () => {
    const { container } = setup({ pricePerUnit: undefined })
    expect(container).toBeInTheDocument()
  })

  describe('rrp', () => {
    it('renders the rrp', () => {
      setup({ showRRP: true })
      expect(screen.getByTestId('priceRRP')).toBeInTheDocument()
    })
    it('does not render the rrp when rrp is lower than the price', () => {
      setup({
        price: {
          value: 1288,
          currency: 'EUR'
        },
        rrp: {
          value: 1088,
          currency: 'EUR'
        }
      })
      expect(screen.queryByText(/product.rrp/)).not.toBeInTheDocument()
    })
    it('does not render the rrp when price and rrp are equal', () => {
      setup({
        price: {
          value: 1299,
          currency: 'EUR'
        },
        rrp: {
          value: 1299,
          currency: 'EUR'
        }
      })
      expect(screen.queryByText(/product.rrp/)).not.toBeInTheDocument()
    })
    it('does not crash when rrp is not passed', () => {
      const { container } = setup({ rrp: undefined })
      expect(container).toBeInTheDocument()
    })
  })
})
