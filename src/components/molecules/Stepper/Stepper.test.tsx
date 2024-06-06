import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { Stepper, StepperProps } from '.'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { Addresses } from '~domains/account/__mocks__/get-customer-addresses'
import { CustomerAddress } from '~domains/account'
import { useRouter } from 'next/router'
import { FeatureFlag } from '~config/constants/feature-flags'

describe('Stepper', () => {
  const setup = (
    props: Partial<StepperProps> = {},
    isMiddleFormat = true,
    isLogged = true,
    isCheckoutHeaderNavigationUpdateStyleEnabled = false,
    addresses: CustomerAddress[] = []
  ) => {
    const { reset } = setupMatchMediaMock(isMiddleFormat)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <Stepper
        activeStep={0}
        reachedStep={0}
        guestStep={0}
        reachedGuestStep={0}
        setActiveStep={jest.fn()}
        setGuestStep={jest.fn()}
        {...props}
      />,
      {
        initialState: {
          client: {
            account: {
              customer: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                reference: isLogged ? 'PT-1234' : '',
                showNotification: false,
                addresses
              }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true,
          [FeatureFlag.CHECKOUT_HEADER_NAVIGATION_UPDATE_STYLE]: isCheckoutHeaderNavigationUpdateStyleEnabled
        }
      }
    )
    reset()
    return renderedComponent
  }

  describe('Stepper component as a customer', () => {
    it('renders Stepper component', () => {
      setup()
      expect(screen.getByTestId('Stepper')).toBeInTheDocument()
    })

    it('renders a tab', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'pt-pt'
      }))
      setup({}, true, true, false, Addresses)
      expect(
        screen.getByText('2. checkout.payment-step-title')
      ).toBeInTheDocument()
    })

    it('renders reduced tab labels on smaller screens', () => {
      setup({}, false)
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('should call onClick handler', () => {
      const onClick = jest.fn()
      setup({ onClick }, false)

      userEvent.click(screen.getByText('1'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Stepper component as a customer - No addresses', () => {
    it('renders a tab', () => {
      setup({}, true, false)
      expect(
        screen.getByText('3. checkout.payment-step-title')
      ).toBeInTheDocument()
    })
  })

  describe('Stepper component as a guest', () => {
    it('renders second tab', () => {
      setup({}, true, false)
      expect(
        screen.getByText('2. checkout.delivery-step-title')
      ).toBeInTheDocument()
    })

    it('renders second tab when isMiddleFormat is true, isLogged is true and the customer has addresses', () => {
      setup({}, true, true, true, Addresses)
      expect(
        screen.getByText('checkout.delivery-step-title')
      ).toBeInTheDocument()
    })

    it('renders second tab when isMiddleFormat is true, isLogged is false', () => {
      setup({}, true, false, true)
      expect(
        screen.getByText('checkout.delivery-step-title')
      ).toBeInTheDocument()
    })

    it('should call setGuestStep when clicking handler', () => {
      const onClick = jest.fn()
      const setGuestStep = jest.fn()
      setup({ onClick, setGuestStep }, false, false)

      userEvent.click(screen.getByText('1'))

      expect(setGuestStep).toHaveBeenCalledTimes(1)
    })
  })
})
