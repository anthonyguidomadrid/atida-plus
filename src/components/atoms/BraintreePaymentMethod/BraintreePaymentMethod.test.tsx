import { screen } from '@testing-library/react'
import { BraintreePaymentMethod } from './BraintreePaymentMethod'
import axios from 'axios'
import { token } from '../../../__mocks__/braintree/example-braintree-token'
import { renderWithStore } from '~test-helpers'
import { PAYMENT_OPTIONS } from '~config/constants/payments'

describe(BraintreePaymentMethod, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: {
        clientToken: token
      }
    })
  })
  const setBraintreeDropInInstance = jest.fn()
  const setBraintreeShowButton = jest.fn()

  describe('when terms and conditions is checked', () => {
    it('renders the drop in ui', () => {
      renderWithStore(
        <BraintreePaymentMethod
          paymentMethod="braintree"
          isLoggedIn={true}
          setBraintreeDropInInstance={setBraintreeDropInInstance}
          setBraintreeShowButton={setBraintreeShowButton}
        />,
        {
          initialState: {
            client: {
              checkout: {
                braintree: {
                  isLoading: false,
                  wasSuccess: true,
                  wasError: false,
                  token: {
                    clientToken: 'some-token'
                  }
                }
              }
            }
          }
        }
      )
      expect(screen.getByTestId('drop-in-ui')).toBeInTheDocument()
    })

    it('does not render the button in ui', () => {
      renderWithStore(
        <BraintreePaymentMethod
          paymentMethod={PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD}
          isLoggedIn={true}
          setBraintreeDropInInstance={setBraintreeDropInInstance}
          setBraintreeShowButton={setBraintreeShowButton}
        />,
        {
          initialState: {
            client: {
              checkout: {
                braintree: {
                  isLoading: false,
                  wasSuccess: true,
                  wasError: false,
                  token: {
                    clientToken: 'some-token'
                  }
                }
              }
            }
          }
        }
      )
      expect(screen.queryByTestId('button-ui')).not.toBeInTheDocument()
    })
  })
})
