import { screen } from '@testing-library/react'
import { ProductGrid, ProductGridProps } from '.'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { product, productPartial } from '~domains/product/__mocks__/product'
import { renderWithStore } from '~test-helpers'

describe('ProductGrid', () => {
  const setup = (props: Partial<ProductGridProps> = {}, isHome: boolean) => {
    const { reset } = setupMatchMediaMock(true)
    renderWithStore(
      <ProductGrid
        productCardList={[product, productPartial]}
        isHome={isHome}
        addToBasket={jest.fn()}
        openBasketModal={jest.fn()}
        {...props}
        testId="TestProductGrid"
      />
    )
    reset()
  }

  it('renders the correct number of products and correct product names', async () => {
    setup({}, false)
    expect(screen.getAllByTestId('productCard')).toHaveLength(2)
    expect(
      await screen.findByText(
        'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1'
      )
    ).toBeInTheDocument()
    expect(
      await screen.findByText(
        'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas'
      )
    ).toBeInTheDocument()
  })
  it('renders the correct links to the product pages', async () => {
    setup({}, false)

    expect(screen.getAllByTestId('productCardLink')[0]).toHaveAttribute(
      'href',
      '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
    )

    expect(screen.getAllByTestId('productCardLink')[3]).toHaveAttribute(
      'href',
      '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas'
    )
  })
  it('renders the correct grid in HomePage', async () => {
    setup({}, true)
    expect(screen.getByTestId('productGrid')).toHaveClass(
      'grid grid-cols-2 sm:grid-cols-3 gap-0 border-t border-ui-grey-light md:grid-cols-4'
    )
  })

  it('renders the correct grid in PDP', async () => {
    setup({}, false)
    expect(screen.getByTestId('oneRowProductGrid')).toHaveClass('grid-cols-2')
  })

  it('renders favourites page with grid products view with correct items per row', async () => {
    setup({ isFavouritesPage: true }, false)
    expect(screen.getByTestId('oneRowProductGrid')).toHaveClass(
      'lg:grid-cols-5'
    )
  })
})
