import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import {
  CheckoutPayNowButton,
  CheckoutPayNowButtonProps
} from './CheckoutPayNowButton'

const store = createStore(rootReducer, {})

export default {
  component: CheckoutPayNowButton,
  title: 'atoms/CheckoutPayNowButton',
  argTypes: { setIsLoading: { action: 'setIsLoading' } }
}

export const Basic = (args: CheckoutPayNowButtonProps): JSX.Element => (
  <Provider store={store}>
    <CheckoutPayNowButton {...args} />
  </Provider>
)
