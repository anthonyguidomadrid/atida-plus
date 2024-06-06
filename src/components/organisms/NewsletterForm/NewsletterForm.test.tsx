import {
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterForm } from './NewsletterForm'
import { renderWithMockedStore } from '~test-helpers'
import { useRouter } from 'next/router'

describe(NewsletterForm, () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({ locale: 'pt-pt' }))

  const setup = () => renderWithMockedStore(<NewsletterForm />)

  it('renders an email input field', () => {
    setup()
    expect(
      screen.getByRole('textbox', { name: 'shared.email-address' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'shared.email-address' })
    ).toHaveAttribute('type', 'email')
  })

  it('renders checkbox', () => {
    setup()
    expect(
      screen.getByRole('checkbox', { name: 'newsletter.consent' })
    ).toBeInTheDocument()
  })

  describe('when the checkbox is not checked', () => {
    it("don't allow you to click the button", () => {
      setup()
      expect(
        screen.getByRole('button', { name: 'newsletter.subscribe-action' })
      ).toBeDisabled()
    })
  })

  describe('when invalid email is entered', () => {
    it('shows an error message when field is empty', async () => {
      setup()
      userEvent.click(
        screen.getByRole('checkbox', { name: 'newsletter.consent' })
      )
      userEvent.click(
        screen.getByRole('button', { name: 'newsletter.subscribe-action' })
      )
      expect(await screen.findByRole('alert')).toBeInTheDocument()
    })

    it('shows an error message when email is not in a standard format', async () => {
      setup()
      await userEvent.type(
        screen.getByRole('textbox', { name: 'shared.email-address' }),
        'some invalid email'
      )
      userEvent.click(
        screen.getByRole('checkbox', { name: 'newsletter.consent' })
      )
      userEvent.click(screen.getByText('newsletter.subscribe-action'))
      expect(await screen.findByRole('alert')).toBeInTheDocument()
    })
  })

  describe('when valid email is entered', () => {
    it('does not show an error message if invalid email has been previously entered', async () => {
      setup()
      await userEvent.type(
        screen.getByRole('textbox', { name: 'shared.email-address' }),
        'some invalid email'
      )
      userEvent.click(
        screen.getByRole('checkbox', { name: 'newsletter.consent' })
      )
      userEvent.click(screen.getByText('newsletter.subscribe-action'))
      expect(await screen.findByRole('alert')).toBeInTheDocument()

      await userEvent.type(
        screen.getByRole('textbox', { name: 'shared.email-address' }),
        'somevalidemail@example.com'
      )
      userEvent.click(
        screen.getByRole('button', { name: 'newsletter.subscribe-action' })
      )
      await waitForElementToBeRemoved(() => screen.queryByRole('alert'))
    })

    it('triggers newsletter subscription', async () => {
      const { store } = setup()
      userEvent.click(
        screen.getByRole('checkbox', { name: 'newsletter.consent' })
      )
      await userEvent.type(
        screen.getByRole('textbox', { name: 'shared.email-address' }),
        'somevalidemail@example.com'
      )
      userEvent.click(
        screen.getByRole('button', { name: 'newsletter.subscribe-action' })
      )
      await waitFor(() =>
        expect(store.getActions()).toContainEqual({
          type: 'triggerReportEmailSubscription',
          payload: {
            email: 'somevalidemail@example.com',
            email_list: expect.any(String),
            subscribed_from: expect.any(String)
          }
        })
      )
    })
  })
})
