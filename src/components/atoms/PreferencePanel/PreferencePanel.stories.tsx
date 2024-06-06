import { PreferencePanel, PreferencePanelProps } from './index'
import { ReactComponent as NavUser } from '~assets/svg/navigation-24px/NavUser.svg'
export default {
  component: PreferencePanel,
  title: 'atoms/PreferencePanel',
  args: {
    title: 'Change personal details',
    href: '/'
  }
}

export const Basic = (args: PreferencePanelProps): JSX.Element => (
  <PreferencePanel {...args} />
)

export const withIcon = (args: PreferencePanelProps): JSX.Element => (
  <PreferencePanel {...args} />
)
withIcon.args = {
  icon: <NavUser className="icon-24" />
}
