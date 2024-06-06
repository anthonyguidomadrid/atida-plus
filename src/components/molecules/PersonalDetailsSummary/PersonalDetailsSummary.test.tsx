import { render, screen } from '@testing-library/react'
import { PersonalDetailsSummary, PersonalDetailsSummaryProps } from './index'
import userEvent from '@testing-library/user-event'

describe(PersonalDetailsSummary, () => {
  const defaultProps = {
    email: 'julia@atida.com',
    firstName: 'Julia',
    lastName: 'Schubert',
    salutation: 'Mrs',
    onClick: jest.fn()
  }

  const setup = (props: Partial<PersonalDetailsSummaryProps> = {}) =>
    render(<PersonalDetailsSummary {...defaultProps} {...props} />)

  it('renders PersonalDetailsSummary component', () => {
    setup()
    expect(screen.getByTestId('personalDetailsSummary')).toBeInTheDocument()
  })

  it('calls the onClick handler', () => {
    setup()
    userEvent.click(screen.getByTestId('personalDetailsSummaryButton'))
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
})
