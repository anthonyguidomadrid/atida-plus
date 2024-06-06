import React from 'react'
import { RadioInput, RadioInputProps } from './RadioInput'

export default {
  component: RadioInput,
  title: 'atoms/RadioInput',
  args: {
    id: 'Mrs',
    value: 'Mrs',
    label: 'Mrs',
    isChecked: false,
    field: {}
  }
}

export const Basic = (args: RadioInputProps): JSX.Element => (
  <RadioInput {...args} />
)
