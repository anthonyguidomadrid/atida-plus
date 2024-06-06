import { render, screen } from '@testing-library/react'
import { ProductCardLoading } from './ProductCardLoading'

describe('ProductCardLoading', () => {
  it('should render the ProductCard component', () => {
    render(<ProductCardLoading />)
    expect(screen.getByTestId('product-card-loading')).toBeInTheDocument()
  })
})
