import { AccountVerificationForm, AccountVerificationFormProps } from '.'

export default {
  component: AccountVerificationForm,
  title: 'organisms/LoginForm',
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    userEmail: 'someEmail@email.com',
    userName: 'someName'
  }
}

export const basic = (args: AccountVerificationFormProps): JSX.Element => (
  <AccountVerificationForm {...args} />
)
