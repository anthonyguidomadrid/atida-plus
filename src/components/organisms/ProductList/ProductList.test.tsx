import { screen } from '@testing-library/react'
import { ProductList, ProductListProps } from '.'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { product, productPartial } from '~domains/product/__mocks__/product'
import { renderWithStore } from '~test-helpers'

describe(ProductList, () => {
  const setup = (props: Partial<ProductListProps> = {}) =>
    renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <ProductList products={[product, productPartial]} {...props} />
      </RouterContext.Provider>
    )

  it('renders the correct number of products and correct product names', async () => {
    const { reset } = setupMatchMediaMock(true)

    setup()
    reset()
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
    const { reset } = setupMatchMediaMock(true)

    setup()
    reset()

    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
    )

    expect(screen.getAllByRole('link')[3]).toHaveAttribute(
      'href',
      '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas'
    )
  })
})
