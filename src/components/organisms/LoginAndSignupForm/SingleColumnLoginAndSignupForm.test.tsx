import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '~test-helpers'
import { SingleColumnLoginAndSignupForm } from '.'

describe('With guest checkout', () => {
  const handleGuestCheckoutOnClick = jest.fn()
  const handleLoginOnSubmit = jest.fn()

  beforeEach(() => {
    renderWithStore(
      <SingleColumnLoginAndSignupForm
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
      />
    )
  })

  it('calls the handleGuestCheckoutOnClick function when the Guest Checkout button is clicked', async () => {
    const guestCheckoutButton = screen.getByTestId('guestNotificationButton')
    userEvent.click(guestCheckoutButton)
    await waitFor(() =>
      expect(handleGuestCheckoutOnClick).toHaveBeenCalledTimes(1)
    )
  })
})

describe('Without guest checkout', () => {
  const handleGuestCheckoutOnClick = jest.fn()
  const handleLoginOnSubmit = jest.fn()

  beforeEach(() => {
    renderWithStore(
      <SingleColumnLoginAndSignupForm
        handleGuestCheckoutOnClick={handleGuestCheckoutOnClick}
        hasGuestCheckoutButton={false}
        basketLogin={true}
        loginNotificationType={''}
        showReducedForm={false}
        wasError={false}
        hasMifarmaBanner={false}
        generalNotificationTitle={''}
        generalNotificationContent={''}
        handleLoginOnSubmit={handleLoginOnSubmit}
      />
    )
  })

  it('does not render the guest checkout button', () => {
    expect(
      screen.queryByTestId('guestNotificationButton')
    ).not.toBeInTheDocument()
  })
})
