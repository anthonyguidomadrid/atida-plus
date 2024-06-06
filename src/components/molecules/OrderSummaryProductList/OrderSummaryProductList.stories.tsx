import { OrderSummaryProductList } from '~components/molecules/OrderSummaryProductList'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { InfoLabelEnum } from '~domains/product'
import {
  OrderSummaryProductTile,
  OrderSummaryProductTileProps
} from '~components/molecules/OrderSummaryProductTile'

export default {
  component: OrderSummaryProductList,
  subcomponents: { OrderSummaryProductTile },
  title: 'molecules/OrderSummaryProductList',
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
    },
    labels: [{ type: InfoLabelEnum.Promotion, label: 'Free sponge' }]
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: OrderSummaryProductTileProps): JSX.Element => (
  <Provider store={store}>
    <OrderSummaryProductTile {...args} />
    <OrderSummaryProductTile {...args} />
    <OrderSummaryProductTile {...args} />
  </Provider>
)
