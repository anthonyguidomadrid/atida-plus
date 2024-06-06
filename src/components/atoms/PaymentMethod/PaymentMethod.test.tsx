import { screen } from '@testing-library/react'
import { PaymentMethod, PaymentMethodProps } from './PaymentMethod'
import { ReactComponent as Multibanco } from '~assets/svg/payment-providers/Multibanco.svg'
import userEvent from '@testing-library/user-event'
import { Button } from '~components/atoms/Button'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { createAdyenPaymentResponseData } from '~domains/checkout/__mocks__/create-adyen-payment'
import { adyenPaymentDetailsResponseData } from '~domains/checkout/__mocks__/adyen-payment-details'
import { FeatureFlag } from '~config/constants/feature-flags'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { AdyenPaymentDetailsResponseData } from '~domains/checkout/types'

describe(PaymentMethod, () => {
  const setup = (
    props: Partial<PaymentMethodProps> = {},
    adyenPaymentDetailsResponseDataMock:
      | AdyenPaymentDetailsResponseData
      | undefined = undefined,
    isLoyaltyAtidaCashEnabled = false
  ) =>
    renderWithStoreAndFeatureFlags(
      <PaymentMethod
        key="multibanco"
        name="Multibanco"
        inputName="payment-method"
        inputValue="multibanco"
        disabled={false}
        icon={<Multibanco className="h-5" aria-label="icon" />}
        onChange={jest.fn()}
        {...props}
      >
        <Button className="w-35">Pay now</Button>
      </PaymentMethod>,
      {
        initialState: {
          client: {
            checkout: {
              adyenPayment: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                details: createAdyenPaymentResponseData
              },
              multiplePayments: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                details: {
                  adyen: createAdyenPaymentResponseData
                }
              },
              adyenPaymentDetails: {
                isLoading: false,
                wasSuccess: !adyenPaymentDetailsResponseDataMock,
                wasError: false,
                ...(adyenPaymentDetailsResponseDataMock && {
                  details: adyenPaymentDetailsResponseDataMock
                })
              }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH]: isLoyaltyAtidaCashEnabled
        }
      }
    )

  it('renders required information', () => {
    setup()
    expect(screen.getByText('Multibanco')).toBeInTheDocument()
    expect(screen.getByLabelText('icon')).toBeInTheDocument()
  })

  it('hides the children initially', () => {
    setup()
    expect(screen.queryByText('Pay now')).not.toBeInTheDocument()
  })

  it('renders the radio input with correct name and value', () => {
    setup()
    expect(
      screen.getByTestId('paymentMethodCheckBox-multibanco')
    ).toHaveAttribute('name', 'payment-method')
    expect(
      screen.getByTestId('paymentMethodCheckBox-multibanco')
    ).toHaveAttribute('value', 'multibanco')
  })

  it('fires the onChange callback when selected', () => {
    const onChange = jest.fn()
    setup({ onChange })
    expect(onChange).not.toHaveBeenCalled()
    userEvent.click(screen.getByTestId('paymentMethodCheckBox-multibanco'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('does not disable the method when the inputValue is PAYMENT_OPTIONS.ADYEN_CARD and isChecked is true and the feature flags are turned on', () => {
    setup(
      { inputValue: PAYMENT_OPTIONS.ADYEN_CARD, isChecked: true },
      undefined,
      true
    )
    expect(
      screen.getByTestId(`checkoutPaymentMethod-${PAYMENT_OPTIONS.ADYEN_CARD}`)
    ).not.toHaveClass('opacity-50')
  })

  it('does not disable the method when the inputValue is PAYMENT_OPTIONS.ADYEN_CARD and isChecked is true', () => {
    setup({ inputValue: PAYMENT_OPTIONS.ADYEN_CARD, isChecked: true })
    expect(
      screen.getByTestId(`checkoutPaymentMethod-${PAYMENT_OPTIONS.ADYEN_CARD}`)
    ).not.toHaveClass('opacity-50')
  })

  it('hides the element when the inputValue is PAYMENT_OPTIONS.ADYEN_CARD and there is adyenPaymentDetailsData', () => {
    setup(
      { inputValue: PAYMENT_OPTIONS.ADYEN_CARD, isChecked: true },
      adyenPaymentDetailsResponseData
    )
    expect(screen.getByTestId('checkedPaymentMethod')).toHaveClass('hidden')
  })

  describe('when disabled/checked', () => {
    it('is not clickable', () => {
      const onChange = jest.fn()
      setup({ disabled: true, isChecked: true, onChange })
      expect(onChange).not.toHaveBeenCalled()
      userEvent.click(screen.getByTestId('paymentMethodCheckBox-multibanco'))
      expect(onChange).toHaveBeenCalledTimes(0)
    })
  })

  describe('when selected', () => {
    it('reveals the children', () => {
      setup({ isChecked: true })
      expect(screen.getByText('Pay now')).toBeInTheDocument()
    })
  })
})
