import { PaymentMethod, PaymentMethodProps } from '.'
import { ReactComponent as Multibanco } from '~assets/svg/payment-providers/Multibanco.svg'
import { Button } from '~components/atoms/Button'

export default {
  component: PaymentMethod,
  title: 'atoms/PaymentMethod',
  argTypes: {
    onChange: { action: 'onChange' }
  },
  args: {
    name: 'Multibanco',
    inputValue: 'multibanco',
    icon: <Multibanco className="h-5" />,
    children: <Button className="w-35">Pay now</Button>,
    disabled: false
  }
}

export const multibanco = (args: PaymentMethodProps): JSX.Element => (
  <PaymentMethod {...args} />
)

export const card = (args: PaymentMethodProps): JSX.Element => (
  <PaymentMethod {...args} />
)
card.args = {
  inputValue: 'braintree',
  name: 'PayPal / Credit Card',
  icon: null,
  children: null,
  disabled: false
}
