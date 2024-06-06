import { TextField, TextFieldProps } from '.'

export default {
  component: TextField,
  title: 'atoms/TextField',
  args: {
    className: '',
    isWide: true,
    placeholder: 'This is a placeholder'
  }
}

export const basic = (args: TextFieldProps): JSX.Element => (
  <TextField isWide {...args} />
)
