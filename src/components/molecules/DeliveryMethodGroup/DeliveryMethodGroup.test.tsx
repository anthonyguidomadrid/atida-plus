import { screen } from '@testing-library/react'
import { DeliveryMethod } from '~components/atoms/DeliveryMethod'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { ReactComponent as FastDelivery } from '~assets/svg/navigation-24px/FastDelivery.svg'
import {
  DeliveryMethodGroup,
  DeliveryMethodGroupProps
} from './DeliveryMethodGroup'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '~test-helpers'

describe(DeliveryMethodGroup, () => {
  const setup = (props: Partial<DeliveryMethodGroupProps> = {}) =>
    renderWithStore(
      <DeliveryMethodGroup {...props}>
        <DeliveryMethod
          key="standard"
          name="Standard delivery"
          inputName="delivery-method"
          inputValue="standard"
          timing="24 - 26/10"
          icon={<Delivery className="icon-24" />}
          price={0}
          currency="EUR"
        >
          <p>
            Address information and payment button, to be done when customer can
            enter delivery address
          </p>
        </DeliveryMethod>
        <DeliveryMethod
          key="express"
          name="Express delivery"
          inputName="delivery-method"
          inputValue="express"
          timing="24/10, 8:00 - 12:00"
          icon={<FastDelivery className="icon-24" />}
          price={299}
          currency="EUR"
        >
          <p>
            Address information and payment button, to be done when customer can
            enter delivery address
          </p>
        </DeliveryMethod>
        Some text that probably shouldn't be here
      </DeliveryMethodGroup>
    )

  it('renders each delivery method', () => {
    setup({})
    expect(
      screen.getByRole('radio', {
        name: /standard delivery/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('radio', {
        name: /express delivery/i
      })
    ).toBeInTheDocument()
  })

  it('should render any "invalid" elements plainly', () => {
    setup({})
    expect(screen.getByText(/Some text that probably/)).toBeInTheDocument()
  })

  it('fires onDeliveryMethodChange handler when an option is selected', () => {
    const onDeliveryMethodChange = jest.fn()
    setup({ onDeliveryMethodChange })
    expect(onDeliveryMethodChange).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByText('Express delivery'))
    expect(onDeliveryMethodChange).toHaveBeenCalledTimes(1)
    expect(onDeliveryMethodChange).toHaveBeenCalledWith('express')
  })

  it('only allows one option to be selected at a time', () => {
    setup({})
    expect(
      screen.getByRole('radio', {
        name: /standard delivery/i
      })
    ).not.toBeChecked()
    expect(
      screen.getByRole('radio', {
        name: /express delivery/i
      })
    ).not.toBeChecked()

    userEvent.click(screen.getByText('Express delivery'))

    expect(
      screen.getByRole('radio', {
        name: /standard delivery/i
      })
    ).not.toBeChecked()
    expect(
      screen.getByRole('radio', {
        name: /express delivery/i
      })
    ).toBeChecked()
  })

  describe('When an initial delivery method is set', () => {
    it('pre-selects it and does not call onDeliveryMethodChange', () => {
      const onDeliveryMethodChange = jest.fn()
      setup({ initialDeliveryMethod: 'express', onDeliveryMethodChange })
      expect(
        screen.getByRole('radio', {
          name: /express delivery/i
        })
      ).toBeChecked()
      expect(onDeliveryMethodChange).not.toHaveBeenCalled()
    })

    it('allows a different delivery method to be selected', () => {
      const onDeliveryMethodChange = jest.fn()
      setup({ initialDeliveryMethod: 'express', onDeliveryMethodChange })

      userEvent.click(screen.getByText('Standard delivery'))
      expect(onDeliveryMethodChange).toHaveBeenCalledTimes(1)
      expect(onDeliveryMethodChange).toHaveBeenCalledWith('standard')

      expect(
        screen.getByRole('radio', {
          name: /express delivery/i
        })
      ).not.toBeChecked()
      expect(
        screen.getByRole('radio', {
          name: /standard delivery/i
        })
      ).toBeChecked()
    })

    it.skip('preselects the delivery method when it is only one and the two feature flags are on', () => {
      const onDeliveryMethodChange = jest.fn()
      setup({
        initialDeliveryMethod: undefined,
        shipmentMethods: [
          {
            id: '3',
            type: 'standard delivery',
            attributes: {
              name: 'Correo Express',
              carrierName: 'Correo Express',
              price: 2.99,
              deliveryTime: null,
              currencyIsoCode: 'EUR'
            }
          }
        ],
        onDeliveryMethodChange
      })
      expect(
        screen.getByRole('radio', {
          name: /standard delivery/i
        })
      ).toBeChecked()
      expect(onDeliveryMethodChange).toHaveBeenCalledTimes(1)
    })
  })
})
