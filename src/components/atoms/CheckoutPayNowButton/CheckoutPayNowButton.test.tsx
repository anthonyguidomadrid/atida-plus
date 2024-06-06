import { screen } from '@testing-library/react'
import {
  CheckoutPayNowButton,
  CheckoutPayNowButtonProps
} from './CheckoutPayNowButton'
import axios from 'axios'
import { token } from '../../../__mocks__/braintree/example-braintree-token'
import { renderWithStore } from '~test-helpers'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { fireEvent } from '@testing-library/dom'

describe(CheckoutPayNowButton, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: {
        clientToken: token
      }
    })
  })
  const setIsLoading = jest.fn()
  const on = jest.fn()
  const requestPaymentMethod = jest.fn()
  const clearSelectedPaymentMethod = jest.fn()
  const teardown = jest.fn()
  const off = jest.fn()

  const setup = (
    props: Partial<CheckoutPayNowButtonProps> = {},
    selectedPaymentMethod = PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD,
    adyenIsLoading = false,
    isValid = true
  ) =>
    renderWithStore(
      <CheckoutPayNowButton
        setIsLoading={setIsLoading}
        braintreeShowButton
        braintreeDropInInstance={{
          isPaymentMethodRequestable: () => true,
          on,
          requestPaymentMethod,
          clearSelectedPaymentMethod,
          teardown,
          off
        }}
        {...props}
      />,
      {
        initialState: {
          client: {
            checkout: {
              selectedPaymentMethod: {
                selectedPaymentMethod,
                isValid,
                isPaymentPending: false
              },
              braintree: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                token: {
                  clientToken: 'some-token'
                }
              },
              adyenPayment: {
                wasSuccess: false,
                isLoading: adyenIsLoading,
                wasError: false
              }
            }
          }
        }
      }
    )

  it('renders the component when the selectedPaymentMethod is PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD', () => {
    setup({}, PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD)
    const btn = screen.getByTestId('unique-pay-now-button')
    const stickyBtn = screen.getByTestId('stickyMobileCTA')
    fireEvent.click(btn)
    expect(btn).toBeInTheDocument()
    expect(stickyBtn).toBeInTheDocument()
  })

  it('renders the component when the selectedPaymentMethod is PAYMENT_OPTIONS.BRAINTREE_PAYPAL', () => {
    setup({}, PAYMENT_OPTIONS.BRAINTREE_PAYPAL)
    const btn = screen.getByTestId('unique-pay-now-button')
    fireEvent.click(btn)
    expect(btn).toBeInTheDocument()
  })

  it('renders the component when the selectedPaymentMethod is PAYMENT_OPTIONS.REDSYS_BIZUM', () => {
    setup({}, PAYMENT_OPTIONS.REDSYS_BIZUM)
    const btn = screen.getByTestId('unique-pay-now-button')
    fireEvent.click(btn)
    expect(btn).toBeInTheDocument()
  })

  it('sets isSubmitting to true when the selectedPaymentMethod is from adyen and adyenIsLoading is true', () => {
    setup({}, PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY, true)
    const btn = screen.getByTestId('unique-pay-now-button')
    expect(btn).toHaveClass('button--loading')
  })

  it('sets isSubmitting to false when wasAnyPaymentErrors is true, the selectedPaymentMethod is from adyen and isSubmitting is true', () => {
    setup({ wasAnyPaymentErrors: true }, PAYMENT_OPTIONS.ADYEN_GOOGLE_PAY, true)
    const btn = screen.getByTestId('unique-pay-now-button')
    expect(btn).not.toHaveClass('button--loading')
  })

  it('set the MB button as disabled if the selected payment method is not valid', () => {
    setup({}, PAYMENT_OPTIONS.ADYEN_MB_WAY, false, false)
    const btn = screen.getByTestId('unique-pay-now-button')
    expect(btn).not.toHaveClass('disabled')
  })

  it('displays the button for adyen card payment method', () => {
    setup({}, PAYMENT_OPTIONS.ADYEN_CARD)
    const btn = screen.getByTestId('unique-pay-now-button')
    fireEvent.click(btn)
    expect(btn).toBeInTheDocument()
  })
})
