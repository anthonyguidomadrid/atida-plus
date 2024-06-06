import { DeliveryMethodGroup, DeliveryMethodGroupProps } from '.'
import { DeliveryMethod } from '~components/atoms/DeliveryMethod'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'
import { ReactComponent as FastDelivery } from '~assets/svg/navigation-24px/FastDelivery.svg'

export default {
  component: DeliveryMethodGroup,
  title: 'molecules/DeliveryMethodGroup',
  argTypes: {
    onDeliveryMethodChange: { action: 'onDeliveryMethodChange' }
  },
  args: {
    children: [
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
      </DeliveryMethod>,

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
    ]
  }
}

export const grouped = (args: DeliveryMethodGroupProps): JSX.Element => (
  <DeliveryMethodGroup {...args} />
)
