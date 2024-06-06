import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './index'

describe(LoadingSpinner, () => {
  const setup = () => render(<LoadingSpinner />)

  it('renders the spinner', () => {
    setup()
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument()
  })

  it('rotates de spinner', () => {
    setup()
    expect(screen.getByTestId('loadingSpinner')).toHaveClass('animate-spin')
  })
})
