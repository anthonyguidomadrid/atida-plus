import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import { product } from '~domains/product/__mocks__/product'
import { rootReducer } from '~domains/redux'

import { ProductSlider, ProductSliderProps } from '.'

export default {
  component: ProductSlider,
  title: 'organisms/ProductSlider',
  args: {
    productCardList: [product, product, product, product]
  },
  argTypes: {
    addToBasket: { action: 'addToBasket' }
  }
}

const store = createStore(rootReducer, {})

export const homePageRecommendation = (
  args: ProductSliderProps
): JSX.Element => (
  <Provider store={store}>
    <ProductSlider {...args} />
  </Provider>
)
homePageRecommendation.args = {
  productCardList: [product, product, product, product],
  hasOneRow: true
}

export const pdpRecommendation = (args: ProductSliderProps): JSX.Element => (
  <Provider store={store}>
    <ProductSlider {...args} />
  </Provider>
)
