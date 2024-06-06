import { render, screen } from '@testing-library/react'
import {
  FreeShippingNotification,
  FreeShippingNotificationProps
} from './FreeShippingNotification'
import { useTranslation } from 'react-i18next'

const defaultProps = {
  hasReachedFreeShipping: false
}

describe('FreeShippingNotification', () => {
  const { t } = useTranslation()
  const setup = (props: Partial<FreeShippingNotificationProps> = {}) =>
    render(<FreeShippingNotification {...defaultProps} {...props} />)

  it('renders free shipping notification', () => {
    setup()
    expect(screen.getByTestId('freeShippingNotification')).toBeInTheDocument()
  })

  it('renders the correct text', () => {
    setup()
    expect(screen.getByTestId('freeShippingText')).toHaveTextContent(
      t(`basket.free-shipping.progress`)
    )
  })

  it('renders the correct text when hasReachedFreeShipping is false ', () => {
    setup()
    expect(screen.getByTestId('freeShippingText')).toHaveTextContent(
      t(`basket.free-shipping.progress`)
    )
  })

  it('renders the correct text when isDiscountedItem is true', () => {
    setup({ isDiscountedItem: true })
    expect(screen.getByTestId('freeShippingText')).toHaveTextContent(
      t(`basket.third-rank.add-product`)
    )
  })

  it('renders the correct text when hasReachedFreeShipping is true', () => {
    setup({ hasReachedFreeShipping: true })
    expect(screen.getByTestId('freeShippingText')).toHaveTextContent(
      t(`basket.free-shipping.reached`)
    )
  })
})
