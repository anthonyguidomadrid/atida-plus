import { screen, waitFor } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import userEvent from '@testing-library/user-event'
import { createAlgoliaFrontendClient } from '~domains/algolia'
import { renderWithStore, serverSetup } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { RangeInputConnected } from '~components/molecules/RangeInputConnected'
import { routerMock } from '../../../__mocks__/routerMock'
import { ProductSearchLayout, ProductSearchLayoutProps } from '.'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

describe(ProductSearchLayout, () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
    replace: jest.fn()
  }))
  const server = serverSetup()
  const { locale } = useRouter()
  const { publicRuntimeConfig } = getConfig()
  const defaultLocaleRefinement = locale
    ? publicRuntimeConfig.algolia.productIndexes[locale]
    : publicRuntimeConfig.algolia.productIndexes['en-gb']

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
    props: Partial<ProductSearchLayoutProps> = {}
  ) => {
    const { reset } = setupMatchMediaMock(true)
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <ProductSearchLayout
          searchClient={createAlgoliaFrontendClient()}
          indexName={defaultLocaleRefinement}
          locale="en-gb"
          facets={facets}
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

  const facets = [
    {
      title: 'Filter title',
      facet: <RangeInputConnected attribute="price.sale" precision={2} />,
      testId: 'filterTestId'
    }
  ]

  const withBrandsSetup = (props: Partial<ProductSearchLayoutProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <ProductSearchLayout
          searchClient={createAlgoliaFrontendClient()}
          indexName={defaultLocaleRefinement}
          locale="en-gb"
          headerImage={{
            url: 'some-image.jpg'
          }}
          facets={facets}
          {...props}
        />
      </RouterContext.Provider>
    )
    reset()
  }

  const withQueryPageSetup = (
    props: Partial<ProductSearchLayoutProps> = {}
  ) => {
    const { reset } = setupMatchMediaMock(true)
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <ProductSearchLayout
          searchClient={createAlgoliaFrontendClient()}
          indexName={defaultLocaleRefinement}
          locale="en-gb"
          query="some"
          {...props}
        />
      </RouterContext.Provider>
    )
    reset()
  }

  describe('with categories', () => {
    it('it renders the product name and a link to the product page', async () => {
      withCategoriesSetup()
      expect(
        await screen.findByText(
          'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1'
        )
      ).toBeInTheDocument()
      expect(
        screen.getByRole('link', {
          name:
            'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1 Shampoo - 100 ml product.availability.in-stock'
        })
      ).toHaveAttribute(
        'href',
        '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      )
    })

    it('it renders the total number of products', async () => {
      withCategoriesSetup()
      expect(
        await screen.findByText('product.total-number-of-products 2')
      ).toBeInTheDocument()
    })

    it('it renders the list of subcategories', async () => {
      withCategoriesSetup()
      expect(
        await screen.findByRole('link', { name: 'Subcategory 1' })
      ).toHaveAttribute('href', '/category/subcategory-1')
      expect(
        await screen.findByRole('link', { name: 'Subcategory 2' })
      ).toHaveAttribute('href', '/category/subcategory-2')
    })

    // TO DO: PLUS-7770 [FE] Fix failing tests for the Algolia Dynamic widget
    xit('it renders the filters passed in the facet', async () => {
      withCategoriesSetup()
      await waitFor(async () => {
        expect(await screen.getAllByTestId('filterTestId')).toHaveLength(2)
      })
    })

    it('it renders the promotion toggle checkbox', async () => {
      withCategoriesSetup()
      await waitFor(async () => {
        expect(await screen.getByTestId('promotionFilter')).toBeInTheDocument()
      })
    })
  })

  describe('with brands', () => {
    it('it renders the product name and a link to the product page', async () => {
      withBrandsSetup()
      expect(
        await screen.findByText(
          'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1'
        )
      ).toBeInTheDocument()
      expect(
        screen.getByRole('link', {
          name:
            'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1 Shampoo - 100 ml product.availability.in-stock'
        })
      ).toHaveAttribute(
        'href',
        '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      )
    })

    it('it renders the total number of products', async () => {
      withBrandsSetup()
      expect(
        await screen.findByText('product.total-number-of-products 2')
      ).toBeInTheDocument()
    })

    it('it renders the brand headerImage for mobile and desktop', async () => {
      withBrandsSetup()
      expect(await screen.getByTestId('mobileHeaderImage')).toBeInTheDocument()
      expect(await screen.getByTestId('desktopHeaderImage')).toBeInTheDocument()
    })

    // TO DO: PLUS-7770 [FE] Fix failing tests for the Algolia Dynamic widget
    xit('it renders the filters passed in the facet', async () => {
      withBrandsSetup()
      await waitFor(async () => {
        expect(await screen.getAllByTestId('filterTestId')).toHaveLength(2)
      })
    })
    it('it renders the promotion toggle checkbox', async () => {
      withBrandsSetup()
      await waitFor(async () => {
        expect(await screen.getByTestId('promotionFilter')).toBeInTheDocument()
      })
    })
  })

  describe('with query', () => {
    // TO DO: PLUS-7770 [FE] Fix failing tests for the Algolia Dynamic widget
    xit('it renders the product name and a link to the product page', async () => {
      withQueryPageSetup()
      expect(
        await screen.findByText(
          'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1'
        )
      ).toBeInTheDocument()
      expect(
        screen.getByRole('link', {
          name:
            'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1 Shampoo - 100 ml product.availability.in-stock'
        })
      ).toHaveAttribute(
        'href',
        '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
      )
    })

    // TO DO: PLUS-7770 [FE] Fix failing tests for the Algolia Dynamic widget
    xit('it renders the promotion toggle checkbox', async () => {
      withQueryPageSetup()
      await waitFor(async () => {
        expect(await screen.getByTestId('promotionFilter')).toBeInTheDocument()
      })
    })
    it('it renders the total number of products', async () => {
      withCategoriesSetup()
      expect(
        await screen.findByText('product.total-number-of-products 2')
      ).toBeInTheDocument()
    })
  })

  // TODO: InfinitePagination was lifted from ProductList into its parent, ProductSearchLayout. Fix these tests by mocking the algolia
  xdescribe('the load more functionality', () => {
    it('disables load more button when loading', () => {
      withCategoriesSetup()
      expect(
        screen.getByRole('button', { name: 'product.load-more' })
      ).toBeDisabled()
    })

    it('loads more products when load more button is clicked', () => {
      const loadMoreProducts = jest.fn()
      withCategoriesSetup()
      expect(loadMoreProducts).not.toHaveBeenCalled()
      userEvent.click(screen.getByRole('button', { name: 'product.load-more' }))
      expect(loadMoreProducts).toHaveBeenCalledTimes(1)
    })

    it('renders the current state', () => {
      withCategoriesSetup()
      expect(screen.getByText('product.partial-number-of-products 20,2'))
    })
  })
})
