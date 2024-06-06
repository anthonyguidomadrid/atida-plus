import { render, screen } from '@testing-library/react'
import { ProductTileLoading } from './ProductTileLoading'

describe('ProductTileLoading', () => {
  it('should render the ProductTileLoading component', () => {
    render(<ProductTileLoading />)
    expect(screen.getByTestId('product-tile-loading')).toBeInTheDocument()
  })
})
