import { DeliveryTimes, DeliveryTimesProps } from '.'

export default {
  component: DeliveryTimes,
  title: 'atoms/DeliveryTimes',
  parameters: { layout: 'fullscreen' },
  args: { onDemand: true }
}

export const onDemandProducts = (args: DeliveryTimesProps): JSX.Element => (
  <DeliveryTimes {...args} />
)

export const standardDelivery = (args: DeliveryTimesProps): JSX.Element => (
  <DeliveryTimes {...args} />
)

standardDelivery.args = {
  onDemand: false,
  className: 'block text-xs mt-auto sm:mt-0 mb-1 text-feedback-success'
}
