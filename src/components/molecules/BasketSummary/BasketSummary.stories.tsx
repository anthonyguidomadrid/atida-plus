import React from 'react'
import {
  BasketSummary,
  BasketSummaryProps
} from '~components/molecules/BasketSummary'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: BasketSummary,
  title: 'molecules/BasketSummary',
  args: {
    numberOfItems: 3,
    currency: 'EUR',
    subTotalPrice: 1598,
    discounts: [
      {
        displayName: 'Some discount',
        amount: 291
      }
    ],
    totalProducts: 1307,
    shipping: 495,
    grandTotal: 1802
  },
  argTypes: {
    handleSubmit: { action: 'handleSubmit' }
  }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (
  args: BasketSummaryProps
): JSX.Element => (
  <Provider store={store}>
    <BasketSummary {...args} />
  </Provider>
)
