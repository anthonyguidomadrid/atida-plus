import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { BasketAddOn, BasketAddOnProps } from './BasketAddOn'
import { mockedProducts } from '../../../__mocks__/pop/productsAndContentBlocks'

const store = createStore(rootReducer, {})

export default {
  component: BasketAddOn,
  title: 'molecules/FreeShippingTile',
  args: {
    product: mockedProducts[0],
    isProductLoading: false
  }
}

export const Basic = (args: BasketAddOnProps): JSX.Element => (
  <Provider store={store}>
    <BasketAddOn {...args} />
  </Provider>
)
