import { screen } from '@testing-library/react'
import { PaymentMethod } from '~components/atoms/PaymentMethod'
import { ReactComponent as CreditCards } from '~assets/svg/payment-providers/CreditCards.svg'
import { ReactComponent as Paypal } from '~assets/svg/payment-providers/PaypalNoPadding.svg'
import { ReactComponent as ApplePay } from '~assets/svg/payment-providers/ApplePay.svg'
import {
  PaymentMethodGroup,
  PaymentMethodGroupProps
} from './PaymentMethodGroup'
import userEvent from '@testing-library/user-event'
import { Button } from '~components/atoms/Button'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { PAYMENT_OPTIONS } from '~config/constants/payments'
import { FeatureFlag } from '~config/constants/feature-flags'

describe(PaymentMethodGroup, () => {
  const setup = (
    props: Partial<PaymentMethodGroupProps> = {
      locale: 'pt-pt',
      isAdyenApplePayEnabled: false
    },
    lastUsedPaymentCode: string | undefined,
    disabled = false
  ) =>
    renderWithStoreAndFeatureFlags(
      <PaymentMethodGroup disabled={disabled} {...props}>
        <PaymentMethod
          key="multibanco"
          name="Multibanco"
          inputName="payment-method"
          inputValue="multibanco"
          disabled={false}
          icon={<CreditCards className="h-5" />}
        >
          <Button className="w-35">Pay now</Button>
        </PaymentMethod>
        <PaymentMethod
          key="braintree"
          name="Paypal / Credit Card"
          inputName="payment-method"
          inputValue="braintree"
          disabled={false}
          icon={<Paypal className="icon-24" />}
        />
        <PaymentMethod
          key="braintree_card"
          name="Credit Card"
          inputName="payment-method"
          inputValue="braintree_card"
          disabled={false}
          icon={<CreditCards className="icon-24" />}
        />
        <PaymentMethod
          key="adyen_applepay"
          name="Credit Card"
          inputName="payment-method"
          inputValue="adyen_applepay"
          disabled={false}
          icon={<ApplePay className="icon-24" />}
        />
        Some text that probably shouldn't be here
      </PaymentMethodGroup>,
      {
        initialState: {
          client: {
            checkout: {
              data: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                details: {
                  lastUsedPaymentCode
                }
              }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.CHECKOUT_PAYMENT_BRAINTREE_PAYMENT_METHOD_VISA_MASTER]: true
        }
      }
    )

  it('renders each payment method', () => {
    setup({}, undefined)
    expect(
      screen.getByTestId('checkoutPaymentMethod-multibanco')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('checkoutPaymentMethod-braintree')
    ).toBeInTheDocument()
  })

  it('should render any "invalid" elements plainly', () => {
    setup({}, undefined)
    expect(screen.getByText(/Some text that probably/)).toBeInTheDocument()
  })

  it('fires onPaymentMethodChange handler when an option is selected', () => {
    const onPaymentMethodChange = jest.fn()
    setup({ onPaymentMethodChange }, undefined)
    expect(onPaymentMethodChange).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByText('Multibanco'))
    expect(onPaymentMethodChange).toHaveBeenCalledTimes(1)
    expect(onPaymentMethodChange).toHaveBeenCalledWith('multibanco')
  })

  it('selects braintree by default on page load', () => {
    setup({ locale: 'es-es' }, undefined)
    expect(
      screen.getByTestId('paymentMethodCheckBox-braintree_card')
    ).toBeChecked()

    expect(
      screen.getByTestId('paymentMethodCheckBox-multibanco')
    ).not.toBeChecked()
  })

  it('does not select any payment method if disabled', () => {
    setup({ locale: 'es-es' }, undefined, true)
    expect(
      screen.getByTestId('paymentMethodCheckBox-braintree')
    ).not.toBeChecked()
  })

  it('only allows one option to be selected at a time', () => {
    setup({ locale: 'es-es' }, undefined)
    expect(
      screen.getByTestId('paymentMethodCheckBox-multibanco')
    ).not.toBeChecked()
    expect(
      screen.getByTestId('paymentMethodCheckBox-braintree_card')
    ).toBeChecked()

    userEvent.click(screen.getByTestId('paymentMethodCheckBox-multibanco'))

    expect(screen.getByTestId('paymentMethodCheckBox-multibanco')).toBeChecked()
    expect(
      screen.getByTestId('paymentMethodCheckBox-braintree')
    ).not.toBeChecked()
  })

  it('selects braintree_card by default if lastUsedPaymentCode is PAYMENT_OPTIONS.ADYEN_APPLE_PAY and locale is es-es', () => {
    setup({ locale: 'es-es' }, PAYMENT_OPTIONS.ADYEN_APPLE_PAY)
    expect(
      screen.getByTestId('paymentMethodCheckBox-braintree_card')
    ).toBeChecked()

    expect(
      screen.getByTestId('paymentMethodCheckBox-adyen_applepay')
    ).not.toBeChecked()
  })

  it('doesn not select anything by default if lastUsedPaymentCode is PAYMENT_OPTIONS.ADYEN_APPLE_PAY and locale is pt-pt', () => {
    setup({}, PAYMENT_OPTIONS.ADYEN_APPLE_PAY)
    expect(
      screen.getByTestId('paymentMethodCheckBox-adyen_applepay')
    ).not.toBeChecked()
  })
})
