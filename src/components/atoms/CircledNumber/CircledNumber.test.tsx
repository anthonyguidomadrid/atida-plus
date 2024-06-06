import { render, screen } from '@testing-library/react'
import { CircledNumber, CircledNumberProps } from './index'

describe(CircledNumber, () => {
  const defaultProps = {
    badge: 1,
    hasMissingDiv: false
  }

  const setup = (props: Partial<CircledNumberProps> = {}) =>
    render(<CircledNumber {...defaultProps} {...props} />)

  it('renders the CircledNumber', () => {
    setup()
    expect(screen.getByTestId('circledNumber')).toBeInTheDocument()
  })

  it('renders the number div when hasMissingDiv is false', () => {
    setup()
    expect(screen.getByTestId('number')).toBeInTheDocument()
  })

  it('does not render the number div when hasMissingDiv is true', () => {
    setup({ hasMissingDiv: true })
    expect(screen.queryByTestId('number')).not.toBeInTheDocument()
  })
})
