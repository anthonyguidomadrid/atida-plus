import { render, screen } from '@testing-library/react'
import { DeliveryMethod, DeliveryMethodProps } from './DeliveryMethod'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import userEvent from '@testing-library/user-event'

describe(DeliveryMethod, () => {
  const setup = (props: Partial<DeliveryMethodProps> = {}) =>
    render(
      <DeliveryMethod
        key="standard"
        name="Standard delivery"
        inputName="delivery-method"
        inputValue="standard"
        timing="24 - 26/10"
        icon={<Delivery className="icon-24" aria-label="icon" />}
        price={0}
        currency="EUR"
        onChange={jest.fn()}
        {...props}
      >
        <p>Address placeholder</p>
      </DeliveryMethod>
    )

  it('renders required information', () => {
    setup({ orderShipping: 200 })
    expect(screen.getByText('Standard delivery')).toBeInTheDocument()
    expect(screen.getByText('24 - 26/10')).toBeInTheDocument()
    expect(screen.getByText('0.00')).toBeInTheDocument()
    expect(screen.getByLabelText('icon')).toBeInTheDocument()
  })

  it('renders free shipping when shipping is 0', () => {
    setup({ orderShipping: 0 })
    expect(screen.getByTestId('delivery')).toHaveTextContent('shared.free')
  })

  it('hides the children initially', () => {
    setup()
    expect(screen.queryByText('Address placeholder')).not.toBeInTheDocument()
  })

  it('renders the radio input with correct name and value', () => {
    setup()
    expect(
      screen.getByRole('radio', {
        name: /standard delivery/i
      })
    ).toHaveAttribute('name', 'delivery-method')
    expect(
      screen.getByRole('radio', {
        name: /standard delivery/i
      })
    ).toHaveAttribute('value', 'standard')
  })

  it('fires the onChange callback when selected', () => {
    const onChange = jest.fn()
    setup({ onChange })
    expect(onChange).not.toHaveBeenCalled()
    userEvent.click(
      screen.getByRole('radio', {
        name: /standard delivery/i
      })
    )
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('loses focus on blur', () => {
    const onChange = jest.fn()
    setup({ onChange })
    expect(onChange).not.toHaveBeenCalled()
    userEvent.click(screen.getByRole('radio'))
    expect(onChange).toHaveBeenCalledTimes(1)
    screen.getByRole('radio').blur()
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  describe('when not free delivery', () => {
    it('formats the price', () => {
      setup({ price: 299 })
      expect(screen.getByText('2.99')).toBeInTheDocument()
    })
  })

  describe('when selected', () => {
    it('reveals the children', () => {
      setup({ isChecked: true })
      expect(screen.getByText('Address placeholder')).toBeInTheDocument()
    })
  })

  describe('when disabled', () => {
    it('does not allow the method to be selected', () => {
      const onChange = jest.fn()
      setup({ inputDisabled: true, onChange })
      userEvent.click(
        screen.getByRole('radio', {
          name: /standard delivery/i
        })
      )
      expect(onChange).not.toHaveBeenCalled
    })
  })
})
