import { GuestCheckoutForm } from '.'
import { GuestCheckoutFormProps } from './GuestCheckoutForm'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: GuestCheckoutForm,
  title: 'organisms/GuestChekoutForm',
  argTypes: { onSubmit: { action: 'onSubmit' } }
}

const store = createStore(rootReducer, {})

export const basic = (args: GuestCheckoutFormProps): JSX.Element => (
  <Provider store={store}>
    <GuestCheckoutForm {...args} />
  </Provider>
)
