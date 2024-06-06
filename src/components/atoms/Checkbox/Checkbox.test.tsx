import { screen, render } from '@testing-library/react'
import { Checkbox } from './index'

describe(Checkbox, () => {
  it('renders Checkbox component', () => {
    render(<Checkbox />)
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
  })

  it('renders checkmark when isChecked is true', () => {
    render(<Checkbox isChecked />)
    expect(screen.getByTestId('checkmarkIcon')).toBeInTheDocument()
  })

  it('does not render a checkmark when isChecked is false', () => {
    render(<Checkbox isChecked={false} />)
    expect(screen.queryByRole('checkmarkIcon')).not.toBeInTheDocument()
  })

  it('renders a proper Checkbox when variant is primary', () => {
    render(<Checkbox isChecked variant="primary" />)
    expect(screen.getByTestId('checkmarkIcon')).toBeInTheDocument()
    expect(screen.getByTestId('checkboxContainer')).toBeInTheDocument()
  })

  it('renders a proper Checkbox when variant is secondary', () => {
    render(<Checkbox isChecked variant="secondary" />)
    expect(screen.getByTestId('checkmarkIcon')).toBeInTheDocument()
    expect(screen.getByTestId('checkboxContainer')).toBeInTheDocument()
  })
})
