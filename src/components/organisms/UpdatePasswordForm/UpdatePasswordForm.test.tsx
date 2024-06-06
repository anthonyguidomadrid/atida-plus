import { screen, fireEvent, waitFor } from '@testing-library/react'
import { UpdatePasswordForm } from '../UpdatePasswordForm'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import userEvent from '@testing-library/user-event'
import { FeatureFlag } from '~config/constants/feature-flags'

describe(UpdatePasswordForm, () => {
  const onSubmit = jest.fn()
  describe('When the confirm password ff is disabled', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <UpdatePasswordForm onSubmit={onSubmit} />,
        {
          featureFlags: {
            [FeatureFlag.ACCOUNT_HIDE_CONFIRM_PASSWORD_FIELD]: false
          }
        }
      )
    })

    it('renders the current password input field', () => {
      expect(screen.getByTestId('loginFormPassword')).toBeInTheDocument()
    })

    it('shows current password', () => {
      const passwordField = screen.getByTestId('passwordField')
      expect(passwordField).toHaveAttribute('type', 'password')
      const showButton = screen.getByTestId('togglePassword')
      fireEvent.change(passwordField, { target: { value: 'test' } })
      fireEvent.click(showButton)
      expect(passwordField).toHaveAttribute('type', 'text')
    })

    it('renders the new password input field', () => {
      expect(screen.getByTestId('newPasswordFormPassword')).toBeInTheDocument()
    })

    it('shows new password', () => {
      const passwordField = screen.getByTestId('newPasswordField')
      expect(passwordField).toHaveAttribute('type', 'password')
      const showButton = screen.getByTestId('toggleNewPassword')
      fireEvent.change(passwordField, { target: { value: 'test' } })
      fireEvent.click(showButton)
      expect(passwordField).toHaveAttribute('type', 'text')
    })

    it('renders the confirm new password input field', () => {
      expect(
        screen.getByTestId('confirmNewPasswordFormPassword')
      ).toBeInTheDocument()
    })

    it('shows the confirmed new password', () => {
      const passwordField = screen.getByTestId('confirmNewPasswordField')
      expect(passwordField).toHaveAttribute('type', 'password')
      const showButton = screen.getByTestId('toggleConfirmNewPassword')
      fireEvent.change(passwordField, { target: { value: 'test' } })
      fireEvent.click(showButton)
      expect(passwordField).toHaveAttribute('type', 'text')
    })

    it('renders the submit button', () => {
      expect(screen.getByTestId('UpdatePasswordFormButton')).toBeInTheDocument()
    })

    it('the onSubmit function is not called if the form is not completed correctly', async () => {
      const submitButton = screen.getByTestId('UpdatePasswordFormButton')
      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('the onSubmit function is not called if the password field has not the required length of 8', async () => {
      const submitButton = screen.getByTestId('UpdatePasswordFormButton')

      userEvent.type(screen.getByTestId('passwordField'), 'Passwd')
      userEvent.type(screen.getByTestId('newPasswordField'), 'Password1234!!')

      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const submitButton = screen.getByTestId('UpdatePasswordFormButton')

      userEvent.type(screen.getByTestId('passwordField'), 'Password1234!')
      userEvent.type(screen.getByTestId('newPasswordField'), 'Password1234!!')
      userEvent.type(
        screen.getByTestId('confirmNewPasswordField'),
        'Password1234!!'
      )

      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })
  describe('When the hide confirm password ff is enabled', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <UpdatePasswordForm onSubmit={onSubmit} />,
        {
          featureFlags: {
            [FeatureFlag.ACCOUNT_HIDE_CONFIRM_PASSWORD_FIELD]: true
          }
        }
      )
    })

    it('does not render the confirm new password input field', () => {
      expect(
        screen.queryByTestId('confirmNewPasswordFormPassword')
      ).not.toBeInTheDocument()
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const submitButton = screen.getByTestId('UpdatePasswordFormButton')

      userEvent.type(screen.getByTestId('passwordField'), 'Password1234!')
      userEvent.type(screen.getByTestId('newPasswordField'), 'Password1234!!')

      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })

    it('the onSubmit function is not called if the password field has not the required length of 8', async () => {
      const submitButton = screen.getByTestId('UpdatePasswordFormButton')

      userEvent.type(screen.getByTestId('passwordField'), 'Passwd')
      userEvent.type(screen.getByTestId('newPasswordField'), 'Password1234!!')

      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })
  })
})
