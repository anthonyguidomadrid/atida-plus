import { render, screen } from '@testing-library/react'
import {
  MondialRelayWidget,
  MondialRelayWidgetProps
} from './MondialRelayWidget'
import userEvent from '@testing-library/user-event'

describe(MondialRelayWidget, () => {
  const setIsMondialRelayModalOpen = jest.fn()
  const handlePickUpAddress = jest.fn()
  const setMondialRelayAddress = jest.fn()
  const setup = (props: Partial<MondialRelayWidgetProps> = {}) =>
    render(
      <MondialRelayWidget
        isSmallScreen={true}
        isMondialRelayModalOpen={true}
        handlePickUpAddress={handlePickUpAddress}
        setIsMondialRelayModalOpen={setIsMondialRelayModalOpen}
        setMondialRelayAddress={setMondialRelayAddress}
        {...props}
      />
    )
  it('should render the back button', () => {
    setup({ isSmallScreen: false })
    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeInTheDocument()

    userEvent.click(backButton)
    expect(setIsMondialRelayModalOpen).toHaveBeenCalledTimes(1)
  })

  it('should render the cross button', () => {
    setup()
    const crossButton = screen.getByTestId('cross-button')
    expect(crossButton).toBeInTheDocument()

    userEvent.click(crossButton)
    expect(setIsMondialRelayModalOpen).toHaveBeenCalledTimes(1)
  })

  it('should render the mondial relay widget', () => {
    setup()
    expect(screen.getByTestId('zone-widget')).toBeInTheDocument()
  })

  it('should not show the parcel shop code', () => {
    setup()
    expect(screen.getByTestId('parcel-shop-code')).toHaveProperty('hidden')
  })

  it('should render the pickup button', () => {
    setup()
    const pickupButton = screen.getByTestId('pickup-button')
    expect(pickupButton).toBeInTheDocument()

    userEvent.click(pickupButton)
    expect(setIsMondialRelayModalOpen).toHaveBeenCalledTimes(1)
  })
})
