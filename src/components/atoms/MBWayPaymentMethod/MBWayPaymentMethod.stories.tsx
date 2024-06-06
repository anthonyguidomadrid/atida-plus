import { MBWayPaymentMethod, MBWayPaymentMethodProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, {})

export default {
  component: MBWayPaymentMethod,
  title: 'atoms/MBWPaymentMethod',
  argTypes: {
    onClick: { action: 'onClick' }
  },
  args: {
    termsAndConditionsIsChecked: true
  }
}

export const MBWayPayment = (args: MBWayPaymentMethodProps): JSX.Element => (
  <Provider store={store}>
    <MBWayPaymentMethod {...args} />
  </Provider>
)
