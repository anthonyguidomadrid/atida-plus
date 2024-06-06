import { product, productPartial } from '~domains/product/__mocks__/product'
import { ProductList, ProductListProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: ProductList,
  title: 'organisms/ProductList',
  args: {
    products: [product, productPartial]
  },
  argTypes: {
    loadMoreProducts: { action: 'loadMoreProducts' },
    addToBasket: { action: 'addToBasket' },
    changeQuantity: { action: 'changeQuantity' },
    removeFromBasket: { action: 'removeFromBasket' }
  }
}

const store = createStore(rootReducer, {})

export const SinglePage = (args: ProductListProps): JSX.Element => (
  <Provider store={store}>
    <ProductList {...args} />
  </Provider>
)
SinglePage.args = {
  hasMoreProducts: false,
  totalNumberOfProducts: 2
}

export const MultiplePages = (args: ProductListProps): JSX.Element => (
  <Provider store={store}>
    <ProductList {...args} />
  </Provider>
)
MultiplePages.args = {
  hasMoreProducts: true,
  totalNumberOfProducts: 20
}
