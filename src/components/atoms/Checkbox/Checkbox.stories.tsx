import React from 'react'
import { Checkbox, CheckboxProps } from './Checkbox'

export default {
  component: Checkbox,
  title: 'atoms/Checkbox',
  args: {
    id: 'recommendations',
    value: 'recommendations',
    label: 'Personal recommendations',
    isChecked: false
  }
}

export const Basic = (args: CheckboxProps): JSX.Element => (
  <Checkbox {...args} />
)
