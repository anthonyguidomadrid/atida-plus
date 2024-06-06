import React from 'react'
import { OrderDetailsItem, OrderDetailsItemProps } from './'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: OrderDetailsItem,
  title: 'molecules/OrderDetailsItem',
  args: {
    name: 'item',
    sku: 'sku123',
    quantity: 10
  }
}

const store = createStore(rootReducer, {})

export const orderDetailsItem = (args: OrderDetailsItemProps): JSX.Element => (
  <Provider store={store}>
    <OrderDetailsItem {...args} />
  </Provider>
)
orderDetailsItem.args = {
  name: 'item',
  sku: 'sku123',
  quantity: 10
}
