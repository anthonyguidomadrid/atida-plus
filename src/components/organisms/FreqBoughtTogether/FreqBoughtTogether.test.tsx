import { screen } from '@testing-library/react'
import { FreqBoughtTogether, FreqBoughtTogetherProps } from '.'
import { product, productPartial } from '~domains/product/__mocks__/product'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { renderWithStore } from '~test-helpers'
import userEvent from '@testing-library/user-event'

describe('FreqBoughtTogether', () => {
  const setup = (props: Partial<FreqBoughtTogetherProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    renderWithStore(
      <FreqBoughtTogether
        mainProduct={product}
        recommendedProducts={[{ ...product, sku: '9999999' }, productPartial]}
        {...props}
      />
    )
    reset()
  }

  it('should render correctly', () => {
    setup()
    expect(screen.getByTestId('freq-bought-together')).toBeInTheDocument()
  })

  it('not render if mainProduct is undefined', () => {
    setup({ mainProduct: undefined })
    expect(screen.queryByTestId('freq-bought-together')).not.toBeInTheDocument()
  })

  it('not render if recommendedProduct are undefined', () => {
    setup({ recommendedProducts: undefined })
    expect(screen.queryByTestId('freq-bought-together')).not.toBeInTheDocument()
  })

  it('not render if recommendedProduct are empty', () => {
    setup({ recommendedProducts: [] })
    expect(screen.queryByTestId('freq-bought-together')).not.toBeInTheDocument()
  })

  it('render plus icon', () => {
    setup({
      mainProduct: product,
      recommendedProducts: [
        product,
        productPartial,
        productPartial,
        productPartial
      ]
    })
    expect(
      screen.getAllByTestId('freq-bought-together-plus-icon')
    ).toHaveLength(4)
  })

  it('adds up all the prices correctly', () => {
    setup()
    userEvent.click(screen.getByTestId('minifiedProductTile-9999999'))
    expect(screen.getByText('€199.98')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('minifiedProductTile-100000001'))
    expect(screen.getByText('€299.97')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('minifiedProductTile-100000001'))
    expect(screen.getByText('€199.98')).toBeInTheDocument()
  })

  it('adds up all the RRP correctly', () => {
    setup()
    userEvent.click(screen.getByTestId('minifiedProductTile-9999999'))
    expect(screen.getByText('€177.76')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('minifiedProductTile-100000001'))
    expect(screen.getByText('€277.75')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('minifiedProductTile-100000001'))
    expect(screen.getByText('€177.76')).toBeInTheDocument()
  })

  it('When no products are selected, hide the RRP, show a 0 price and a message in the button', () => {
    setup()
    userEvent.click(screen.getByTestId('minifiedProductTile-100000000'))
    expect(screen.getByText('€0.00')).toBeInTheDocument()
    expect(
      screen.getByText('freq-bought-together.no-products-selected')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('priceRRP')).not.toBeInTheDocument()
  })
})
