import { screen } from '@testing-library/react'
import { OrderSummary, OrderSummaryProps } from '.'
import userEvent from '@testing-library/user-event'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'

describe(OrderSummary, () => {
  const defaultProps = {
    numberOfItems: 3,
    currency: 'EUR',
    subTotalPrice: 1500,
    shipping: 299,
    grandTotal: 1696,
    rewardTotal: 199,
    openOrderDetails: false,
    isLoggedIn: true
  }

  describe('order summary', () => {
    const setup = (
      props: Partial<OrderSummaryProps> = {},
      paymentIcons?: string[]
    ) => {
      const handlePaymentProceed = jest.fn()
      const renderedComponent = renderWithStoreAndFeatureFlags(
        <OrderSummary
          items={[]}
          {...defaultProps}
          {...props}
          handlePaymentProceed={handlePaymentProceed}
        />,
        {
          initialState: {
            server: {
              page: {
                common: {
                  isLoading: false,
                  wasError: false,
                  wasSuccess: true,
                  campaignLabels: [],
                  footer: {
                    newsletterBlockTitle: '',
                    newsletterSellingPoints: [],
                    copyright: '',
                    socialMediaLinks: [],
                    providerBlocks: paymentIcons
                      ? [
                          {
                            title: 'test',
                            content: 'test',
                            icons: paymentIcons
                          }
                        ]
                      : []
                  }
                }
              }
            }
          },
          featureFlags: {
            [FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH]: true
          }
        }
      )
      return renderedComponent
    }

    it('renders order summary', () => {
      setup()
      expect(screen.getByTestId('orderSummary')).toBeInTheDocument()
    })

    it('renders Your order heading', () => {
      setup()
      expect(screen.getByRole('heading', { name: 'order.your-order' }))
    })

    it('renders OrderSummaryProductList when the show details is clicked', () => {
      setup({ openOrderDetails: true })

      expect(screen.getByTestId('orderSummaryProductList')).toBeInTheDocument()
    })

    it('adapts the classes if the payment ordered', () => {
      setup({ paymentOrdered: true })
      expect(screen.getByTestId('orderSummary')).toHaveClass(
        'border border-ui-grey-lightest'
      )
    })

    it('fires onClick event when the wrapping div is clicked', () => {
      const handleOpenOrderDetails = jest.fn()
      setup({
        paymentOrdered: true,
        handleOpenOrderDetails: handleOpenOrderDetails
      })
      userEvent.click(screen.getByTestId('yourOrderDiv'))
      expect(handleOpenOrderDetails).toHaveBeenCalledTimes(1)
    })

    it('renders payment method icons when you are on delivery step as a logged user', () => {
      setup({ activeStep: 0 })
      expect(screen.getByTestId('availablePaymentMethods')).toBeInTheDocument()
    })

    it('renders payment icons for guest user if guestStep is 0', () => {
      setup({ guestStep: 0, isLoggedIn: false })
      expect(screen.getByTestId('availablePaymentMethods')).toBeInTheDocument()
    })

    it('renders payment icons for guest user if guestStep is 1', () => {
      setup({ guestStep: 1, isLoggedIn: false })
      expect(screen.getByTestId('availablePaymentMethods')).toBeInTheDocument()
    })

    it('renders payment method icons', () => {
      setup({ activeStep: 0 }, ['Checkmark', 'Blog'])
      expect(screen.queryAllByTestId('usp-payment-method-icon')).toHaveLength(2)
    })

    it('renders the CheckoutPayNowButton component with correct position when user is logged in', () => {
      const setIsLoading = jest.fn()
      setup({ isPaymentStepActive: true, setIsLoading })
      expect(screen.queryByTestId('unique-pay-now-button')).toBeInTheDocument()
      expect(screen.queryByTestId('unique-pay-now-button')).toHaveClass(
        '-top-16.5'
      )
    })

    it('renders the CheckoutPayNowButton component with correct position when user is not logged in', () => {
      const setIsLoading = jest.fn()
      setup({
        isPaymentStepActive: true,
        rewardTotal: 0,
        setIsLoading,
        isLoggedIn: false
      })
      expect(screen.queryByTestId('unique-pay-now-button')).toBeInTheDocument()
      expect(screen.queryByTestId('unique-pay-now-button')).toHaveClass(
        '-top-10'
      )
    })
  })
})
