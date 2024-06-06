import { Drawer, DrawerProps } from './Drawer'

export default {
  component: Drawer,
  title: 'molecules/Drawer',
  args: {
    title: 'My account',
    onClickCloseIcon: { action: 'onClickCloseIcon' }
  }
}

export const Basic = (args: DrawerProps): JSX.Element => <Drawer {...args} />
