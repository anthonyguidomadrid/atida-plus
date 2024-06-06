import { categoryTiles } from '../CategoryGrid/CategoryGrid.mock'
import { CategoryGridProps } from '../CategoryGrid'
import { CategorySlider } from '.'

export default {
  component: CategorySlider,
  title: 'molecules/CategorySlider',
  parameters: { layout: 'fullscreen' },
  args: {
    ...categoryTiles
  }
}

export const withContentFromDesign = (args: CategoryGridProps): JSX.Element => (
  <CategorySlider {...args} />
)
