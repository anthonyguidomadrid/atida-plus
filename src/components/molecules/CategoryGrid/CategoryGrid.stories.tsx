import { categoryTiles } from './CategoryGrid.mock'
import { CategoryGrid, CategoryGridProps } from '.'

export default {
  component: CategoryGrid,
  title: 'molecules/CategoryGrid',
  parameters: { layout: 'fullscreen' },
  args: {
    ...categoryTiles
  }
}

export const withContentFromDesign = (args: CategoryGridProps): JSX.Element => (
  <CategoryGrid {...args} />
)
