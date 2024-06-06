import { MinifiedProductTile } from '.'
import { MinifiedProductTileProps } from './MinifiedProductTile'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { product } from '~domains/product/__mocks__/product'

export default {
  component: MinifiedProductTile,
  title: 'molecules/MinifiedProductTile',
  args: {
    product: product
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: MinifiedProductTileProps): JSX.Element => (
  <Provider store={store}>
    <MinifiedProductTile {...args} />
  </Provider>
)
