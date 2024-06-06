import { AddressFormModalLayout, AddressFormModalLayoutProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: AddressFormModalLayout,
  title: 'molecules/AddressFormModalLayout',
  args: {
    title: 'Address Form Modal Layout Title'
  },
  argTypes: {
    handleClickOutside: { action: 'handleClickOutside' }
  }
}
const store = createStore(rootReducer, {})

export const basic = (args: AddressFormModalLayoutProps): JSX.Element => (
  <Provider store={store}>
    <AddressFormModalLayout {...args} />
  </Provider>
)
