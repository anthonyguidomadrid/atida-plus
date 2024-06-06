import { render, screen } from '@testing-library/react'
import { AvailabilityWarningBlock, AvailabilityWarningBlockProps } from '.'

describe(AvailabilityWarningBlock, () => {
  const setup = (props: Partial<AvailabilityWarningBlockProps> = {}) =>
    render(<AvailabilityWarningBlock {...props} />)
  it('renders the component', () => {
    setup({
      productName: 'Eucerin UreaRepair Plus Lotion 10%',
      productQuantity: 5
    })
    expect(screen.getByTestId('availabilityWarningBlock')).toBeInTheDocument()
  })
  it('renders a different title and description when it is refering to a gift', () => {
    setup({ isPromotionalItem: true })
    expect(screen.getByTestId('availabilityWarningTitle')).toHaveTextContent(
      'promotional-item.availability.warning.block-title'
    )
  })
})
