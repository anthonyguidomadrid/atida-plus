import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '~test-helpers'
import { OrderDetailsItem, OrderDetailsItemProps } from './'

describe(OrderDetailsItem, () => {
  const defaultProps = {
    name: 'item',
    sku: 'sku123',
    quantity: 10,
    metadata: {
      url: 'product-slug',
      family: 'common'
    },
    unitSubtotalAggregation: 130,
    isPromo: false,
    isFullyDiscounted: false
  }

  const setup = (props: Partial<OrderDetailsItemProps> = {}) =>
    renderWithStore(<OrderDetailsItem {...defaultProps} {...props} idx={1} />)

  it('renders OrderDetailsItem component', async () => {
    setup()
    expect(screen.getByTestId('orderDetailsItem')).toBeInTheDocument()
  })

  it('does not render the gift label if isPromo is false', () => {
    setup()

    const testItem = screen.queryByTestId('testInfoLabel')

    expect(testItem).not.toBeInTheDocument()
  })

  it('renders the gift label if isPromo is true', () => {
    setup({ isPromo: true, isFullyDiscounted: true })

    const testItem = screen.getByTestId('testInfoLabel')

    expect(testItem).toBeInTheDocument()
  })

  it('renders the product image', async () => {
    setup({ metadata: { mediumImage: 'http://item.image' } })

    const testItem = screen.getByTestId('orderDetailsItemImage')

    expect(testItem).toBeInTheDocument()
    expect(testItem).toHaveAttribute('src', 'http://item.image')
  })

  it('does not render a product image due to missing image link', async () => {
    setup()

    const testItem = screen.getByTestId('orderDetailsItemImage')

    expect(testItem).toBeInTheDocument()
    expect(testItem).toHaveAttribute('src', '')
  })

  it('renders the item name which is a link to the PDP of that product', async () => {
    setup()

    const testItem = screen.getByTestId('orderDetailsItemNameLink')

    expect(testItem).toBeInTheDocument()
    expect(testItem).toHaveAttribute('href', '/product-slug')
  })
  it('renders the item name which is not a link to the PDP of that product', async () => {
    setup({ metadata: { url: '' } })

    const testItem = screen.queryAllByTestId('orderDetailsItemNameLink')

    expect(testItem).toHaveLength(0)
  })
  it('does onClick when the element is clicked', async () => {
    setup()
    const testItem = screen.getByTestId('testImageLink')
    userEvent.click(testItem)

    expect(testItem).toBeInTheDocument()
  })
  it('should not display a clickable title', () => {
    setup({ metadata: { family: 'not_for_sale' } })
    expect(screen.getByTestId('orderDetailsItemTitleUrl').innerHTML).toBe(
      'item'
    )
  })
})
