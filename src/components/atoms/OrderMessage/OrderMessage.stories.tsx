import { OrderMessage, OrderMessageProps } from './index'

export default {
  component: OrderMessage,
  title: 'atoms/OrderMessage',
  args: {
    name: 'Julia',
    success: true
  }
}

export const Basic = (args: OrderMessageProps): JSX.Element => (
  <OrderMessage {...args} />
)
