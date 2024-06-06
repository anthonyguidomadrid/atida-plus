import { screen } from '@testing-library/react'
import { renderWithStore } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { product, productPartial } from '~domains/product/__mocks__/product'
import { ProductSlider, ProductSliderProps } from '.'

describe(ProductSlider, () => {
  const setup = (
    props: Partial<ProductSliderProps> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <ProductSlider
        productCardList={[product, productPartial]}
        addToBasket={jest.fn()}
        openBasketModal={jest.fn()}
        {...props}
        testId="TestProductSlider"
      />
    )
    reset()
    return renderedComponent
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })

  it('renders the correct number of products', async () => {
    setup()
    expect(screen.getAllByTestId('productCard')).toHaveLength(2)
  })
  it('renders the correct product names', async () => {
    setup()
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
    setup()
    expect(screen.getAllByTestId('productCardLink')[0]).toHaveAttribute(
      'href',
      '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas-2+1'
    )
    expect(screen.getAllByTestId('productCardLink')[3]).toHaveAttribute(
      'href',
      '/forcapil-anti-caida-del-cabello-arkopharma-30-capsulas'
    )
  })
  it('renders the correct product prices', async () => {
    setup()
    expect(screen.getAllByTestId('pricePrice')[0]).toHaveTextContent('€88.88')
    expect(screen.getAllByTestId('pricePrice')[1]).toHaveTextContent('€99.99')
  })
})
