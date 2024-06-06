/* eslint-disable @typescript-eslint/no-empty-function */
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { AddToBasketControls } from '.'
import { AddToBasketControlsProps } from './AddToBasketControls'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { product } from '~domains/product/__mocks__/product'

export default {
  component: AddToBasketControls,
  title: 'organisms/AddToBasketControls',
  parameters: { layout: 'fullscreen' },
  args: {
    product,
    productInBasket: basketWithProducts.items[0],
    newQuantitySelectorValue: 1,
    setNewQuantitySelectorValue: () => {},
    currentQuantityValue: 1,
    setCurrentQuantityValue: () => {},
    setAvailableQuantity: () => {},
    setCurrentItemSku: () => {},
    setChangeQuantityIsTriggered: () => {},
    isModalOpen: false,
    setIsModalOpen: () => {},
    setQuantityChangedFrom: () => {},
    addToBasket: () => {},
    removeFromBasket: () => {},
    basketModalInputRef: null
  }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (
  args: AddToBasketControlsProps
): JSX.Element => (
  <Provider store={store}>
    <AddToBasketControls {...args} />
  </Provider>
)
