import { render, screen } from '@testing-library/react'
import { RestrictedZipCode, RestrictedZipCodeProps } from './index'

describe(RestrictedZipCode, () => {
  const defaultProps = {
    notificationType: 'warning'
  }

  const setup = (props: Partial<RestrictedZipCodeProps> = {}) =>
    render(<RestrictedZipCode {...defaultProps} {...props} />)

  it('renders the Restricted Zip Code component', () => {
    setup()
    expect(screen.getByTestId('restrictedZipCode')).toBeInTheDocument()
  })

  it('renders a warning background colour when notification type is warning', () => {
    render(<RestrictedZipCode notificationType="warning" />)
    expect(screen.getByTestId('restrictedZipCode')).toHaveClass(
      'bg-feedback-warning-light'
    )
  })

  it('renders a warning background colour when notification type is error', () => {
    render(<RestrictedZipCode notificationType="error" />)
    expect(screen.getByTestId('restrictedZipCode')).toHaveClass(
      'bg-feedback-error-light'
    )
  })

  it('renders the warning heading text', () => {
    setup()
    expect(
      screen.getByText('create-account.zip-code.restricted-heading')
    ).toBeInTheDocument()
  })

  it('renders the notification heading text in red if notification type is error', () => {
    render(<RestrictedZipCode notificationType="error" />)
    expect(
      screen.getByText('create-account.zip-code.restricted-heading')
    ).toHaveClass('text-feedback-error')
  })

  it('renders the notification summary text', () => {
    setup()
    expect(
      screen.getByText('create-account.zip-code.restricted-summary')
    ).toBeInTheDocument()
  })
})
