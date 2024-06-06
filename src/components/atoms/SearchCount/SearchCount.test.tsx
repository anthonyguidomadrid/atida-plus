import { render, screen } from '@testing-library/react'
import { SearchCount } from './SearchCount'

describe(SearchCount, () => {
  it('should render the total number of products', () => {
    render(<SearchCount count={7} />)
    expect(
      screen.getByText('product.total-number-of-products 7')
    ).toBeInTheDocument()
  })
})
