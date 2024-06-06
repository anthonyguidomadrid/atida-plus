import { render, screen } from '@testing-library/react'
import { TermsAndConditions } from '.'
import userEvent from '@testing-library/user-event'

describe(TermsAndConditions, () => {
  it('renders terms and conditions text', () => {
    render(<TermsAndConditions translation="payment.terms-conditions" />)
    expect(screen.getByText('payment.terms-conditions')).toBeInTheDocument()
  })

  it('renders terms and conditions', () => {
    render(<TermsAndConditions />)
    expect(
      screen.getByTestId('termsAndConditionsTextVariant2')
    ).toBeInTheDocument()
  })

  it('opens Modal when terms and condition text is clicked', () => {
    render(<TermsAndConditions translation="payment.terms-conditions" />)
    expect(screen.getByText('payment.terms-conditions')).toBeInTheDocument()

    const termsAndConditionsBtn = screen.getByText('payment.terms-conditions')

    userEvent.click(termsAndConditionsBtn)

    expect(screen.getByTestId('modalComponent')).toBeInTheDocument()
  })
})
