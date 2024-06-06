import {
  SIBSMultibancoPaymentMethod,
  SIBSMultibancoPaymentMethodProps
} from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, {})

export default {
  component: SIBSMultibancoPaymentMethod,
  title: 'atoms/SIBSMultibancoPaymentMethod',
  argTypes: {
    onClick: { action: 'onClick' }
  },
  args: {
    termsAndConditionsIsChecked: true
  }
}

export const multibancoMethods = (
  args: SIBSMultibancoPaymentMethodProps
): JSX.Element => (
  <Provider store={store}>
    <SIBSMultibancoPaymentMethod {...args} />
  </Provider>
)
