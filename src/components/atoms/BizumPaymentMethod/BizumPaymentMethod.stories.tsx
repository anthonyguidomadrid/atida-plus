import { BizumPaymentMethod, BizumPaymentMethodProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, {})

export default {
  component: BizumPaymentMethod,
  title: 'atoms/BizumPaymentMethod',
  argTypes: {
    onClick: { action: 'onClick' }
  },
  args: {
    termsAndConditionsIsChecked: true
  }
}

export const multibancoMethods = (
  args: BizumPaymentMethodProps
): JSX.Element => (
  <Provider store={store}>
    <BizumPaymentMethod {...args} />
  </Provider>
)
