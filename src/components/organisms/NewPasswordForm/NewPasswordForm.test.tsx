import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { NewPasswordForm } from '.'

describe(NewPasswordForm, () => {
  const onSubmit = jest.fn()
  describe('When the confirm password ff is disabled', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(<NewPasswordForm onSubmit={onSubmit} />, {
        featureFlags: {
          [FeatureFlag.ACCOUNT_HIDE_CONFIRM_PASSWORD_FIELD]: false
        }
      })
    })

    it('renders password input field', () => {
      expect(screen.getByTestId('passwordField')).toBeInTheDocument()
    })

    it('renders repeat password input field', () => {
      expect(screen.getByTestId('rePasswordField')).toBeInTheDocument()
    })

    it('shows password', () => {
      const passwordField = screen.getByTestId('passwordField')
      expect(passwordField).toHaveAttribute('type', 'password')
      const showButton = screen.getByTestId('togglePassword')
      fireEvent.change(passwordField, { target: { value: 'test' } })
      fireEvent.click(showButton)
      expect(passwordField).toHaveAttribute('type', 'text')
    })

    it('shows repeat password', () => {
      const passwordField = screen.getByTestId('rePasswordField')
      expect(passwordField).toHaveAttribute('type', 'password')
      const showButton = screen.getByTestId('toggleRePassword')
      fireEvent.change(passwordField, { target: { value: 'test' } })
      fireEvent.click(showButton)
      expect(passwordField).toHaveAttribute('type', 'text')
    })

    describe('when valid password is entered', () => {
      it('submits form', async () => {
        await userEvent.type(
          screen.getByTestId('passwordField'),
          'someValidPassword@123'
        )
        await userEvent.type(
          screen.getByTestId('rePasswordField'),
          'someValidPassword@123'
        )
        userEvent.click(screen.getByTestId('newPasswordFormButton'))
        await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
        expect(onSubmit).toHaveBeenCalledWith({
          password: 'someValidPassword@123',
          rePassword: 'someValidPassword@123'
        })
      })
    })
  })
  describe('When the hide confirm password ff is enabled', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(<NewPasswordForm onSubmit={onSubmit} />, {
        featureFlags: {
          [FeatureFlag.ACCOUNT_HIDE_CONFIRM_PASSWORD_FIELD]: true
        }
      })
    })

    it('does not render the confirm new password input field', () => {
      expect(screen.queryByTestId('rePasswordField')).not.toBeInTheDocument()
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const submitButton = screen.getByTestId('newPasswordFormButton')

      userEvent.type(
        screen.getByTestId('passwordField'),
        'someValidPassword@123'
      )

      fireEvent.click(submitButton)
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith({
          password: 'someValidPassword@123',
          rePassword: 'someValidPassword@123'
        })
      })
    })
  })
})
