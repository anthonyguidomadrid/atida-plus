import {
  OrderSummaryProductTile,
  OrderSummaryProductTileProps
} from './OrderSummaryProductTile'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: OrderSummaryProductTile,
  title: 'molecules/OrderSummaryProductTile',
  args: {
    name: 'Eucerin DermoCapillaire kopfhautberuhigendes Urea Shampoo',
    url: '#',
    pzn: '08029959',
    format: {
      code: 'shampooCode',
      label: 'Shampoo'
    },
    packageSize: '250ml',
    availability: 'In stock',
    quantity: 2,
    pricePerUnit: {
      value: 523,
      currency: 'EUR',
      unit: '100ml'
    },
    rrp: {
      value: 3196,
      currency: 'EUR'
    },
    price: {
      value: 2614,
      currency: 'EUR'
    },
    image: {
      url: 'https://source.unsplash.com/random/94x164?sig=0',
      description: 'Some description of the product image'
    }
  }
}

const store = createStore(rootReducer, {})

export const longProductName = (
  args: OrderSummaryProductTileProps
): JSX.Element => (
  <Provider store={store}>
    <OrderSummaryProductTile {...args} />
  </Provider>
)

export const shortProductName = (
  args: OrderSummaryProductTileProps
): JSX.Element => (
  <Provider store={store}>
    <OrderSummaryProductTile {...args} />
  </Provider>
)
shortProductName.args = {
  name: 'Eucerin UreaRepair Plus Lotion 10%'
}
