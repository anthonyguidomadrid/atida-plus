import { BasketHeaderProps, BasketHeader } from './BasketHeader'

export default {
  component: BasketHeader,
  title: 'molecules/BasketHeader',
  parameters: { layout: 'fullscreen' },
  args: {
    numberOfItems: 3,
    total: {
      value: 4309,
      currency: 'EUR'
    }
  }
}

export const withMultipleProducts = (args: BasketHeaderProps): JSX.Element => (
  <BasketHeader {...args} />
)

export const withSingleProduct = (args: BasketHeaderProps): JSX.Element => (
  <BasketHeader {...args} />
)
withSingleProduct.args = {
  numberOfItems: 1
}
