import { screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { NewCustomerNotification, NewCustomerNotificationProps } from './index'
import { renderWithStore } from '~test-helpers'
import { loginPagePageContent } from './__mocks__/newCustomerNotificationRouterMockContent'
import { newCustomerNotificationRouterMock } from './__mocks__/newCustomerNotificationRouterMock'

describe(NewCustomerNotification, () => {
  const setup = (props: Partial<NewCustomerNotificationProps> = {}) =>
    renderWithStore(
      <RouterContext.Provider value={newCustomerNotificationRouterMock}>
        <NewCustomerNotification {...props} />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: loginPagePageContent
              }
            }
          }
        }
      }
    )

  beforeEach(() => {
    setup({
      url: '/create-customer'
    })
  })

  it('renders the New Customer Notification', () => {
    expect(
      screen.getByTestId('newCustomerNotificationStaticContentBlock')
    ).toBeInTheDocument()
  })

  it('renders the Create Customer button', () => {
    expect(
      screen.getByTestId('newCustomerNotificationStaticContentBlockButton')
    ).toBeInTheDocument()
  })
})
