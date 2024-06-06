import { categories } from './__mocks__/categories.mock'
import { CategoryList, CategoryListProps } from '.'

export default {
  component: CategoryList,
  title: 'molecules/CategoryList',
  parameters: { layout: 'fullscreen' },
  args: {
    categories,
    currentMenuStack: []
  },
  argTypes: {
    addToMenuStack: { action: 'addToMenuStack' },
    removeFromMenuStack: { action: 'removeFromMenuStack' }
  }
}

export const withContentFromDesign = (args: CategoryListProps): JSX.Element => (
  <CategoryList {...args} />
)
