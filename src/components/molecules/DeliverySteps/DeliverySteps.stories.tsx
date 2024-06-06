import { DeliverySteps } from '.'
import { DeliveryStepsProps } from './DeliverySteps'

export default {
  component: DeliverySteps,
  title: 'molecules/DeliverySteps',
  args: {
    steps: [
      {
        text: 'You will receive a confirmation by email',
        subText:
          'Haven’t received anything after 24 hours? Check your spam folder or contact us.',
        icon: 'Checkmark'
      },
      {
        text: 'We collect your products',
        subText: 'Our team will process your order as soon as possible.',
        icon: 'Parcel24'
      },
      {
        text: 'Track your order',
        subText:
          'You will receive an e-mail with the Track & Trace code as soon as your package has been sent.',
        icon: 'Pin24'
      }
    ]
  }
}

export const basic = (args: DeliveryStepsProps): JSX.Element => (
  <DeliverySteps {...args} paymentMethod="" />
)
