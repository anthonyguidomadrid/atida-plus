import { screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { PLPContent } from '~domains/page/__mocks__/contentfulPLPContent'
import { renderWithStore, serverSetup } from '~test-helpers'
import { Category } from '~domains/contentful'

import { routerMock } from '../../../__mocks__/routerMock'
import { POP } from '../POP'

describe(POP, () => {
  const server = serverSetup()

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    })
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it('renders page content', async () => {
    const { reset } = setupMatchMediaMock()
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <POP />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: PLPContent
              }
            }
          }
        }
      }
    )

    expect(screen.getByTestId('heroBanner')).toBeInTheDocument()
    expect(screen.getByTestId('mainSectionHeader')).toBeInTheDocument()
    expect(await screen.findAllByTestId('productCard')).toHaveLength(2)
    reset()
  })

  it('does not error when category path, color and category image are not defined', async () => {
    const { reset } = setupMatchMediaMock()
    const categoryPageMock = {
      ...PLPContent
    }
    categoryPageMock.category = ({
      color: undefined,
      id: PLPContent.category?.id,
      image: undefined,
      level: categoryPageMock.category?.level,
      path: undefined
    } as unknown) as Category
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <POP />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: true,
                wasError: false,
                wasSuccess: true,
                content: categoryPageMock
              }
            }
          }
        }
      }
    )

    expect(screen.getByTestId('mainSectionHeader')).toBeInTheDocument()
    expect(await screen.findAllByTestId('productCard')).toHaveLength(2)
    reset()
  })
})
