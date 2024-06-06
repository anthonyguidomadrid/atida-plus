import { render, screen } from '@testing-library/react'
import { KeyDetailsTable, KeyDetailsTableProps } from './index'

describe(KeyDetailsTable, () => {
  const defaultProps = {
    format: {
      code: 'shampooCode',
      label: 'Shampoo'
    },
    unitPrice: {
      value: 516,
      currency: 'EUR',
      unit: '100 ml'
    },
    brand: { code: 'beiersdorf', label: 'Beiersdorf AG Eucerin' },
    msrp: {
      value: 3990,
      currency: 'EUR'
    }
  }

  const setup = (props: Partial<KeyDetailsTableProps> = {}) =>
    render(<KeyDetailsTable {...defaultProps} {...props} />)

  it('renders product type', () => {
    setup()
    expect(screen.getByTestId('productFormat')).toHaveTextContent('Shampoo')
  })

  it('renders unit price', () => {
    setup()
    expect(screen.getByTestId('unitPrice')).toHaveTextContent('5.16 / 100 ml')
  })

  it('renders product brand', () => {
    setup()
    expect(screen.getByTestId('productBrand')).toHaveTextContent(
      'Beiersdorf AG Eucerin'
    )
  })

  it('renders product msrp', () => {
    setup()
    expect(screen.getByTestId('productMSRP')).toHaveTextContent('39.90')
  })

  it('does not crash when product format is not passed', () => {
    const { container } = setup({
      format: undefined
    })
    expect(container).toBeInTheDocument()
  })

  it('does not crash when unit price is not passed', () => {
    const { container } = setup({ unitPrice: undefined })
    expect(container).toBeInTheDocument()
  })

  it('does not crash when product brand is not passed', () => {
    const { container } = setup({
      // @ts-expect-error
      brand: { code: undefined, label: undefined }
    })
    expect(container).toBeInTheDocument()
  })

  it('does not crash when product msrp is not passed', () => {
    const { container } = setup({ msrp: undefined })
    expect(container).toBeInTheDocument()
  })
})
