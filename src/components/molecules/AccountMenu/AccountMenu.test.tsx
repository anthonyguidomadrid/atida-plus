import { screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import { AccountMenu, AccountMenuProps } from './index'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'

const store = createStore(rootReducer, {})

describe(AccountMenu, () => {
  const defaultProps: AccountMenuProps = {
    isLoggedIn: false,
    onClose: jest.fn()
  }

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: undefined,
      locale: 'pt-pt',
      query: { code: 'some-code', scope: 'some-scope' },
      replace: jest.fn()
    }))
  })

  const setup = (props: Partial<AccountMenuProps> = {}, featureFlags = {}) => {
    const { reset } = setupMatchMediaMock(true)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <Provider store={store}>
        <AccountMenu {...defaultProps} {...props} />
      </Provider>,
      {
        featureFlags
      }
    )
    reset()
    return renderedComponent
  }

  it('renders AccountMenu component', () => {
    setup()
    expect(screen.getByTestId('myAccountMenu')).toBeInTheDocument()
  })

  it('renders list with navigation items', () => {
    setup()
    expect(screen.getByTestId('accountMenuList')).toBeInTheDocument()
  })

  it('show correct user name when logged in', () => {
    const { getByText } = setup({ isLoggedIn: true, firstName: 'Julia' })
    expect(getByText('account.greetings-with-name Julia')).toBeInTheDocument()
  })

  it('displays login and create account buttons if using new-style account menu', () => {
    setup({ ...defaultProps, hasNewAccountMenuStyle: true })
    expect(screen.getByTestId('accountMenuLoginLink')).toBeInTheDocument()
    expect(
      screen.getByTestId('accountMenuCreateAccountLink')
    ).toBeInTheDocument()
  })

  it('displays social login buttons if Account Menu Social Login, Google and Facebook FFs are enabled ', () => {
    setup(
      { ...defaultProps, hasNewAccountMenuStyle: true },
      {
        [FeatureFlag.ACCOUNT_MENU_SOCIAL_LOGIN_AND_SIGNUP]: true,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_GOOGLE]: true,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_FACEBOOK]: true
      }
    )
    expect(screen.getByTestId('socialLoginContainer')).toBeInTheDocument()
    expect(screen.getByTestId('socialLoginButtonGoogle')).toBeInTheDocument()
    expect(screen.getByTestId('socialLoginButtonFaceBook')).toBeInTheDocument()
  })

  it('does NOT display social login buttons if Account Menu Social Login FF is disabled, Google and Facebook FFs are enabled ', () => {
    setup(
      { ...defaultProps, hasNewAccountMenuStyle: true },
      {
        [FeatureFlag.ACCOUNT_MENU_SOCIAL_LOGIN_AND_SIGNUP]: false,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_GOOGLE]: true,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_FACEBOOK]: true
      }
    )
    expect(screen.queryByTestId('socialLoginContainer')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('socialLoginButtonGoogle')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('socialLoginButtonFaceBook')
    ).not.toBeInTheDocument()
  })

  it('does NOT display social login buttons if Account Menu Social Login FF is enabled, Google and Facebook FFs are disabled ', () => {
    setup(
      { ...defaultProps, hasNewAccountMenuStyle: true },
      {
        [FeatureFlag.ACCOUNT_MENU_SOCIAL_LOGIN_AND_SIGNUP]: true,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_GOOGLE]: false,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_FACEBOOK]: false
      }
    )
    expect(screen.queryByTestId('socialLoginContainer')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('socialLoginButtonGoogle')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('socialLoginButtonFaceBook')
    ).not.toBeInTheDocument()
  })

  it('does NOT display social login buttons if Account Menu Social Login, Google and Facebook FFs are enabled but the New Account Menu style is disabled', () => {
    setup(
      { ...defaultProps, hasNewAccountMenuStyle: false },
      {
        [FeatureFlag.ACCOUNT_MENU_SOCIAL_LOGIN_AND_SIGNUP]: true,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_GOOGLE]: true,
        [FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_FACEBOOK]: true
      }
    )
    expect(screen.queryByTestId('socialLoginContainer')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('socialLoginButtonGoogle')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('socialLoginButtonFaceBook')
    ).not.toBeInTheDocument()
  })
})
