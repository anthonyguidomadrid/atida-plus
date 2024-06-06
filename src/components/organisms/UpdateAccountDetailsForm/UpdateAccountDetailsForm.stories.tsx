import { UpdateAccountDetailsForm } from '.'
import { UpdateAccountDetailsFormProps } from './UpdateAccountDetailsForm'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: UpdateAccountDetailsForm,
  title: 'organisms/UpdateAccountDetailsForm',
  argTypes: {
    onSubmit: { action: 'onSubmit' }
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: UpdateAccountDetailsFormProps): JSX.Element => (
  <Provider store={store}>
    <UpdateAccountDetailsForm {...args} />
  </Provider>
)
