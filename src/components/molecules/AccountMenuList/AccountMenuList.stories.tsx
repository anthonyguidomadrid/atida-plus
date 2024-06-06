import { AccountMenuList, AccountMenuListProps } from './AccountMenuList'

export default {
  component: AccountMenuList,
  title: 'molecules/AccountMenuList',
  args: {
    isLoggedIn: true,
    isAsideNavigation: true
  }
}

export const Basic = (args: AccountMenuListProps): JSX.Element => (
  <AccountMenuList {...args} />
)
