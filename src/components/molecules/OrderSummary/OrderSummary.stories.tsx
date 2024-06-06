import {
  OrderSummary,
  OrderSummaryProps
} from '~components/molecules/OrderSummary'

export default {
  component: OrderSummary,
  title: 'molecules/OrderSummary',
  args: {
    numberOfItems: 3,
    currency: 'EUR',
    subTotalPrice: 1500,
    shipping: 299,
    grandTotal: 1696
  }
}

export const withContentFromDesign = (args: OrderSummaryProps): JSX.Element => (
  <OrderSummary {...args} />
)
