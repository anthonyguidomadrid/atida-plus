import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '~test-helpers'
import { TwoColumnLoginAndSignupForm } from '.'
import { useRouter } from 'next/router'
import { SOCIAL_LOGIN_SERVICE_TYPE } from '~config/constants/social-login-service-types'
import { LoginAndSignupFormProps } from '~components/organisms/LoginAndSignupForm/types'

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

describe('With guest checkout', () => {
  const handleGuestCheckoutOnClick = jest.fn()
  const handleLoginOnSubmit = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: undefined,
      locale: 'pt-pt',
      query: {
        code: 'some-code',
        scope: 'some-scope',
        social: SOCIAL_LOGIN_SERVICE_TYPE.google
      },
      replace: jest.fn()
    }))

    renderWithStore(
      <TwoColumnLoginAndSignupForm
        handleGuestCheckoutOnClick={handleGuestCheckoutOnClick}
        hasGuestCheckoutButton={true}
        basketLogin={true}
        loginNotificationType={''}
        showReducedForm={false}
        wasError={false}
        hasMifarmaBanner={false}
        generalNotificationTitle={''}
        generalNotificationContent={''}
        handleLoginOnSubmit={handleLoginOnSubmit}
        isGoogleEnabled
        isFaceBookEnabled
        isAppleEnabled
      />
    )
  })

  it('calls the handleGuestCheckoutOnClick function when the Guest Checkout button is clicked', async () => {
    const guestCheckoutButton = screen.getByTestId(
      'continueAsGuestStaticContentBlockButton'
    )
    userEvent.click(guestCheckoutButton)
    await waitFor(() =>
      expect(handleGuestCheckoutOnClick).toHaveBeenCalledTimes(1)
    )
  })
})

describe('Without guest checkout', () => {
  const handleGuestCheckoutOnClick = jest.fn()
  const handleLoginOnSubmit = jest.fn()

  const defaultProps = {
    handleGuestCheckoutOnClick,
    hasGuestCheckoutButton: false,
    basketLogin: true,
    loginNotificationType: '',
    showReducedForm: false,
    wasError: true,
    hasMifarmaBanner: false,
    generalNotificationTitle: '',
    generalNotificationContent: '',
    handleLoginOnSubmit,
    isGoogleEnabled: true,
    isFaceBookEnabled: true,
    isAppleEnabled: true
  }

  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: undefined,
    locale: 'pt-pt',
    query: {
      code: 'some-code',
      scope: 'some-scope',
      social: SOCIAL_LOGIN_SERVICE_TYPE.google
    },
    push: jest.fn()
  }))

  const setup = (props: LoginAndSignupFormProps) =>
    renderWithStore(
      <TwoColumnLoginAndSignupForm {...defaultProps} {...props} />
    )

  beforeEach(() => {
    setup(defaultProps)
  })

  it('does not render the guest checkout button', () => {
    expect(
      screen.queryByTestId('continueAsGuestStaticContentBlockButton')
    ).not.toBeInTheDocument()
  })

  it('displays the notification title for social error', () => {
    expect(
      screen.queryByText('login-social.error.title Google')
    ).toBeInTheDocument()
  })

  it('displays the notification title for lockout error', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: undefined,
      locale: 'pt-pt',
      query: {},
      push: jest.fn()
    }))

    setup({ ...defaultProps, error: 'login.lockout-error.content' })
    expect(screen.queryByText('login.lockout-error.title')).toBeInTheDocument()
  })
})
