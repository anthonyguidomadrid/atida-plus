import {
  StripeMultibancoPaymentMethod,
  StripeMultibancoPaymentMethodProps
} from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, {})

export default {
  component: StripeMultibancoPaymentMethod,
  title: 'atoms/StripeMultibancoPaymentMethod',
  argTypes: {
    onClick: { action: 'onClick' }
  },
  args: {
    termsAndConditionsIsChecked: true
  }
}

export const multibancoMethods = (
  args: StripeMultibancoPaymentMethodProps
): JSX.Element => (
  <Provider store={store}>
    <StripeMultibancoPaymentMethod {...args} />
  </Provider>
)
