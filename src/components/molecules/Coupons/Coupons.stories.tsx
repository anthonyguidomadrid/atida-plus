import { CouponsProps, Coupons } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { coupons } from '~components/molecules/Coupons/Coupons.mock'

export default {
  component: Coupons,
  title: 'molecules/Coupons',
  args: {
    basketCouponData: coupons.items
  }
}
const store = createStore(rootReducer, {})

export const basic = (args: CouponsProps): JSX.Element => (
  <Provider store={store}>
    <Coupons {...args} />
  </Provider>
)
