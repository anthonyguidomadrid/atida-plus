import { COP } from '../COP'
import { renderWithStore, serverSetup } from '~test-helpers'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import {
  categoryPageCOP,
  menuMock
} from '~domains/page/__mocks__/contentfulCategoryContent'
import { screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe(COP, () => {
  const server = serverSetup()
  const { reset } = setupMatchMediaMock()

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    })
  })

  afterEach(() => {
    server.resetHandlers()
    reset()
  })

  afterAll(() => server.close())

  const setup = () =>
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <COP />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: categoryPageCOP
              }
            },
            menu: {
              menu: {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                menu: menuMock
              }
            }
          }
        }
      }
    )

  it('renders the page with promotions and subcategories list', async () => {
    setup()

    expect(screen.getByTestId('mainSectionHeader')).toBeInTheDocument()
    expect(await screen.findAllByTestId('copSubcategory')).toHaveLength(2)
  })
})
