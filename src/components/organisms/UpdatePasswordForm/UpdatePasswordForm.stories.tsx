import { UpdatePasswordForm, UpdatePasswordFormProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: UpdatePasswordForm,
  title: 'organisms/UpdatePasswordForm',
  argTypes: {
    onSubmit: { action: 'onSubmit' }
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: UpdatePasswordFormProps): JSX.Element => (
  <Provider store={store}>
    <UpdatePasswordForm {...args} />
  </Provider>
)
