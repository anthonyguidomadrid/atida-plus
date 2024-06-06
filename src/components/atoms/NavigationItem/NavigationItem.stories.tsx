import { NavigationItem, NavigationItemProps } from './index'
import { ReactComponent as Eye } from '~assets/svg/navigation-24px/Eye.svg'
export default {
  component: NavigationItem,
  title: 'atoms/NavigationItem',
  args: {
    title: 'Overview',
    href: '/'
  }
}

export const Basic = (args: NavigationItemProps): JSX.Element => (
  <NavigationItem {...args} />
)

export const withIcon = (args: NavigationItemProps): JSX.Element => (
  <NavigationItem {...args} />
)
withIcon.args = {
  icon: <Eye className="icon-24" />
}
