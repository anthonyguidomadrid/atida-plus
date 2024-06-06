import { AvailabilityWarningBlock, AvailabilityWarningBlockProps } from '.'

export default {
  component: AvailabilityWarningBlock,
  title: 'atoms/AvailabilityWarningBlock',
  args: {
    productName: 'Eucerin UreaRepair Plus Lotion 10%',
    productQuantity: 5
  }
}

export const AvailabilityWarning = (
  args: AvailabilityWarningBlockProps
): JSX.Element => <AvailabilityWarningBlock {...args} />
