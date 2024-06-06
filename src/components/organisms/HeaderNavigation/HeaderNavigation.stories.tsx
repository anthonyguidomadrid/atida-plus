import { HeaderNavigation, HeaderNavigationProps } from '.'
import { categories } from '~components/molecules/CategoryList/__mocks__/categories.mock'

export default {
  component: HeaderNavigation,
  title: 'organisms/HeaderNavigation',
  parameters: { layout: 'fullscreen' },
  args: {
    isMenuOpen: true,
    categories
  },
  argTypes: {
    closeMenu: { action: 'closeMenu' }
  }
}

export const WithContentFromDesign = (
  args: HeaderNavigationProps
): JSX.Element => {
  // THIS IS IMPORTANT: the modal we put the navigation in should have a height or it won't visible
  return (
    <div className="h-screen">
      <HeaderNavigation {...args} />
    </div>
  )
}
