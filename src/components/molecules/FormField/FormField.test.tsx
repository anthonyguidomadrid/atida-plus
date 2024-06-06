import React from 'react'
import { screen, render } from '@testing-library/react'
import { FormField, FormFieldProps } from './FormField'
import { TextField } from '~components/atoms/TextField'

describe(FormField, () => {
  const defaultProps: FormFieldProps = {
    label: 'Default Label',
    inputId: 'test-input-id'
  }

  const setup = (props: Partial<FormFieldProps> = {}) =>
    render(
      <FormField {...defaultProps} {...props}>
        <TextField name="test-input" />
      </FormField>
    )

  it('renders a field with the correct label', () => {
    setup()
    expect(screen.getByLabelText(/Default Label/)).toBeInTheDocument()
  })

  describe('when the field is required', () => {
    it('marks the input as required', () => {
      setup({ required: true })
      expect(screen.getByLabelText(/Default Label/)).toHaveAttribute(
        'aria-required',
        'true'
      )
    })
  })

  describe('when the field is not required', () => {
    it('does not mark the input as required', () => {
      setup()
      expect(screen.getByLabelText(/Default Label/)).toHaveAttribute(
        'aria-required',
        'false'
      )
    })
  })

  describe('when the field has an error', () => {
    it('displays the error message', () => {
      setup({ error: 'Some error' })
      expect(screen.getByRole('alert')).toHaveTextContent('Some error')
      expect(screen.getByRole('alert')).toHaveAttribute(
        'id',
        'test-input-id_error'
      )
      expect(screen.getByLabelText('Default Label')).toHaveAttribute(
        'aria-describedby',
        'test-input-id_error'
      )
    })

    it('gives input the aria-invalid attribute', () => {
      setup({ error: 'Some error' })
      expect(screen.getByLabelText('Default Label')).toHaveAttribute(
        'aria-invalid'
      )
    })
  })

  describe('when the field does not have an error', () => {
    it('does not display error message', () => {
      setup()
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      expect(screen.getByLabelText('Default Label')).not.toHaveAttribute(
        'aria-describedby'
      )
    })

    it('does not give the input data-invalid attribute', () => {
      setup()
      expect(screen.getByLabelText('Default Label')).not.toHaveAttribute(
        'data-invalid'
      )
    })
  })
})
