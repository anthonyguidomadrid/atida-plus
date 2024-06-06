import { screen } from '@testing-library/react'
import { MBWayPaymentMethod } from './MBWayPaymentMethod'
import { renderWithStore } from '~test-helpers'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'

describe(MBWayPaymentMethod, () => {
  const setup = () =>
    renderWithStore(<MBWayPaymentMethod />, {
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
    })

  describe('When the component is mounted', () => {
    it('renders the form and the button', async () => {
      setup()
      expect(screen.getByTestId('MBWay-payment-button')).toBeInTheDocument()
      expect(screen.getByTestId('PhoneNumberForm')).toBeInTheDocument()
    })
    it('renders the notification', async () => {
      setup()
      expect(screen.getByTestId('notification')).toBeInTheDocument()
    })
  })
})
