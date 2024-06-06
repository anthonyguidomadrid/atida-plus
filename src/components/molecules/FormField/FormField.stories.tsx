import React from 'react'
import { TextField } from '~components/atoms/TextField'
import { FormField, FormFieldProps } from './FormField'

export default {
  component: FormField,
  title: 'molecules/FormField',
  args: {
    label: 'Form Label',
    inputId: 'form-field'
  }
}

export const withTextField = (args: FormFieldProps): JSX.Element => (
  <FormField {...args}>
    <TextField name="with-input" />
  </FormField>
)
