import { screen } from '@testing-library/react'
import {
  PasswordStrengthIndicator,
  PasswordStrengthIndicatorProps
} from './PasswordStrengthIndicator'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'

describe('Default Password Strength Indicator', () => {
  const defaultProps = {
    password: ''
  } as const

  const setup = (props: Partial<PasswordStrengthIndicatorProps> = {}) =>
    renderWithStoreAndFeatureFlags(
      <PasswordStrengthIndicator {...defaultProps} {...props} />,
      {}
    )

  it('renders the component with all bullet points when a password is sent', () => {
    setup({ password: 'password' })
    expect(screen.getByTestId('passwordStrengthIndicator')).toBeInTheDocument()
    expect(
      screen.getByTestId('passwordStrengthIndicator-minimumLengthPolicy')
    ).toBeInTheDocument()
  })

  it('renders the component with all bullet points greyed out when a password does not have the required length', () => {
    setup({ password: 'pwd' })
    expect(screen.getByTestId('passwordStrengthIndicator')).toBeInTheDocument()
    expect(
      screen.getByTestId('passwordStrengthIndicator-minimumLengthPolicy')
        .lastChild
    ).not.toHaveClass('text-primary-oxford-blue')
  })

  it('renders the component when a password has a combination of the upper and lowercase characters only', () => {
    setup({ password: 'Passwd' })
    expect(screen.getByTestId('passwordStrengthIndicator')).toBeInTheDocument()
    expect(
      screen.getByTestId('passwordStrengthIndicator-minimumLengthPolicy')
        .lastChild
    ).not.toHaveClass('text-primary-oxford-blue')
  })

  it('renders the component when a password has the combination of digits and symbols only', () => {
    setup({ password: 'pwd@1' })
    expect(screen.getByTestId('passwordStrengthIndicator')).toBeInTheDocument()
    expect(
      screen.getByTestId('passwordStrengthIndicator-minimumLengthPolicy')
        .lastChild
    ).not.toHaveClass('text-primary-oxford-blue')
  })

  it('renders the component when a password has a combination of minimum length and upper and lowercase characters', () => {
    setup({ password: 'Password' })
    expect(screen.getByTestId('passwordStrengthIndicator')).toBeInTheDocument()
    expect(
      screen.getByTestId('passwordStrengthIndicator-minimumLengthPolicy')
        .lastChild
    ).toHaveClass('text-primary-oxford-blue')
  })

  it('renders the component when a password has a combination of minimum length and digits and symbols', () => {
    setup({ password: 'password@1' })
    expect(screen.getByTestId('passwordStrengthIndicator')).toBeInTheDocument()
    expect(
      screen.getByTestId('passwordStrengthIndicator-minimumLengthPolicy')
        .lastChild
    ).toHaveClass('text-primary-oxford-blue')
  })

  it('renders the component when a password has a combination of upper and lowercase characters and digits and symbols without the required length', () => {
    setup({ password: 'Pwd@1' })
    expect(screen.getByTestId('passwordStrengthIndicator')).toBeInTheDocument()
    expect(
      screen.getByTestId('passwordStrengthIndicator-minimumLengthPolicy')
        .lastChild
    ).not.toHaveClass('text-primary-oxford-blue')
  })

  it('does not render when the password is strong', () => {
    setup({ password: 'Passwd@123' })
    setTimeout(() => {
      expect(
        screen.queryByTestId('passwordStrengthIndicatorBullets')
      ).not.toBeInTheDocument()
    }, 3000)
  })

  it('does not render the bullets when not showBullets is set to false', () => {
    setup({ password: 'Passwd@123', showBullets: false })
    expect(
      screen.queryByTestId('passwordStrengthIndicatorBullets')
    ).not.toBeInTheDocument()
  })
})
