import { render, screen } from '@testing-library/react'
import { OrderTrackingModal, OrderTrackingModalProps } from '.'

describe('OrderTrackingModal', () => {
  const defaultProps: OrderTrackingModalProps = {
    isTrackingModalOpen: true,
    isDesktopScreen: false,
    erpTrackingUrl: '',
    erpTrackingReference: ''
  }

  const setup = (props?: Partial<OrderTrackingModalProps>) => {
    render(<OrderTrackingModal {...defaultProps} {...props} />)
  }

  it('renders order tracking modal with children', () => {
    setup()
    expect(screen.getByTestId('orderTrackingModalChildren')).toBeInTheDocument()
  })
})
