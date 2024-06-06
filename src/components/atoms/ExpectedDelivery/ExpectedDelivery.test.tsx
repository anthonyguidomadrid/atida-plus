import { render, screen } from '@testing-library/react'
import { ExpectedDelivery, ExpectedDeliveryProps } from './index'
import { useTranslation } from 'react-i18next'

describe(ExpectedDelivery, () => {
  const defaultProps = {
    deliveryText: 'sibs',
    deliveryDays: { minDeliveryDays: 1, maxDeliveryDays: 3 }
  }
  const { t } = useTranslation()
  const setup = (props: Partial<ExpectedDeliveryProps> = {}) =>
    render(<ExpectedDelivery {...defaultProps} {...props} />)

  it('renders delivery date', () => {
    setup()
    expect(screen.getByTestId('deliveryDate')).toHaveTextContent(
      t('confirmation.expected-delivery-date.sibs')
    )
  })

  it('renders delivery date', () => {
    setup({ deliveryText: 'other' })
    expect(screen.getByTestId('deliveryDate')).toHaveTextContent(
      t('confirmation.expected-delivery-date.other')
    )
  })
})
