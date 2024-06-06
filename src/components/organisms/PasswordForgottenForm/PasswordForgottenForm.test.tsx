import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { PasswordForgottenForm } from '.'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'

describe(PasswordForgottenForm, () => {
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
    renderWithStore(<PasswordForgottenForm onSubmit={onSubmit} />)
  })

  it('renders email input field', async () => {
    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', { name: 'form.field.email.label' })
    ).toHaveAttribute('type', 'email')
  })

  describe('handles the url params', () => {
    it('autofills the email field', async () => {
      const textbox = screen.getByRole('textbox', {
        name: 'form.field.email.label'
      })

      expect(textbox).toBeInTheDocument()
      expect(textbox).toHaveValue('someEmail@email.com')
    })
  })
  describe('has field validation errors', () => {
    it('renders empty email input field error', async () => {
      const textbox = screen.getByRole('textbox', {
        name: 'form.field.email.label'
      })

      expect(textbox).toBeInTheDocument()

      fireEvent.focus(textbox)
      userEvent.clear(textbox)
      fireEvent.blur(textbox)

      await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())

      expect(screen.getByRole('alert')).toHaveTextContent(
        'password-forgotten.email.required'
      )
    })

    it('renders invalid email format input field error', async () => {
      const textbox = screen.getByRole('textbox', {
        name: 'form.field.email.label'
      })

      expect(textbox).toBeInTheDocument()

      userEvent.clear(textbox)
      fireEvent.focus(textbox)
      fireEvent.change(textbox, {
        target: { value: 'lfnasdf@sdkfjasdf' }
      })
      fireEvent.blur(textbox)

      await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())

      expect(screen.getByRole('alert')).toHaveTextContent(
        'password-forgotten.invalid-email-format'
      )
    })
  })
})
