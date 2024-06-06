import { Availability, AvailabilityProps } from '.'

export default {
  component: Availability,
  title: 'atoms/Availability',
  args: {
    availability: 'In stock'
  }
}

export const inStock = (args: AvailabilityProps): JSX.Element => (
  <Availability {...args} />
)
