import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import {
  resultSatateWithProducts,
  resultSatateWithNoProducts
} from '~domains/algolia/__mocks__/results'
import { routerMock } from '../../../__mocks__/routerMock'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { renderWithStore } from '~test-helpers'
import { Search } from '../Search'

describe(Search, () => {
  const server = setupServer()

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    })
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it('renders page content when some products are found', async () => {
    server.resetHandlers(
      rest.post(/.*algolia.*/, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(resultSatateWithProducts))
      )
    )
    const { reset } = setupMatchMediaMock()
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <Search />
      </RouterContext.Provider>,
      {
        initialState: {}
      }
    )

    expect(await screen.findAllByTestId('productCard')).toHaveLength(4)
    reset()
  })

  it('renders page content when no products are found', async () => {
    server.resetHandlers(
      rest.post(/.*algolia.*/, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(resultSatateWithNoProducts))
      )
    )
    const { reset } = setupMatchMediaMock()
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <Search />
      </RouterContext.Provider>,
      {
        initialState: {}
      }
    )

    expect(await screen.findByTestId('searchWithNoResults')).toBeInTheDocument()
    reset()
  })
})
