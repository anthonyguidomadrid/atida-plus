import { InfoLabelEnum } from '~domains/product'
import { BasketProductTileProps, BasketProductTile } from './BasketProductTile'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: BasketProductTile,
  title: 'molecules/BasketProductTile',
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
  },
  argTypes: {
    handleRemoveItem: { action: 'handleRemoveItem' },
    handleChangeQuantity: { action: 'handleChangeQuantity' }
  }
}
const store = createStore(rootReducer, {})

export const longProductName = (args: BasketProductTileProps): JSX.Element => (
  <Provider store={store}>
    <BasketProductTile {...args} />
  </Provider>
)

export const shortProductName = (args: BasketProductTileProps): JSX.Element => (
  <Provider store={store}>
    <BasketProductTile {...args} />
  </Provider>
)
shortProductName.args = {
  name: 'Eucerin UreaRepair Plus Lotion 10%'
}
