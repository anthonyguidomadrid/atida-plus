import { PasswordForgottenForm } from '.'
import { PasswordForgottenFormProps } from './PasswordForgottenForm'

export default {
  component: PasswordForgottenForm,
  title: 'organisms/PasswordForgottenForm',
  argTypes: { onSubmit: { action: 'onSubmit' } }
}

export const basic = (args: PasswordForgottenFormProps): JSX.Element => (
  <PasswordForgottenForm {...args} />
)
