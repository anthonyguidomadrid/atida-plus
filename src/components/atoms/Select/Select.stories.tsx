import { Select } from '.'
import { SelectProps } from './Select'

export default {
  component: Select,
  title: 'atoms/Select',
  args: {
    className: 'max-w-8'
  }
}

export const basic = (args: SelectProps): JSX.Element => (
  <Select {...args}>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
)
