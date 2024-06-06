import { UpdateBusinessDetailsForm } from '.'
import { UpdateBusinessDetailsFormProps } from './UpdateBusinessDetailsForm'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: UpdateBusinessDetailsForm,
  title: 'organisms/UpdateBusinessDetailsForm',
  argTypes: {
    onSubmit: { action: 'onSubmit' }
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: UpdateBusinessDetailsFormProps): JSX.Element => (
  <Provider store={store}>
    <UpdateBusinessDetailsForm {...args} />
  </Provider>
)
