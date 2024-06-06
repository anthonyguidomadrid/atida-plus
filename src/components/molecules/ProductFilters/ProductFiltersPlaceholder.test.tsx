import { render, screen } from '@testing-library/react'
import { ProductFiltersPlaceHolder } from './ProductFIltersPlaceholder'

describe('ProductFiltersLoading', () => {
  it('should render the ProductFilters component', () => {
    render(<ProductFiltersPlaceHolder />)
    expect(screen.getByTestId('product-filters-loading')).toBeInTheDocument()
  })
})
