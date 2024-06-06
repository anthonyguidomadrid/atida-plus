import { product } from './ProductCard.mock'
import { ProductCard, ProductCardProps } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: ProductCard,
  title: 'molecules/ProductCard',
  parameters: { layout: 'fullscreen' },
  args: {
    ...product
  },
  argTypes: {
    addToBasket: { action: 'addToBasket' },
    changeQuantity: { action: 'changeQuantity' },
    removeFromBasket: { action: 'removeFromBasket' }
  }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (args: ProductCardProps): JSX.Element => (
  <Provider store={store}>
    <ProductCard {...args} />
  </Provider>
)
