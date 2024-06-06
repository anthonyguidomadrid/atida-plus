import { act, render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { GroupOfStaticContentBlocks } from '~domains/contentful'
import { CashBalance, CashBalanceProps } from '.'

describe(CashBalance, () => {
  const defaultProps = {
    amount: 302333,
    currency: 'EUR',
    isLoading: false,
    modalData: {
      contentType: 'GroupOfStaticContentBlocks',
      title: 'Atida Cash Intro - ES',
      blocks: [
        {
          contentType: 'StaticContentBlock',
          title: 'Welcome to Atida Cash - ES',
          content:
            '<p>Check your balance, discover ways to earn extra Atida Cash, and much more. - ES</p>',
          icon: 'WalletGreen'
        },
        {
          contentType: 'StaticContentBlock',
          title: 'Earn up to 5% Atida Cash - ES',
          content:
            '<p>You now earn between 1-5% Atida Cash for every product you buy. - ES</p>',
          icon: 'ClaimedRewardGreen'
        },
        {
          contentType: 'StaticContentBlock',
          title: 'Use at the payment step - ES',
          content:
            '<p>Atida Cash can be used at the payment step on every order, with no minumum spend. - ES</p>',
          icon: 'CoinsBalanceGreen'
        }
      ],
      type: 'Bullet points'
    } as GroupOfStaticContentBlocks
  }

  const setup = (
    props: Partial<CashBalanceProps> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const component = render(<CashBalance {...defaultProps} {...props} />)

    reset()
    return component
  }

  describe('cash balance amount and currency', () => {
    it('renders the cash balance amount and currency', () => {
      setup({ amount: 999888 })
      expect(screen.getByTestId('cash-balance-amount')).toHaveTextContent(
        '€9,998.88'
      )
    })

    it('renders the cash balance amount with default amount', () => {
      setup({ amount: undefined })
      expect(screen.getByTestId('cash-balance-amount')).toHaveTextContent('€0')
    })

    it('renders the cash balance amount with default currency', () => {
      setup({ amount: 0, currency: undefined })
      expect(screen.getByTestId('cash-balance-amount')).toHaveTextContent('€0')
    })
  })

  describe('cash balancee className', () => {
    it('cash balance block should have className wrapper', () => {
      setup({ className: 'wrapper' })
      expect(screen.getByTestId('cash-balance')).toHaveClass('wrapper')
    })
  })

  describe('cash balance loading state', () => {
    it('renders the loader', () => {
      setup({ isLoading: true })
      expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument()
    })

    it('does not render the loader', () => {
      setup({ isLoading: false })
      expect(screen.queryByTestId('loadingSpinner')).not.toBeInTheDocument()
    })

    it('shows the amount', () => {
      setup({ isLoading: undefined })
      expect(screen.queryByTestId('cash-balance-amount')).toBeInTheDocument()
    })
  })

  describe('close atida cash intro modal', () => {
    it('closes the modal after cross icon click', () => {
      setup()
      const button = screen.getByTestId('close-modal')
      act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      })

      expect(button).not.toBeInTheDocument()
    })

    it('closes the modal after button is clicked 3 times', () => {
      setup()
      const modalButton = screen.getByTestId('modal-button')

      ;[1, 2, 3].forEach(() => {
        act(() => {
          modalButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })
      })

      expect(modalButton).not.toBeInTheDocument()
    })
  })
})
