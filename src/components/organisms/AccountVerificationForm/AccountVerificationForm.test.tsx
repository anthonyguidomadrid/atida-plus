import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { renderWithStore } from '~test-helpers'
import { AccountVerificationForm } from '.'

describe(AccountVerificationForm, () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/account-verification/checkout',
      locale: 'es-es',
      replace: jest.fn()
    }))
    renderWithStore(
      <AccountVerificationForm
        onSubmit={onSubmit}
        userEmail="someEmail@email.com"
        userName="someName"
        blockEmail
      />
    )
  })

  it('renders email input field', () => {
    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toHaveAttribute('type', 'email')
  })

  it('renders email input field disabled', () => {
    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toHaveAttribute('disabled')
  })

  it('renders password input field', () => {
    expect(screen.getByTestId('passwordField')).toBeInTheDocument()
    expect(screen.getByTestId('passwordField')).toHaveAttribute(
      'type',
      'password'
    )
  })

  it('shows password', () => {
    const passwordField = screen.getByTestId('passwordField')
    expect(passwordField).toHaveAttribute('type', 'password')
    const showButton = screen.getByTestId('togglePassword')
    fireEvent.change(passwordField, { target: { value: 'test' } })
    userEvent.click(showButton)
    expect(passwordField).toHaveAttribute('type', 'text')
  })

  it('the onSubmit function is not called if the form is not completed correctly', async () => {
    const submitButton = screen.getByTestId('accountVerificationFormButton')
    userEvent.clear(screen.getByTestId('passwordField'))
    userEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
  })

  it('the onSubmit function is called if the form is completed correctly', async () => {
    const submitButton = screen.getByTestId('accountVerificationFormButton')
    userEvent.type(screen.getByTestId('passwordField'), 'P@ssword')
    userEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
  })
})
