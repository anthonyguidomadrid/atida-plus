import React from 'react'
import { OrderHistoryItem, OrderHistoryItemProps } from './'

export default {
  component: OrderHistoryItem,
  title: 'molecules/OrderHistoryItem',
  args: {
    id: 1,
    attributes: {
      quantity: 123,
      sku: 'sku123',
      sumGrossPrice: 20,
      unitGrossPrice: 20
    }
  }
}

export const orderHistoryItem = (args: OrderHistoryItemProps): JSX.Element => (
  <OrderHistoryItem {...args} />
)
orderHistoryItem.args = {
  id: 1,
  attributes: {
    quantity: 123,
    sku: 'sku123',
    sumGrossPrice: 20,
    unitGrossPrice: 20
  }
}
