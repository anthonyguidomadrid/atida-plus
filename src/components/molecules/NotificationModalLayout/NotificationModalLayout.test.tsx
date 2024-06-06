import { render, screen } from '@testing-library/react'
import { NotificationModalLayout, NotificationModalLayoutProps } from '.'

describe(NotificationModalLayout, () => {
  const defaultProps = {
    confirmButtonLabel: 'Test confirmation button label',
    handleConfirm: jest.fn(),
    showIcon: false,
    isOpen: true
  }

  const setup = (props: Partial<NotificationModalLayoutProps> = {}) =>
    render(
      <NotificationModalLayout variant="center" {...defaultProps} {...props} />
    )

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('notificationModalLayout')).toBeInTheDocument()
    expect(
      screen.queryByText(/Test confirmation button label/)
    ).toBeInTheDocument()
  })

  it('renders the close button', () => {
    setup({
      closeButtonLabel: 'Test close button label',
      handleClose: jest.fn()
    })
    expect(
      screen.getByTestId('notificationModalLayoutCloseButton')
    ).toBeInTheDocument()
  })

  it('renders the icon', () => {
    setup({
      showIcon: true
    })
    expect(
      screen.getByTestId('notificationModalLayoutIcon')
    ).toBeInTheDocument()
  })

  it('does NOT render the modal', () => {
    setup({
      isOpen: false
    })
    expect(screen.queryByText(/Test button label/)).not.toBeInTheDocument()
  })

  it('does not render the confirmation button if no confirmButtonLabel is passed', () => {
    render(
      <NotificationModalLayout variant="center" isOpen={true} showIcon={true} />
    )
    expect(
      screen.queryByTestId('notificationModalLayoutConfirmButton')
    ).not.toBeInTheDocument()
  })

  it('does not render the close button if no closeButtonLabel is passed', () => {
    render(
      <NotificationModalLayout variant="center" isOpen={true} showIcon={true} />
    )
    expect(
      screen.queryByTestId('notificationModalLayoutCloseButton')
    ).not.toBeInTheDocument()
  })

  it('renders a dark background if the modal is open', () => {
    setup()
    expect(screen.getByTestId('modal-background')).toHaveStyle(
      'background-color: rgba(26, 29, 50, 0.2)'
    )
  })

  it('renders a tracking modal with button', () => {
    render(
      <NotificationModalLayout
        variant="center"
        isOpen={true}
        showIcon={true}
        isTrackingModal
      />
    )
    expect(screen.getByTestId('trackingProviderButton')).toBeInTheDocument()
  })

  it('hides button section', () => {
    setup({
      hideButtonSection: false
    })

    expect(screen.getByTestId('buttonsSection')).toBeInTheDocument()
  })

  it('does nоt execute the useEffect to set the style of the body when isMondialRelayModalOpen is true and isMondialRelayNotification is false', () => {
    setup({
      isMondialRelayModalOpen: true,
      isMondialRelayNotification: false
    })

    expect(screen.getByTestId('notificationModalLayout')).toBeInTheDocument()
  })
})
