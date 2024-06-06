import { screen } from '@testing-library/react'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { AccountMenuList, AccountMenuListProps } from './index'

describe(AccountMenuList, () => {
  const defaultProps: AccountMenuListProps = {
    isLoggedIn: false,
    isAsideNavigation: false,
    hasNewAccountMenuStyle: false
  }

  const setup = (
    props: Partial<AccountMenuListProps> = {},
    isLoyaltyAtidaCashEnabled = false
  ) =>
    renderWithStoreAndFeatureFlags(
      <AccountMenuList {...defaultProps} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH]: isLoyaltyAtidaCashEnabled
        }
      }
    )

  it('renders AccountMenuList component', () => {
    setup()
    expect(screen.getByTestId('accountMenuList')).toBeInTheDocument()
  })
  it('renders overview nav-item', () => {
    setup()
    expect(screen.getByTestId('menuItemOverview')).toBeInTheDocument()
  })
  it('renders order-history nav-item', () => {
    setup()
    expect(screen.getByTestId('menuItemHistory')).toBeInTheDocument()
  })
  it('renders details nav-item', () => {
    setup()
    expect(screen.getByTestId('menuItemDetails')).toBeInTheDocument()
  })
  it('renders the Address Book nav item', () => {
    setup()
    expect(screen.getByTestId('menuItemAddressBook')).toBeInTheDocument()
  })

  it('renders the login button if logged out', () => {
    setup({ ...defaultProps, isLoggedIn: false })
    expect(screen.getByTestId('menuItemsLogin')).toBeInTheDocument()
  })

  it('renders the logout button if logged in', () => {
    setup({ ...defaultProps, isLoggedIn: true })
    expect(screen.getByTestId('menuItemsLogin')).toBeInTheDocument()
  })

  it('does not render the My Atida Cash link if not enabled', () => {
    setup({ ...defaultProps, isLoggedIn: true })
    expect(screen.queryByTestId('menuItemMyAtidaCash')).not.toBeInTheDocument()
  })

  it('renders the My Atida Cash link if enabled', () => {
    setup({ ...defaultProps, isLoggedIn: true }, true)
    expect(screen.getByTestId('menuItemMyAtidaCash')).toBeInTheDocument()
  })

  it('does not render the login button if not logged in and using new menu style', () => {
    setup({ ...defaultProps, isLoggedIn: false, hasNewAccountMenuStyle: true })
    expect(screen.queryByTestId('menuItemsLogin')).not.toBeInTheDocument()
  })
})
