import { screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { promoPage } from '~domains/page/__mocks__/contentfulPromotionContent'
import { renderWithStore, serverSetup } from '~test-helpers'
import { routerMock } from '../../../__mocks__/routerMock'
import { PromoDP } from '../PromoDetailsPage'

describe(PromoDP, () => {
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
        <PromoDP />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: promoPage
              }
            }
          }
        }
      }
    )

    expect(screen.getByTestId('promotionHeader')).toBeInTheDocument()
    expect(await screen.findAllByTestId('productCard')).toHaveLength(2)
    reset()
  })

  it('does not error when promotion color and promotion image are not defined', async () => {
    const { reset } = setupMatchMediaMock()
    const promoPageMock = {
      ...promoPage
    }
    promoPageMock.promotion = {
      color: undefined,
      id: promoPage.promotion?.id ?? '',
      image: undefined,
      title: promoPage.promotion?.title,
      teaserDescription: promoPage.promotion?.teaserDescription,
      description: promoPage.promotion?.description,
      isContentWithImage: false
    }
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <PromoDP />
      </RouterContext.Provider>,
      {
        initialState: {
          server: {
            page: {
              'page-content': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                content: promoPageMock
              }
            }
          }
        }
      }
    )
    expect(screen.getByTestId('promotionHeader')).toBeInTheDocument()
    expect(await screen.findAllByTestId('productCard')).toHaveLength(2)
    reset()
  })
})
