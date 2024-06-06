import { screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { brandPage } from '~domains/page/__mocks__/contentfulBrandContent'
import { renderWithStore, serverSetup } from '~test-helpers'
import type { Brand } from '~domains/contentful'
import { routerMock } from '../../../__mocks__/routerMock'
import { BrandPage } from '../BrandPage'

describe(BrandPage, () => {
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
        <BrandPage />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: brandPage
              }
            }
          }
        }
      }
    )

    expect(screen.getByTestId('brandPageLayout')).toBeInTheDocument()
    expect(await screen.findAllByTestId('productCard')).toHaveLength(2)
    reset()
  })

  it('does not error when brand title, image or url is not present', async () => {
    const { reset } = setupMatchMediaMock()
    const brandPageMock = {
      ...brandPage
    }
    brandPageMock.brand = ({
      id: brandPage.brand?.id,
      title: undefined,
      image: {
        url: undefined
      },
      url: undefined
    } as unknown) as Brand
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <BrandPage />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: true,
                wasError: false,
                wasSuccess: true,
                content: brandPageMock
              }
            }
          }
        }
      }
    )

    expect(screen.getByTestId('brandPageLayout')).toBeInTheDocument()
    expect(await screen.findAllByTestId('productCard')).toHaveLength(2)
    reset()
  })
})
