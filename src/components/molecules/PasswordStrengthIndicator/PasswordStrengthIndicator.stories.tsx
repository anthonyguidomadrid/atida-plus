import { PasswordStrengthIndicator } from '.'
import { PasswordStrengthIndicatorProps } from './PasswordStrengthIndicator'

export default {
  component: PasswordStrengthIndicator,
  title: 'molecules/PasswordStrengthIndicator',
  args: {
    password: 'change this password to see different behaviour'
  }
}

export const basic = (args: PasswordStrengthIndicatorProps): JSX.Element => (
  <PasswordStrengthIndicator {...args} />
)
