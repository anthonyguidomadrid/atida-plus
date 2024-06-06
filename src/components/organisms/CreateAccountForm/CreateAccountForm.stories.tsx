import { CreateAccountForm } from '.'
import { CreateAccountFormProps } from './CreateAccountForm'

export default {
  component: CreateAccountForm,
  title: 'organisms/CreateAccountForm',
  argTypes: { onSubmit: { action: 'onSubmit' } }
}

export const basic = (args: CreateAccountFormProps): JSX.Element => (
  <CreateAccountForm {...args} />
)
