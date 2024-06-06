import { screen } from '@testing-library/react'
import { BasketSummary, BasketSummaryProps } from '.'
import { renderWithStore } from '~test-helpers'

describe(BasketSummary, () => {
  const onOrderClick = jest.fn()
  const defaultProps = {
    onOrderClick,
    numberOfItems: 3,
    currency: 'EUR',
    // numberOfProducts: 2,
    subTotalPrice: 1598,
    discounts: [
      {
        displayName: 'Some discount',
        amount: 291
      }
    ],
    basketCouponData: [
      {
        amount: 363,
        code: 'total-20-percent-off',
        displayName: '20 percent OFF all products'
      }
    ],
    totalProducts: 1307,
    shipping: 495,
    grandTotal: 1802,
    isLoading: false,
    unavailableProducts: []
  }

  describe('basket summary', () => {
    const setup = (props: Partial<BasketSummaryProps> = {}) =>
      renderWithStore(<BasketSummary {...defaultProps} {...props} />)

    it('renders basket summary', () => {
      setup()
      expect(screen.getByTestId('basketSummary')).toBeInTheDocument()
    })

    it('renders an order button', () => {
      setup()
      expect(
        screen.getByRole('button', {
          name: 'basket.order'
        })
      ).toBeInTheDocument()
    })

    it('renders all usps', () => {
      setup()
      expect(screen.queryByTestId('usp1')).toBeInTheDocument()
      expect(screen.queryByTestId('usp2')).toBeInTheDocument()
      expect(screen.queryByTestId('usp3')).toBeInTheDocument()
    })

    it('renders payment method icons', () => {
      setup()
      expect(
        screen.getByTestId('basketAvailablePaymentMethods')
      ).toBeInTheDocument()
    })
  })
})
