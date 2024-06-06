import { AccountMenu, AccountMenuProps } from './AccountMenu'

export default {
  component: AccountMenu,
  title: 'molecules/AccountMenu',
  args: {
    isOpen: true,
    isLoggedIn: false,
    firstName: 'Julia',
    onClose: { action: 'onClose' }
  }
}

export const Basic = (args: AccountMenuProps): JSX.Element => (
  <AccountMenu {...args} />
)
