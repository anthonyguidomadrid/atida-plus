import { render, screen } from '@testing-library/react'
import { PersonalDetails, PersonalDetailsProps } from './index'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe(PersonalDetails, () => {
  const defaultProps = {
    email: 'julia@atida.com',
    name: 'Julia Schubert',
    phone: '+44 345 740 4404'
  }

  const setup = (props: Partial<PersonalDetailsProps> = {}) =>
    render(<PersonalDetails {...defaultProps} {...props} />)

  it('renders PersonalDetails component', () => {
    setup()
    expect(screen.getByTestId('personalDetails')).toBeInTheDocument()
  })

  it('renders taxReference field', () => {
    setup({ taxReference: '12345678A', accountType: 'Personal' })
    expect(
      screen.getByTestId('personalDetailsTaxReference')
    ).toBeInTheDocument()
  })

  it('renders phone value', () => {
    setup()
    expect(screen.getByTestId('personalDetailsPhone')).toHaveTextContent(
      '+44 345 740 4404'
    )
  })

  it('renders phone not provided text', () => {
    setup({ phone: undefined })
    expect(screen.getByTestId('personalDetailsPhone')).toHaveTextContent(
      'account.form.field.not-provided'
    )
  })

  describe('password field', () => {
    it('renders password filed with type password', () => {
      setup()
      expect(screen.getByTestId('passwordField')).toHaveAttribute(
        'type',
        'password'
      )
    })

    it('is disabled', () => {
      setup()
      expect(screen.getByTestId('passwordField')).toHaveAttribute('disabled')
    })
  })

  describe('date of birth field', () => {
    it('renders date of birth field', () => {
      setup({ dateOfBirth: '12-12-1984' })
      expect(
        screen.getByTestId('personalDetailsdateOfBirth')
      ).toBeInTheDocument()
    })
  })
})
