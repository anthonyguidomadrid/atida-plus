import { NewPasswordForm } from '.'
import { NewPasswordFormProps } from './NewPasswordForm'

export default {
  component: NewPasswordForm,
  title: 'organisms/NewPasswordForm',
  args: {
    userEmail: 'testemail@test.com'
  },
  argTypes: { onSubmit: { action: 'onSubmit' } }
}

export const basic = (args: NewPasswordFormProps): JSX.Element => (
  <NewPasswordForm {...args} />
)
