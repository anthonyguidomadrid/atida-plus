import { render, screen } from '@testing-library/react'
import { Notification, NotificationProps } from './index'

describe(Notification, () => {
  const defaultProps = {
    type: 'success',
    title: 'Some Title',
    content: 'This is the content for the notification.'
  } as const

  const setup = (props: Partial<NotificationProps> = {}) =>
    render(
      <Notification {...defaultProps} {...props}>
        <div data-testid="notificationChildren">Children</div>
      </Notification>
    )

  it('renders the notification title', () => {
    setup({ title: 'Notification title text' })
    expect(screen.getByText('Notification title text')).toBeInTheDocument()
  })

  it('renders the notification content', () => {
    setup()
    expect(
      screen.getByText('This is the content for the notification.')
    ).toBeInTheDocument()
  })

  it('renders the notification children', () => {
    setup()
    expect(screen.getByTestId('notificationChildren')).toBeInTheDocument()
  })

  describe('Success', () => {
    it('applies the correct colors', () => {
      setup({ title: 'Notification title text' })
      expect(screen.getByTestId('notification')).toHaveClass(
        'bg-secondary-green-100 border-secondary-green-30'
      )
    })
  })

  describe('Error', () => {
    it('applies the correct colors', () => {
      setup({ type: 'error', title: 'Notification title text' })
      expect(screen.getByTestId('notification')).toHaveClass(
        'bg-secondary-red-100 border-secondary-red-40'
      )
    })
  })

  describe('Warning', () => {
    it('applies the correct colors', () => {
      setup({ type: 'warning', title: 'Notification title text' })
      expect(screen.getByTestId('notification')).toHaveClass(
        'bg-secondary-orange-100 border-secondary-orange-60'
      )
    })
  })

  describe('Info', () => {
    it('applies the correct colors', () => {
      setup({ type: 'info', title: 'Notification title text' })
      expect(screen.getByTestId('notification')).toHaveClass(
        'bg-primary-oxford-blue-100 border-primary-oxford-blue-60'
      )
    })
  })

  describe('Close button', () => {
    it('renders the close button when the closeIcon prop is sent', () => {
      setup({ closeIcon: true })
      expect(screen.getByTestId('closeNotification')).toBeInTheDocument()
    })
  })

  describe('Prefix icon', () => {
    it('applies the correct icon class - Success', () => {
      setup({ type: 'success', title: 'Test Title' })
      const prefixIcon = screen.getByTestId('prefixIcon')
      expect(prefixIcon).toBeInTheDocument()
      expect(prefixIcon).toHaveClass('text-secondary-green-30')
    })

    it('applies the correct icon class - Error', () => {
      setup({ type: 'error', title: 'Test Title' })
      const prefixIcon = screen.getByTestId('prefixIcon')
      expect(prefixIcon).toBeInTheDocument()
      expect(prefixIcon).toHaveClass('text-secondary-red-40')
    })

    it('applies the correct icon class - Warning', () => {
      setup({ type: 'warning', title: 'Test Title' })
      const prefixIcon = screen.getByTestId('prefixIcon')
      expect(prefixIcon).toBeInTheDocument()
      expect(prefixIcon).toHaveClass('text-secondary-orange-60')
    })

    it('applies the correct icon class - Info', () => {
      setup({ type: 'info', title: 'Test Title' })
      const prefixIcon = screen.getByTestId('prefixIcon')
      expect(prefixIcon).toBeInTheDocument()
      expect(prefixIcon).toHaveClass('text-primary-oxford-blue-60')
    })

    it('applies the correct icon class - Delivery', () => {
      setup({ type: 'delivery-info', title: 'Test Title' })
      const prefixIcon = screen.getByTestId('prefixIcon')
      expect(prefixIcon).toBeInTheDocument()
      expect(prefixIcon).toHaveClass('text-primary-oxford-blue-60')
    })
  })
})
