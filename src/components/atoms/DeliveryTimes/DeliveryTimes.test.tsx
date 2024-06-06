import { render, screen } from '@testing-library/react'
import { DeliveryTimes, DeliveryTimesProps } from './DeliveryTimes'

describe(DeliveryTimes, () => {
  const setup = (props: Partial<DeliveryTimesProps> = {}) =>
    render(<DeliveryTimes {...props}></DeliveryTimes>)

  it('render component', () => {
    setup()
    expect(screen.getByTestId('delivery-times')).toBeInTheDocument()
  })

  it('renders on demand information', () => {
    setup()
    expect(screen.getByText('product.standard-delivery')).toBeInTheDocument()
  })

  it('renders standard delive information', () => {
    setup({ onDemand: true })
    expect(screen.getByText('product.on-demand')).toBeInTheDocument()
  })
})
