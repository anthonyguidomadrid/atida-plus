import { render, screen } from '@testing-library/react'
import { ManufacturerDetails, ManufacturerDetailsProps } from './index'

describe(ManufacturerDetails, () => {
  const defaultProps = {
    name: 'Test Manufacturer',
    address: {
      street: 'Test Street',
      city: 'Test City'
    }
  }

  const setup = (props: Partial<ManufacturerDetailsProps> = {}) =>
    render(<ManufacturerDetails {...defaultProps} {...props} />)

  it('renders manufacturer name', () => {
    setup()
    expect(screen.getByTestId('manufacturerName')).toHaveTextContent(
      'Test Manufacturer'
    )
  })
  it('renders manufacturer street', () => {
    setup()
    expect(screen.getByTestId('manufacturerStreet')).toHaveTextContent(
      'Test Street'
    )
  })
  it('renders manufacturer city', () => {
    setup()
    expect(screen.getByTestId('manufacturerCity')).toHaveTextContent(
      'Test City'
    )
  })
})
