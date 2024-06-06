import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import { product } from '~domains/product/__mocks__/product'
import { rootReducer } from '~domains/redux'

import { ProductGrid, ProductGridProps } from '.'

export default {
  component: ProductGrid,
  title: 'organisms/ProductGrid',
  args: {
    productCardList: [product, product, product, product]
  },
  argTypes: {
    addToBasket: { action: 'addToBasket' }
  }
}

const store = createStore(rootReducer, {})

export const homePageRecommendation = (args: ProductGridProps): JSX.Element => (
  <Provider store={store}>
    <ProductGrid {...args} />
  </Provider>
)
homePageRecommendation.args = {
  productCardList: [product, product, product, product],
  hasOneRow: true
}

export const pdpRecommendation = (args: ProductGridProps): JSX.Element => (
  <Provider store={store}>
    <ProductGrid {...args} />
  </Provider>
)
