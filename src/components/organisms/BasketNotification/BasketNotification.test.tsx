import { renderWithStore } from '~test-helpers'
import {
  BasketNotification,
  BasketNotificationProps
} from './BasketNotification'
import { screen } from '@testing-library/react'
import { product } from '../../../domains/product/__mocks__/product'
import { setupMatchMediaMock } from '~domains/breakpoints'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { createRef } from 'react'

describe(BasketNotification, () => {
  const ref = createRef<HTMLDivElement>()

  const defaultProps = {
    product: product,
    isModalOpen: false,
    isRemoved: false,
    wasItemSuccess: true,
    basketItems: 1,
    wasItemError: false
  }

  const setup = (props: Partial<BasketNotificationProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    const renderComponent = renderWithStore(
      <BasketNotification
        {...defaultProps}
        basketNotificationRef={ref}
        {...props}
      />
    )
    reset()
    return renderComponent
  }

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('basketNotification')).toBeInTheDocument()
  })

  it('renders view basket button if wasSuccess is true', () => {
    setup({ isModalOpen: true })
    expect(
      screen.getByTestId('basketNotificationViewBasket')
    ).toBeInTheDocument()
  })

  it('triggers viewBasketTrigger if view basket button is clicked', () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push
    }))

    setup({ isModalOpen: true })

    expect(
      screen.getByTestId('basketNotificationViewBasket')
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', { name: 'basket.modal-view-basket' })
    )
    expect(push).toHaveBeenCalledWith('/basket')
  })
})
