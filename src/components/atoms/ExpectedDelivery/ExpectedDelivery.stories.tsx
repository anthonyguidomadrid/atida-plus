import { ExpectedDelivery, ExpectedDeliveryProps } from './index'

export default {
  component: ExpectedDelivery,
  title: 'atoms/ExpectedDelivery',
  args: {
    deliveryDate: '24 October - 26 October'
  }
}

export const Basic = (args: ExpectedDeliveryProps): JSX.Element => (
  <ExpectedDelivery {...args} />
)
