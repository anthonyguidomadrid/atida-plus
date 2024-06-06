import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import SagaTester from 'redux-saga-tester'
import { renderWithStore } from '~test-helpers'
import { SocialLoginAndSignUp, SocialLoginAndSignUpProps } from './index'
import type { DeepPartial } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'
import { socialLoginSaga } from '~domains/social/sagas/login'
import { socialLoginFulfill, socialLoginTrigger } from '~domains/social'
import { SOCIAL_LOGIN_SERVICE_TYPE } from '~config/constants/social-login-service-types'
import { socialLoginGooglePayload } from '~domains/social/__mocks__/social-login'

describe(SocialLoginAndSignUp, () => {
  const onClick = jest.fn()
  const defaultProps = {
    label: 'I am a label',
    isFaceBookEnabled: true,
    isGoogleEnabled: true,
    isAppleEnabled: true,
    handleOnClick: onClick
  }

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
  })

  const setup = (props: Partial<SocialLoginAndSignUpProps> = {}) =>
    renderWithStore(<SocialLoginAndSignUp {...defaultProps} {...props} />)

  const setupSaga = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(socialLoginSaga)

    return saga
  }

  it('renders all the butoons and the label', () => {
    setup()
    expect(screen.getByTestId('socialLoginButtonGoogle')).toBeInTheDocument()
    expect(screen.getByTestId('socialLoginButtonApple')).toBeInTheDocument()
    expect(screen.getByTestId('socialLoginButtonFaceBook')).toBeInTheDocument()
    expect(screen.getByText('I am a label')).toBeInTheDocument()
  })

  it('does not render the Google button when the FF is disabled', () => {
    setup({ isGoogleEnabled: false })
    expect(
      screen.queryByTestId('socialLoginButtonGoogle')
    ).not.toBeInTheDocument()
  })

  it('does not render the Apple button when the FF is disabled', () => {
    setup({ isAppleEnabled: false })
    expect(
      screen.queryByTestId('socialLoginButtonApple')
    ).not.toBeInTheDocument()
  })

  it('does not render the FaceBook button when the FF is disabled', () => {
    setup({ isFaceBookEnabled: false })
    expect(
      screen.queryByTestId('socialLoginButtonFaceBook')
    ).not.toBeInTheDocument()
  })

  it('fires the onClick when any of the buttons are clicked', () => {
    const onclick = jest.fn()
    setup({ handleOnClick: onclick })
    expect(onclick).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('socialLoginButtonGoogle'))
    expect(onclick).toHaveBeenCalledTimes(1)
    userEvent.click(screen.getByTestId('socialLoginButtonApple'))
    expect(onclick).toHaveBeenCalledTimes(2)
    userEvent.click(screen.getByTestId('socialLoginButtonFaceBook'))
    expect(onclick).toHaveBeenCalledTimes(3)
  })

  it('does trigger social login', async () => {
    const saga = setupSaga()
    setup()

    saga.dispatch(
      socialLoginTrigger({
        ...socialLoginGooglePayload
      })
    )
    await saga.waitFor(socialLoginFulfill().type)

    expect(saga.getCalledActions()).toContainEqual(
      socialLoginTrigger({
        ...socialLoginGooglePayload
      })
    )
  })
})
