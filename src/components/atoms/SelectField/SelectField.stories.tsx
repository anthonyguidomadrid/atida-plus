import { SelectField, SelectFieldProps } from '.'

type OptionValue = string
const OPTIONS = [
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' }
]

export default {
  component: SelectField,
  title: 'atoms/SelectField',
  args: {
    options: OPTIONS
  }
}

export const Basic = (args: SelectFieldProps<OptionValue>): JSX.Element => {
  return <SelectField {...args} value={OPTIONS[0].value} />
}
