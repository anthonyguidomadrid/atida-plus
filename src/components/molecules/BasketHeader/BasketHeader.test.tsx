import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { BasketHeader, BasketHeaderProps } from '.'

describe(BasketHeader, () => {
  const onOrderClick = jest.fn()

  const defaultProps = {
    onOrderClick,
    numberOfItems: 3,
    total: {
      value: 4309,
      currency: 'EUR'
    },
    isLoading: false,
    unavailableProducts: []
  }

  const setup = (props: Partial<BasketHeaderProps> = {}) =>
    render(<BasketHeader {...defaultProps} {...props} />)

  it('renders the basket title', () => {
    setup()
    expect(
      screen.getByRole('heading', { name: 'basket.heading' })
    ).toBeInTheDocument()
  })

  it('renders the total number of items', () => {
    setup()
    expect(
      screen.getByText('basket.total-number-of-items 3')
    ).toBeInTheDocument()
  })

  it('renders the basket total price', () => {
    setup()
    expect(screen.getByTestId('basketHeaderTotal')).toHaveTextContent('43.09')
  })

  it('renders an order button', () => {
    setup()
    expect(
      screen.getByRole('button', { name: 'basket.order' })
    ).toBeInTheDocument()
  })

  it('renders a back button', () => {
    setup()
    expect(
      screen.getByRole('button', { name: 'shared.back' })
    ).toBeInTheDocument()
  })

  it('uses next.js back functionality when back button is clicked', () => {
    const back = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      back
    }))
    setup()
    expect(back).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByRole('button', { name: 'shared.back' }))
    expect(back).toHaveBeenCalledTimes(1)
  })
})
