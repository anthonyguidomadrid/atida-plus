import { screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createAlgoliaFrontendClient } from '~domains/algolia'
import { renderWithStore, serverSetup } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { routerMock } from '../../../__mocks__/routerMock'
import { MinimalProductSearchLayout, MinimalProductSearchLayoutProps } from '.'

describe(MinimalProductSearchLayout, () => {
  const server = serverSetup()

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
    server.listen({
      onUnhandledRequest: 'warn'
    })
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  const withCategoriesSetup = (
    props: Partial<MinimalProductSearchLayoutProps> = {}
  ) => {
    const { reset } = setupMatchMediaMock(true)
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <MinimalProductSearchLayout
          searchClient={createAlgoliaFrontendClient()}
          indexName="product-ecommerce-pt-pt_pt"
          locale="en-GB"
          category={{
            id: 'category',
            level: 0,
            color: 'category-beauty',
            image: {
              url: 'some-image.jpg'
            },
            subcategories: [
              {
                id: 'subcategory-1',
                title: 'Subcategory 1',
                url: '/category/subcategory-1',
                level: 1
              },
              {
                id: 'subcategory-2',
                title: 'Subcategory 2',
                url: '/category/subcategory-2',
                level: 1
              }
            ]
          }}
          {...props}
        />
      </RouterContext.Provider>
    )
    reset()
  }

  it('with categories, it renders the total number of products', async () => {
    withCategoriesSetup()
    expect(
      await screen.findByText('product.total-number-of-products 2')
    ).toBeInTheDocument()
  })
})
