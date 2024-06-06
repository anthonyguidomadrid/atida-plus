import { QuantitySelector, QuantitySelectorProps } from './index'

export default {
  component: QuantitySelector,
  title: 'molecules/QuantitySelector',
  args: {
    quantity: 1,
    showRemoveButton: false,
    disableIncreaseButton: false
  }
}

export const Basic = (args: QuantitySelectorProps): JSX.Element => (
  <QuantitySelector {...args} />
)
