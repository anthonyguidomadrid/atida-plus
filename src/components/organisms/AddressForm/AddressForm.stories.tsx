import { AddressForm, AddressFormProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: AddressForm,
  title: 'organisms/AddressForm',
  argTypes: {
    onSubmit: { action: 'onSubmit' }
  }
}

const store = createStore(rootReducer, {})

export const newAddress = (args: AddressFormProps): JSX.Element => (
  <Provider store={store}>
    <AddressForm {...args} />
  </Provider>
)

export const editAddress = (args: AddressFormProps): JSX.Element => (
  <Provider store={store}>
    <AddressForm {...args} />
  </Provider>
)
editAddress.args = {
  selectedAddress: {
    'first-name': 'Some First Name',
    'last-name': 'Some Last Name',
    address: 'Some Address',
    'house-number': 'Some House Number',
    appendix: 'Some Appendix',
    'zip-code': 'Some Zip Code',
    city: 'Some City',
    province: 'Madrid'
  }
}
