import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { rootReducer } from '~domains/redux'
import { PhoneNumberForm, PhoneNumberFormProps } from '.'

export default {
  component: PhoneNumberForm,
  title: 'organisms/PhoneNumberForm',
  argTypes: {
    onClick: { action: 'onClick' }
  },
  args: {
    termsAndConditionsIsChecked: true,
    isSubmitting: false,
    phoneNumber: { country: '351', number: '' }
  }
}

const store = createStore(rootReducer, {})

export const Basic = (args: PhoneNumberFormProps): JSX.Element => (
  <Provider store={store}>
    <PhoneNumberForm {...args} />
  </Provider>
)
