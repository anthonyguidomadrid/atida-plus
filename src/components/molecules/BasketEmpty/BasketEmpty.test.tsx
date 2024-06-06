import { render, screen } from '@testing-library/react'
import { BasketEmpty } from '.'

describe(BasketEmpty, () => {
  it('renders the title', () => {
    render(<BasketEmpty />)
    expect(
      screen.getByRole('heading', { name: 'basket.is-empty-title' })
    ).toBeInTheDocument()
  })

  it('renders the text', () => {
    render(<BasketEmpty />)
    expect(screen.getByText('basket.is-empty-text')).toBeInTheDocument()
  })

  it('renders a continue button', () => {
    render(<BasketEmpty />)
    expect(
      screen.getByRole('link', { name: 'shared.continue-shopping' })
    ).toBeInTheDocument()
  })
})
