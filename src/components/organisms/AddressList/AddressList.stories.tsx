import { AddressList, AddressListProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { unsortedCustomerAddresses } from '~domains/account/__mocks__/get-customer-addresses'

export default {
  component: AddressList,
  title: 'organisms/AddressList',
  parameters: { layout: 'fullscreen' },
  args: {
    locale: 'es-es',
    initialAddresses: unsortedCustomerAddresses
  }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (args: AddressListProps): JSX.Element => (
  <Provider store={store}>
    <AddressList {...args} />
  </Provider>
)
