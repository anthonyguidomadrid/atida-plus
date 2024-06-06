import { render, screen } from '@testing-library/react'
import { Availability } from '.'

describe(Availability, () => {
  it('renders availability text "In stock"', () => {
    render(<Availability availability="AVAILABLE" />)
    expect(
      screen.getByText('product.availability.in-stock')
    ).toBeInTheDocument()
  })
  it('renders availability text "Out of stock" if availability="NOT_AVAILABLE"', () => {
    render(<Availability availability="NOT_AVAILABLE" />)
    expect(
      screen.getByText('product.availability.out-of-stock')
    ).toBeInTheDocument()
  })
  it('renders availability text "Out of stock" if availability is not passed', () => {
    render(<Availability availability={undefined} />)
    expect(
      screen.getByText('product.availability.out-of-stock')
    ).toBeInTheDocument()
  })
  it('renders availability text "items left" if both availability and qty are passed', () => {
    render(<Availability availability="AVAILABLE" qty={5} />)
    expect(
      screen.getByText('5 product.availability.items-left')
    ).toBeInTheDocument()
  })
})
