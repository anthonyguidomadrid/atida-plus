import { Promotions, PromotionsProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { promotions } from '~components/molecules/Promotions/Promotions.mock'

export default {
  component: Promotions,
  title: 'molecules/Promotions',
  args: {
    promotions: promotions.items
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: PromotionsProps): JSX.Element => (
  <Provider store={store}>
    <Promotions {...args} />
  </Provider>
)
