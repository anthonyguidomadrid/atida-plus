import { OrderTotals, OrderTotalsProps } from '~components/atoms/OrderTotals'

export default {
  component: OrderTotals,
  title: 'atoms/OrderTotals',
  args: {
    numberOfItems: 3,
    currency: 'EUR',
    subTotalPrice: 1500,
    discounts: [{ displayName: 'Some discount', amount: 299 }],
    totalProducts: 1201,
    shipping: undefined,
    grandTotal: 1696
  }
}

export const withContentFromDesign = (args: OrderTotalsProps): JSX.Element => (
  <OrderTotals {...args} />
)
