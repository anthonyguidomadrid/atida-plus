import { RedeemCouponForm, RedeemCouponFormProps } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: RedeemCouponForm,
  title: 'organisms/RedeemCouponForm',
  argTypes: { onSubmit: { action: 'onSubmit' } }
}

const store = createStore(rootReducer, {})

export const basic = (args: RedeemCouponFormProps): JSX.Element => (
  <Provider store={store}>
    <RedeemCouponForm {...args} />
  </Provider>
)
