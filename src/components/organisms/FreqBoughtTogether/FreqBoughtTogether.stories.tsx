import { FreqBoughtTogether } from '.'
import { FreqBoughtTogetherProps } from './FreqBoughtTogether'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { product, productPartial } from '~domains/product/__mocks__/product'

export default {
  component: FreqBoughtTogether,
  title: 'organisms/FreqBoughtTogether',
  args: {
    mainProduct: product,
    recommendedProducts: Array(4).fill(productPartial)
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: FreqBoughtTogetherProps): JSX.Element => (
  <Provider store={store}>
    <FreqBoughtTogether {...args} />
  </Provider>
)
