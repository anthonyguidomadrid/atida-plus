import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { renderWithStore } from '~test-helpers'
import { LoginForm } from '.'

describe(LoginForm, () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account?email=someEmail@email.com',
      locale: 'es-es',
      query: {
        email: 'someEmail@email.com'
      },
      replace: jest.fn()
    }))
    renderWithStore(<LoginForm onSubmit={onSubmit} basketLogin={true} />)
  })

  it('renders email input field', () => {
    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toHaveAttribute('type', 'email')
  })

  it('renders a password input field', () => {
    expect(screen.getByTestId('loginFormPassword')).toBeInTheDocument()
  })

  it('shows password', () => {
    const passwordField = screen.getByTestId('passwordField')
    expect(passwordField).toHaveAttribute('type', 'password')
    const showButton = screen.getByTestId('togglePassword')
    fireEvent.change(passwordField, { target: { value: 'test' } })
    fireEvent.click(showButton)
    expect(passwordField).toHaveAttribute('type', 'text')
  })

  it('the onSubmit function is not called if the form is not completed correctly', async () => {
    const submitButton = screen.getByTestId('loginFormButton')
    userEvent.clear(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    )
    fireEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
  })

  it('the onSubmit function is called if the form is  completed correctly', async () => {
    const submitButton = screen.getByTestId('loginFormButton')
    userEvent.type(screen.getByTestId('passwordField'), 'P@ssword')
    fireEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
  })

  it('autofills the email field with the url param', () => {
    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toHaveValue('someEmail@email.com')
  })

  it('renders the back to basket link', () => {
    const basketLink = screen.getByTestId('BasketLink')
    expect(basketLink).toBeInTheDocument()
  })

  it('shows the email warming notification when there is a typo on the email', () => {
    const email = screen.getByTestId('emailField')
    const submitButton = screen.getByTestId('loginFormButton')
    userEvent.clear(email)
    userEvent.type(email, 'someEmailWithTypos@gamil.con')
    userEvent.click(submitButton)
    expect(email).not.toHaveClass('text-feedback-error')
    expect(
      screen.getByText(
        'account.login.email-suggestion someEmailWithTypos@gmail.com'
      )
    ).toBeInTheDocument()
  })
})
