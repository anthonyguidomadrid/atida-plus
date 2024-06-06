import { LoginForm } from '.'
import { LoginFormProps } from './LoginForm'

export default {
  component: LoginForm,
  title: 'organisms/LoginForm',
  argTypes: { onSubmit: { action: 'onSubmit' } }
}

export const basic = (args: LoginFormProps): JSX.Element => (
  <LoginForm {...args} />
)
