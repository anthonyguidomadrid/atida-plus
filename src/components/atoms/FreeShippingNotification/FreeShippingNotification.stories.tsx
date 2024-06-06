import {
  FreeShippingNotification,
  FreeShippingNotificationProps
} from './index'

export default {
  component: FreeShippingNotification,
  title: 'atoms/FreeShippingNotification',
  args: {
    hasReachedFreeShipping: true
  }
}

export const Basic = (args: FreeShippingNotificationProps): JSX.Element => (
  <FreeShippingNotification {...args} />
)
