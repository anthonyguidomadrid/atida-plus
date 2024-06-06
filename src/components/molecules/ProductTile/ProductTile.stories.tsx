import { product } from './ProductTile.mock'
import { ProductTile, ProductTileProps } from '.'

export default {
  component: ProductTile,
  title: 'molecules/ProductTile',
  parameters: { layout: 'fullscreen' },
  args: {
    ...product
  },
  argTypes: {
    addToBasket: { action: 'addToBasket' },
    changeQuantity: { action: 'changeQuantity' },
    removeFromBasket: { action: 'removeFromBasket' }
  }
}

export const withContentFromDesign = (args: ProductTileProps): JSX.Element => (
  <ProductTile {...args} />
)
