import { ProductSavings, ProductSavingsProps } from './index'

export default {
  component: ProductSavings,
  title: 'atoms/ProductSavings',
  args: {
    price: { value: 1000, currency: 'EUR' },
    rrp: { value: 2500, currency: 'EUR' }
  }
}

export const Basic = (args: ProductSavingsProps): JSX.Element => (
  <ProductSavings {...args} />
)
