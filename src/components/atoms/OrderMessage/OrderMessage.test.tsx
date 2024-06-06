import { screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { renderWithStore } from '~test-helpers'
import { OrderMessage, OrderMessageProps } from './index'

describe(OrderMessage, () => {
  const defaultProps = {
    name: 'Julia',
    success: true
  }

  const setup = (
    props: Partial<OrderMessageProps> = {},
    errorMessage: string,
    isLoading: boolean,
    wasSuccess: boolean,
    wasError: boolean
  ) =>
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <OrderMessage {...defaultProps} {...props} />
      </RouterContext.Provider>,
      {
        initialState: {
          client: {
            checkout: {
              reOrder: {
                isLoading,
                wasSuccess,
                wasError,
                error: errorMessage
              }
            }
          }
        }
      }
    )

  it('renders the thank you msg with specific user name', () => {
    setup(defaultProps, '', false, true, false)
    expect(
      screen.getByRole('heading', {
        name: `confirmation.thank-you ${defaultProps.name}`
      })
    ).toBeInTheDocument()
  })

  it('renders the successful order confirmation msg', () => {
    setup(defaultProps, '', false, true, false)
    expect(
      screen.getByText('confirmation.successful-order')
    ).toBeInTheDocument()
  })

  it('does not crash when name is not passed', () => {
    const { container } = setup(
      { ...defaultProps, name: undefined },
      '',
      false,
      true,
      false
    )
    expect(container).toBeInTheDocument()
  })

  it('shows an unsuccessful message when order is unsuccessful', () => {
    setup({ ...defaultProps, success: false }, '', false, false, true)
    expect(screen.getByText('unsuccessful.title')).toBeInTheDocument()
  })

  it('shows a retry button when order is unsuccessful', () => {
    setup({ ...defaultProps, success: false }, '', false, false, true)
    expect(screen.getByTestId('redCross')).toBeInTheDocument()
  })
})
