import { DeliveryMethod, DeliveryMethodProps } from '.'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { ReactComponent as FastDelivery } from '~assets/svg/navigation-24px/FastDelivery.svg'

export default {
  component: DeliveryMethod,
  title: 'atoms/DeliveryMethod',
  argTypes: {
    onChange: { action: 'onChange' }
  },
  args: {
    name: 'Standard delivery',
    description: 'To your door',
    timing: '24 - 26/10',
    icon: <Delivery className="icon-24" />,
    price: 0,
    currency: 'EUR',
    children: (
      <p>
        Address information and payment button, to be done when customer can
        enter delivery address
      </p>
    )
  }
}

export const free = (args: DeliveryMethodProps): JSX.Element => (
  <DeliveryMethod {...args} />
)

export const costly = (args: DeliveryMethodProps): JSX.Element => (
  <DeliveryMethod {...args} />
)
costly.args = {
  name: 'Express delivery',
  inputName: 'delivery-method',
  description: 'To your door',
  timing: '24/10, 8:00 - 12:00',
  icon: <FastDelivery className="icon-24" />,
  price: 299,
  currency: 'EUR'
}
