import React from 'react'
import { screen, render } from '@testing-library/react'
import { RadioInput, RadioInputProps } from './RadioInput'

describe(RadioInput, () => {
  const defaultProps = {
    id: 'Mrs',
    value: 'Mrs',
    label: 'Mrs',
    isChecked: false
  }

  const setup = (props: Partial<RadioInputProps> = {}) =>
    render(<RadioInput {...defaultProps} {...props} />)

  it('renders RadioInput component', () => {
    setup()
    expect(screen.getByTestId('RadioInput')).toBeInTheDocument()
  })

  it('does not crash when isChecked is not passed', () => {
    const { container } = setup({ isChecked: undefined })
    expect(container).toBeInTheDocument()
  })

  it('renders checked circle if isChecked is true', () => {
    setup({ isChecked: true })
    expect(screen.getByTestId('checked-circle')).toBeInTheDocument()
  })

  it('renders correct label', () => {
    setup()
    expect(screen.getByText('Mrs')).toBeInTheDocument()
  })
})
