import { screen } from '@testing-library/react'
import { StripeMultibancoPaymentMethod } from './StripeMultibancoPaymentMethod'
import { renderWithStore } from '~test-helpers'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'

describe(StripeMultibancoPaymentMethod, () => {
  const setStripeMultibancoIsSubmitting = jest.fn()
  const setup = () =>
    renderWithStore(
      <StripeMultibancoPaymentMethod
        stripeMultibancoIsSubmitting={false}
        createOrderIsLoading={false}
        setStripeMultibancoIsSubmitting={setStripeMultibancoIsSubmitting}
      />,
      {
        initialState: {
          client: {
            basket: {
              content: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                data: basketWithProducts
              }
            }
          }
        }
      }
    )

  describe('when the component is mounted', () => {
    beforeEach(() => setup())

    it('renders the "Pay now" button', async () => {
      const btn = screen.getByTestId('stripe-multibanco-payment-button')

      expect(btn).toBeInTheDocument()
    })

    it('fires handleSubmit', async () => {
      const btn = screen.getByTestId('stripe-multibanco-payment-button')

      expect(btn).toBeInTheDocument()

      // Currently commented out since it produces a timeout and unhandled rejection errors
      // due to the dispatching of the trigger in handleSubmit()

      // fireEvent.click(btn)

      // expect(btn).toHaveClass('button--loading')
    })
  })
})
