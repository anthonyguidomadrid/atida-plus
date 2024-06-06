import { screen } from '@testing-library/react'
import { SIBSMultibancoPaymentMethod } from './SIBSMultibancoPaymentMethod'
import { renderWithStore } from '~test-helpers'
import { fireEvent } from '@testing-library/dom'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'

describe(SIBSMultibancoPaymentMethod, () => {
  const setup = () =>
    renderWithStore(<SIBSMultibancoPaymentMethod />, {
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

  describe('when the component is mounted', () => {
    beforeEach(() => setup())

    it('renders the "Pay now" button', async () => {
      const btn = screen.getByTestId('sibs-multibanco-payment-button')

      expect(btn).toBeInTheDocument()
    })

    it('fires handleSubmit', async () => {
      const btn = screen.getByTestId('sibs-multibanco-payment-button')

      expect(btn).toBeInTheDocument()
      fireEvent.click(btn)
      expect(btn).toHaveClass('button--loading')
    })
  })
})
