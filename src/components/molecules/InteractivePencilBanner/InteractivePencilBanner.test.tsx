import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { InteractivePencilBanner, InteractivePencilBannerProps } from './index'

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
})

describe(InteractivePencilBanner, () => {
  const defaultProps = {
    closeIcon: true,
    initialCouponCode: 'ATIDA10',
    initialShortOffer: '10% Rabatt auf Ihre erste Bestellung'
  } as const

  const setup = (props: Partial<InteractivePencilBannerProps> = {}) =>
    render(<InteractivePencilBanner {...defaultProps} {...props} />)

  it('renders the coupon code, the short offer and the copy button', () => {
    setup({ initialCouponCode: 'ATIDA10' })
    expect(screen.getByText('ATIDA10')).toBeInTheDocument()
    expect(
      screen.getByText('10% Rabatt auf Ihre erste Bestellung')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('interactive-pencil-banner-copy-button')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('interactive-pencil-banner-coupon-code')
    ).toBeInTheDocument()
  })

  it('does not render the copy button if no coupon code is provided', () => {
    setup({ initialCouponCode: undefined })
    expect(
      screen.queryByTestId('interactive-pencil-banner-copy-button')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('interactive-pencil-banner-coupon-code')
    ).not.toBeInTheDocument()
  })

  it('does not render the short offer text if no value is provided', () => {
    setup({ initialShortOffer: undefined })
    expect(
      screen.queryByTestId('interactive-pencil-banner-short-offer')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('interactive-pencil-banner-copy-button')
    ).toHaveClass('hidden')
  })

  it('copies text into clipboard', () => {
    setup({ initialCouponCode: 'LastChristmas' })
    jest.spyOn(navigator.clipboard, 'writeText')
    userEvent.click(screen.getByTestId('interactive-pencil-banner-copy-button'))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('LastChristmas')
  })

  it('does not copy text into clipboard, when no voucher provided', () => {
    setup({ initialCouponCode: undefined })
    jest.spyOn(navigator.clipboard, 'writeText')
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0)
  })

  it('closes the notification after a while', () => {
    setup()
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    expect(
      screen.getByTestId('interactive-pencil-banner-notification-toaster')
    ).toHaveClass('hidden')
    userEvent.click(screen.getByTestId('interactive-pencil-banner-copy-button'))
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(
      screen.getByTestId('interactive-pencil-banner-notification-toaster')
    ).not.toHaveClass('hidden')
    act(() => {
      jest.runAllTimers()
    })
    expect(
      screen.getByTestId('interactive-pencil-banner-notification-toaster')
    ).toHaveClass('hidden')
  })

  it('closes the banner when close button is clicked', () => {
    setup()
    expect(screen.queryByTestId('interactivePencilBanner')).toHaveClass('flex')
    expect(screen.queryByTestId('interactivePencilBanner')).not.toHaveClass(
      'hidden'
    )
    userEvent.click(
      screen.getByTestId('interactive-pencil-banner-close-button')
    )
    expect(screen.queryByTestId('interactivePencilBanner')).toHaveClass(
      'hidden'
    )
  })
})
