import { screen } from '@testing-library/react'
import { OrderSummaryProductList, OrderSummaryProductListProps } from '.'
import { renderWithStore } from '~test-helpers'
import { product, productList } from './OrderSummaryProductList.mock'
import { orderDetailsResult } from '~domains/account/__mocks__/order-details'
import { OrderDetailsSingleItem } from '~domains/account'
import { BasketItem } from '~domains/basket/types'
import { Product } from '~domains/product'

type Items = ((BasketItem & OrderDetailsSingleItem) & {
  product: Omit<Partial<Product>, 'sku' | 'price'>
})[]

describe(OrderSummaryProductList, () => {
  const setup = (props: Partial<OrderSummaryProductListProps> = {}) =>
    renderWithStore(<OrderSummaryProductList items={[]} {...props} />)

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('orderSummaryProductList')).toBeInTheDocument()
  })

  it('renders OrderSummaryProductTile component', () => {
    const { container } = setup({
      items: ([product] as unknown) as Items,
      loadMore: true
    })
    expect(container).toBeInTheDocument()
    expect(product.name).toEqual(
      'Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1'
    )
  })

  it('renders only three OrderSummaryProductTile component if loadMore is false', () => {
    const { container } = setup({
      items: (productList as unknown) as Items,
      loadMore: false
    })
    expect(container).toBeInTheDocument()
    productList.map((product, idx) => {
      expect(product.name).toEqual(
        `${idx + 1} Forcapil Anti-Caída del Cabello Arkopharma 30 Cápsulas 2+1`
      )
    })
  })

  it('does render Load More button if there are more than 3 products added', () => {
    const { container } = setup({
      items: (productList as unknown) as Items,
      loadMore: false,
      showLoadMoreButton: true
    })
    const buttonEl = screen.getByTestId('InfinitePagination')
    expect(container).toBeInTheDocument()
    expect(buttonEl).toBeInTheDocument()
  })

  it('does not render Load More button if there are 3 or less than 3 products added', () => {
    const { container } = setup({
      items: ([product] as unknown) as Items,
      loadMore: false
    })
    expect(container).toBeInTheDocument()
    expect(screen.queryByRole('InfinitePagination')).not.toBeInTheDocument()
  })

  it('renders the number of items when loadMore is set to true', () => {
    setup({
      items: (productList as unknown) as Items,
      loadMore: true,
      showLoadMoreButton: true
    })
    expect(screen.getAllByTestId('orderSummaryProductTilePrice')).toHaveLength(
      4
    )
  })

  it('adapts the classes if a payment is ordered', () => {
    setup({ paymentOrdered: true })
    expect(screen.getByTestId('orderSummaryProductList')).toHaveClass(
      'border-t border-ui-grey-lightest'
    )
  })

  it('adapts the properties passed to OrderSummaryProductTile if a payment is ordered', () => {
    setup({
      paymentOrdered: true,
      items: orderDetailsResult.attributes.items as Items
    })
    expect(
      screen.getByTestId('orderSummaryProductTilePrice')
    ).toHaveTextContent('0.10')
  })

  it('adapts the properties passed to OrderSummaryProductTile if an item has been a third rank product', () => {
    setup({
      items: [
        {
          ...orderDetailsResult.attributes.items[0],
          isPromo: true,
          isFullyDiscounted: false,
          unitPriceToPayAggregation: 250
        }
      ] as Items
    })
    expect(
      screen.getByTestId('orderSummaryProductTilePrice')
    ).toHaveTextContent('2.50')
  })
})
